using Microsoft.AspNetCore.Mvc;
using DocumentVerificationBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.Extensions.Logging;

[Route("api/[controller]")]
[ApiController]
public class DocumentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<DocumentController> _logger;

    public DocumentController(ApplicationDbContext context, ILogger<DocumentController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> UploadDocument([FromForm] DocumentUploadDto documentUploadDto)
    {
        if (documentUploadDto.File == null || documentUploadDto.File.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
        if (!Directory.Exists(uploadsFolderPath))
        {
            Directory.CreateDirectory(uploadsFolderPath);
        }

        var filePath = Path.Combine(uploadsFolderPath, documentUploadDto.File.FileName);

        try
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await documentUploadDto.File.CopyToAsync(stream);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file");
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }

        var document = new Document
        {
            UserId = documentUploadDto.UserId,
            Title = documentUploadDto.Title,
            FilePath = filePath,
            VerificationCode = Guid.NewGuid().ToString(),
            Status = "Pending",
            CreatedAt = DateTime.Now
        };

        _context.Documents.Add(document);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDocument), new { id = document.Id }, document);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Document>> GetDocument(int id)
    {
        var document = await _context.Documents.FindAsync(id);
        if (document == null)
        {
            return NotFound();
        }

        return Ok(document);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
    {
        return await _context.Documents.ToListAsync();
    }
}
public class DocumentUploadDto
{
    public int UserId { get; set; }
    public string Title { get; set; }
    public IFormFile File { get; set; }
}
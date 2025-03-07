using Microsoft.AspNetCore.Mvc;
using DocumentVerificationBackend.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DocumentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DocumentController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Document>> UploadDocument([FromBody] Document document)
    {
        document.VerificationCode = Guid.NewGuid().ToString();
        document.Status = "Pending";
        document.CreatedAt = DateTime.Now;

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
}

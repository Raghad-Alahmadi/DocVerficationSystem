using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DocumentVerificationBackend.Models;

[Route("api/[controller]")]
[ApiController]
public class VerificationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public VerificationController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Document>> VerifyDocument([FromBody] string verificationCode)
    {
        var document = await _context.Documents
            .FirstOrDefaultAsync(d => d.VerificationCode == verificationCode);

        if (document == null)
        {
            return NotFound("Document not found.");
        }

        document.Status = "Verified";
        _context.Documents.Update(document);
        await _context.SaveChangesAsync();

        return Ok(document);
    }
}

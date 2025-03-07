using Microsoft.EntityFrameworkCore;
using DocumentVerificationBackend.Models;

public class DocumentService
{
    private readonly ApplicationDbContext _context;

    public DocumentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Document> VerifyDocument(string verificationCode)
    {
        var document = await _context.Documents
            .FirstOrDefaultAsync(d => d.VerificationCode == verificationCode);

        if (document != null)
        {
            document.Status = "Verified";
            _context.Documents.Update(document);
            await _context.SaveChangesAsync();
        }

        return document;
    }
}

using Dapper;
using Microsoft.Data.SqlClient;
using DocumentVerificationBackend.Models;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

public class DocumentService
{
    private readonly string _connectionString;
    private readonly ILogger<DocumentService> _logger;
    private readonly ApplicationDbContext _context;

    public DocumentService(IConfiguration configuration, ILogger<DocumentService> logger, ApplicationDbContext context)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
        _logger = logger;
        _context = context;
    }

    public async Task<Document> VerifyDocumentWithEF(string verificationCode)
    {
        var stopwatch = Stopwatch.StartNew();

        var document = await _context.Documents
            .FirstOrDefaultAsync(d => d.VerificationCode == verificationCode);

        if (document != null)
        {
            document.Status = "Verified";
            _context.Documents.Update(document);
            await _context.SaveChangesAsync();
        }

        stopwatch.Stop();
        _logger.LogInformation($"Entity Framework: VerifyDocument took {stopwatch.ElapsedMilliseconds} ms");

        return document;
    }

    public async Task<Document> VerifyDocumentWithDapper(string verificationCode)
    {
        var stopwatch = Stopwatch.StartNew();

        using (var connection = new SqlConnection(_connectionString))
        {
            var document = await connection.QueryFirstOrDefaultAsync<Document>(
                "SELECT * FROM Documents WHERE VerificationCode = @VerificationCode",
                new { VerificationCode = verificationCode });

            if (document != null)
            {
                document.Status = "Verified";
                await connection.ExecuteAsync(
                    "UPDATE Documents SET Status = @Status WHERE Id = @Id",
                    new { Status = document.Status, Id = document.Id });
            }

            stopwatch.Stop();
            _logger.LogInformation($"Dapper: VerifyDocument took {stopwatch.ElapsedMilliseconds} ms");

            return document;
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using DocumentVerificationBackend.Models;

[Route("api/[controller]")]
[ApiController]
public class VerificationController : ControllerBase
{
    private readonly DocumentService _documentService;

    public VerificationController(DocumentService documentService)
    {
        _documentService = documentService;
    }

    [HttpPost("ef")]
    public async Task<ActionResult<Document>> VerifyDocumentWithEF([FromBody] string verificationCode)
    {
        var document = await _documentService.VerifyDocumentWithEF(verificationCode);

        if (document == null)
        {
            return NotFound("Document not found.");
        }

        return Ok(document);
    }

    [HttpPost("dapper")]
    public async Task<ActionResult<Document>> VerifyDocumentWithDapper([FromBody] string verificationCode)
    {
        var document = await _documentService.VerifyDocumentWithDapper(verificationCode);

        if (document == null)
        {
            return NotFound("Document not found.");
        }

        return Ok(document);
    }
}

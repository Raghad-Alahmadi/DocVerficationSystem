namespace DocumentVerificationBackend.Models
{
    public class Document
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
        public string VerificationCode { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public ICollection<VerificationLog> VerificationLogs { get; set; }
    }

}

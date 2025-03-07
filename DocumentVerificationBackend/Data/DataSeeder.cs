using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using DocumentVerificationBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace DocumentVerificationBackend.Data
{
    public class DataSeeder
    {
        private static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public static void SeedData(ApplicationDbContext context)
        {
            // Check if data already exists to avoid seeding the same data again
            if (!context.Users.Any())
            {
                context.Users.AddRange(
                    new User
                    {
                        Name = "Raghad",
                        Email = "Raghad@gmail.com",
                        Password = HashPassword("password1"),
                        Role = "Admin"
                    },
                    new User
                    {
                        Name = "Ahmad",
                        Email = "ahmadh@gmail.com",
                        Password = HashPassword("password2"),
                        Role = "User"
                    }
                );
                context.SaveChanges();
            }

            if (!context.Documents.Any())
            {
                context.Documents.AddRange(
                    new Document
                    {
                        UserId = 1,
                        Title = "Sample Document 1",
                        FilePath = "/files/sample1.pdf",
                        VerificationCode = Guid.NewGuid().ToString(),
                        Status = "Pending",
                        CreatedAt = DateTime.UtcNow
                    },
                    new Document
                    {
                        UserId = 2,
                        Title = "Sample Document 2",
                        FilePath = "/files/sample2.pdf",
                        VerificationCode = Guid.NewGuid().ToString(),
                        Status = "Verified",
                        CreatedAt = DateTime.UtcNow
                    }
                );
                context.SaveChanges();
            }

            if (!context.VerificationLogs.Any())
            {
                context.VerificationLogs.AddRange(
                    new VerificationLog
                    {
                        DocumentId = 1,
                        VerifiedBy = "Admin",
                        Timestamp = DateTime.UtcNow,
                        Status = "Verified"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}

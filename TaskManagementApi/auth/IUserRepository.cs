using Microsoft.AspNetCore.Identity;

public interface IUserRepository
{
    Task<User?> GetUserByEmailAsync(string email);
    Task<bool> UserExistsAsync(string email);
    Task<IdentityResult> CreateUserAsync(User user, string password);
}
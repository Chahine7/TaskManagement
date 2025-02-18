using Microsoft.AspNetCore.Identity;

namespace TaskManagementApi.auth
{
public class UserDTOMapper
    {
    private readonly UserManager<User> _userManager;
    public UserDTOMapper(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<UserDto> MapToDtoAsync(User user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        
        return new UserDto(
            user.Id,
            user.Email,
            roles.ToList()
        );
    }
}
}
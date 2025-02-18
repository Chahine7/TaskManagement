using Microsoft.AspNetCore.Identity;
using TaskManagementApi.auth;
using TaskManagementApi.Exceptions;
using TaskManagementApi.jwt;

public class AuthenticationService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly JwtUtil _jwtService;

    private readonly UserDTOMapper _userDTOMapper;
    public AuthenticationService(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        JwtUtil jwtService,
        UserDTOMapper userDTOMapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _userDTOMapper = userDTOMapper;
    }

    public async Task<AuthenticationResponse> LoginAsync(LoginRequest request)
     {
        var user = await _userManager.FindByEmailAsync(request.Email);
        var isValid = await _userManager.CheckPasswordAsync(user, request.Password);
        
        if (!isValid)
            throw new BadCredentialsException("Invalid credentials");

        var userDto = await _userDTOMapper.MapToDtoAsync(user);
        var token = _jwtService.IssueToken(user, userDto.roles);

        return new AuthenticationResponse(token, userDto);
    }

    public async Task<IdentityResult> RegisterAsync(RegisterRequest request)
    {
        if (await _userManager.FindByEmailAsync(request.Email) != null)
            throw new DuplicateResourceException("Email already exists");

        var user = new User
        {
            FullName = request.Name,
            UserName = request.Email,
            Email = request.Email
        };

        return await _userManager.CreateAsync(user, request.Password);
    }

   
}
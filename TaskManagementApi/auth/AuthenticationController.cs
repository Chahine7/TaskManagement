using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/auth")]
[AllowAnonymous]
public class AuthenticationController : ControllerBase
{
    private readonly AuthenticationService _authenticationService;

    public AuthenticationController(AuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("login")]
     [AllowAnonymous]
    public async Task<ActionResult<AuthenticationResponse>> Login(
        [FromBody] LoginRequest request)
    {
        var response = await _authenticationService.LoginAsync(request);
        Response.Headers.Append("Authorization", $"Bearer {response.Token}");
        return Ok(response);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(
        [FromBody] RegisterRequest request)
    {
        await _authenticationService.RegisterAsync(request);
        return StatusCode(StatusCodes.Status201Created);
    }
}
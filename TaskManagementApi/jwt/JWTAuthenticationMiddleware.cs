using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using TaskManagementApi.Exceptions;


namespace TaskManagementApi.jwt
{
    public class JWTAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtUtil _jwtUtil;

        public JWTAuthenticationMiddleware(RequestDelegate next, JwtUtil jwtUtil)
        {
            _next = next;
            _jwtUtil = jwtUtil;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring(7);
                var subject = _jwtUtil.GetSubject(token);

                if (subject != null)
                {
                    var userManager = context.RequestServices.GetRequiredService<UserManager<User>>();
                    var user = await userManager.FindByNameAsync(subject);
                    if (user != null && _jwtUtil.IsTokenValid(token, user.UserName))
                    {
                        var claims = new[]
                        {
                            new Claim(ClaimTypes.NameIdentifier, user.Id),
                            new Claim(ClaimTypes.Name, user.UserName),
                            new Claim(ClaimTypes.Role, "User"),
                        };
                        var identity = new ClaimsIdentity(claims, "Bearer");
                        var principal = new ClaimsPrincipal(identity);

                        context.User = principal;
                        await _next(context);
                        return;
                    }
                }
            }

                        throw new BadCredentialsException("Unauthorized access - token is invalid or missing.");

        }
    }
}

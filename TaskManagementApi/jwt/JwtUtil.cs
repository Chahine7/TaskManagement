using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TaskManagementApi.jwt
{
    public class JwtUtil
    {
        private const string SecretKey = "foobar_123456789_foobar_123456789_foobar_123456789_foobar_123456789";

        public string IssueToken(User user, List<string> scopes = null)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),  
                new Claim(ClaimTypes.Email, user.Email)
            };

            if (scopes != null && scopes.Any())
            {
                foreach (var scope in scopes)
                {
                    claims.Add(new Claim("scope", scope));
                }
            }

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: "https://taskmanagement.com",
                audience: "https://taskmanagement.com",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(15),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }

        public string GetSubject(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            return jwtToken.Subject;
        }

        public bool IsTokenValid(string jwt, string userId)
        {
            var subject = GetSubject(jwt);
            return subject == userId && !IsTokenExpired(jwt);
        }

        private bool IsTokenExpired(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);
            return token.ValidTo < DateTime.UtcNow;
        }
    }
}

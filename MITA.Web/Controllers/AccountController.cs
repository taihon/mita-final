using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MITA.Auth;
using System.Security.Principal;
using Google.Apis.Auth;

namespace MITA.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AccountController(SignInManager<User> signInManager, UserManager<User> userManager, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }
        [HttpPost]
        [ProducesResponseType(404)]
        [ProducesResponseType(200)]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]UserRegisterRequest request, string ReturnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var user = new User { UserName = request.Email, Email = request.Email };
                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, false);
                    var token = await GenerateToken(request.Email, user);
                    return Ok(new { token });
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            return BadRequest(ModelState.Values.SelectMany(t=>t.Errors));
        }
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]UserLoginRequest request, string ReturnUrl = null)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if (result.Succeeded)
            {
                var user = _userManager.Users.FirstOrDefault(t => t.Email == request.Email);
                var jwt = await GenerateToken(request.Email, user);
                return Ok(new { token = jwt });
            }
            return StatusCode((int)StatusCodes.Status403Forbidden, "Authentication failure");
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [Route("extregister")]
        public async Task<IActionResult> ExternalRegister([FromBody]UserExternalRegisterRequest request)
        {
            if (ModelState.IsValid) {
                try
                {
                    var tokenIsValid = await GoogleJsonWebSignature.ValidateAsync(
                        request.GoogleToken,
                        new GoogleJsonWebSignature.ValidationSettings() { ForceGoogleCertRefresh = true, Audience = new string[]{ _configuration["googleclientid"]} });
                    var googleToken = new JwtSecurityTokenHandler().ReadJwtToken(request.GoogleToken);
                    var email = googleToken.Claims.First(c => c.Type == "email").Value;
                    var user = new User { UserName = email, Email = email};
                    var result = await _userManager.CreateAsync(user, request.Password);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, false);
                        var token = await GenerateToken(email, user);
                        return Ok(new { token });
                    }
                    else
                    {
                        return BadRequest(result.Errors);
                    }
                }
                catch(InvalidJwtException exception)
                {
                    ModelState.AddModelError("GoogleToken", $"Google token is invalid: {exception.Message}");
                }
            }
            return BadRequest(ModelState.Values.SelectMany(e => e.Errors));
        }

        [HttpPost]
        private async Task<string> GenerateToken(string email, User user) {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtExpireDays"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtIssuer"],
                audience: _configuration["JwtIssuer"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
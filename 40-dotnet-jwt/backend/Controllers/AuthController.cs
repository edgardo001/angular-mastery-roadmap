using System.Collections.Concurrent;
using System.Security.Claims;
using DotnetJwt.Models;
using DotnetJwt.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotnetJwt.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private static readonly ConcurrentBag<User> Users = new();
    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var user = Users.FirstOrDefault(u =>
            u.Username == request.Username && u.Password == request.Password);
        if (user is null)
            return Unauthorized(new { error = "Invalid credentials" });

        var accessToken = _jwtService.GenerateAccessToken(user.Username);
        var refreshToken = _jwtService.GenerateRefreshToken(user.Username);
        return Ok(new { accessToken, refreshToken });
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] LoginRequest request)
    {
        if (Users.Any(u => u.Username == request.Username))
            return BadRequest(new { error = "Username already exists" });

        Users.Add(new User
        {
            Id = Users.Count + 1,
            Username = request.Username,
            Password = request.Password
        });
        return Ok(new { message = "User registered successfully" });
    }

    [HttpPost("refresh")]
    public IActionResult Refresh([FromBody] RefreshRequest request)
    {
        var principal = _jwtService.ValidateToken(request.RefreshToken);
        if (principal is null)
            return Unauthorized(new { error = "Invalid refresh token" });

        var username = principal.FindFirst(ClaimTypes.Name)?.Value;
        if (username is null)
            return Unauthorized(new { error = "Invalid token claims" });

        var newAccessToken = _jwtService.GenerateAccessToken(username);
        return Ok(new { accessToken = newAccessToken, refreshToken = request.RefreshToken });
    }

    [Authorize]
    [HttpGet("~/api/protected")]
    public IActionResult GetProtected()
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;
        return Ok(new { message = $"Hello {username}, you are authenticated!" });
    }
}

public class RefreshRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}

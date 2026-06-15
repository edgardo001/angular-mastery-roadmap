package com.example;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationProvider authenticationProvider;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthController(AuthenticationProvider authenticationProvider,
                          UserDetailsServiceImpl userDetailsService,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder,
                          UserRepository userRepository) {
        this.authenticationProvider = authenticationProvider;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        authenticationProvider.authenticate(
            new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());
        String accessToken = jwtUtil.generateAccessToken(userDetails);
        String refreshToken = jwtUtil.generateRefreshToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        String username = jwtUtil.extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (!jwtUtil.isTokenValid(refreshToken, userDetails)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid refresh token"));
        }
        String newAccessToken = jwtUtil.generateAccessToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken));
    }

    record AuthRequest(String username, String password) {}
    record AuthResponse(String accessToken, String refreshToken) {}
}

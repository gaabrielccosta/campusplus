package br.ucs.campusPlus.controller;

import br.ucs.campusPlus.dto.AuthRequest;
import br.ucs.campusPlus.dto.UserResponse;
import br.ucs.campusPlus.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody AuthRequest req) {
        UserResponse resp = authService.register(req);
        return ResponseEntity.status(201).body(resp);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody AuthRequest req) {
        UserResponse resp = authService.login(req);
        return ResponseEntity.ok(resp);
    }
}
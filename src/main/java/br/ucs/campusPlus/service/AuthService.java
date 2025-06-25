package br.ucs.campusPlus.service;

import br.ucs.campusPlus.dto.AuthRequest;
import br.ucs.campusPlus.dto.UserResponse;
import br.ucs.campusPlus.entity.User;
import br.ucs.campusPlus.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(AuthRequest req) {
        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return new UserResponse(false, null, null);
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        User saved = userRepo.save(u);
        return new UserResponse(true, saved.getId(), saved.getUsername());
    }

    @Transactional()
    public UserResponse login(AuthRequest req) {
        User u = userRepo.findByUsername(req.getUsername())
                .orElse(null);
        if (u == null || !passwordEncoder.matches(req.getPassword(), u.getPassword())) {
            return new UserResponse(false, null, null);
        }
        return new UserResponse(true, u.getId(), u.getUsername());
    }
}

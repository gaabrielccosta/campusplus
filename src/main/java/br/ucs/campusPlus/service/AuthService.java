package br.ucs.campusPlus.service;

import br.ucs.campusPlus.dto.AuthRequest;
import br.ucs.campusPlus.dto.UserResponse;
import br.ucs.campusPlus.entity.Aluno;
import br.ucs.campusPlus.entity.Professor;
import br.ucs.campusPlus.entity.User;
import br.ucs.campusPlus.repository.AlunoRepository;
import br.ucs.campusPlus.repository.ProfessorRepository;
import br.ucs.campusPlus.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class AuthService {
    private final UserRepository userRepo;
    private final AlunoRepository alunoRepo;
    private final ProfessorRepository professorRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepo, AlunoRepository alunoRepo,
                       ProfessorRepository professorRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.alunoRepo = alunoRepo;
        this.professorRepo = professorRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(AuthRequest req) {
        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return new UserResponse(false, null, null, null);
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        User saved = userRepo.save(u);

        Aluno aluno = null;
        Professor professor = null;
        if (req.getRole().equals("aluno")) {
            aluno = new Aluno();
            aluno.setUser(saved);
            aluno.setCurso(req.getCurso());
            alunoRepo.save(aluno);
        } else {
            professor = new Professor();
            professor.setUser(saved);
            professor.setDepartamento(req.getDepartamento());
            professorRepo.save(professor);
        }
        return new UserResponse(true, saved, aluno, professor);
    }

    @Transactional()
    public UserResponse login(AuthRequest req) {
        User u = userRepo.findByUsername(req.getUsername())
                .orElse(null);
        if (u == null || !passwordEncoder.matches(req.getPassword(), u.getPassword())) {
            return new UserResponse(false, null, null, null);
        }

        Aluno aluno = alunoRepo.findById(u.getId()).orElse(null);
        Professor professor = professorRepo.findById(u.getId()).orElse(null);
        return new UserResponse(true, u, aluno, professor);
    }
}

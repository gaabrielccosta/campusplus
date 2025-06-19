package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}

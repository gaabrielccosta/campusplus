package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor,Long> {
}
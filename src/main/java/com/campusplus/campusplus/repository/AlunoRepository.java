package com.campusplus.campusplus.repository;

import com.campusplus.campusplus.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}

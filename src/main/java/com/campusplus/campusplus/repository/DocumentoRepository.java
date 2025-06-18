package com.campusplus.campusplus.repository;

import com.campusplus.campusplus.entity.Aluno;
import com.campusplus.campusplus.entity.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    boolean existsByAlunoAndTipoAndStatusIn(Aluno aluno, String tipo, List<String> statuses);
}

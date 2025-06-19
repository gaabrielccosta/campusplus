package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.Aluno;
import br.ucs.campusPlus.entity.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    boolean existsByAlunoAndTipoAndStatusIn(Aluno aluno, String tipo, List<String> statuses);
}

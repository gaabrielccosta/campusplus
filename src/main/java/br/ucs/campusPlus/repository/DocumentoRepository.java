package br.ucs.campusPlus.repository;

import br.ucs.campusPlus.entity.Documento;
import br.ucs.campusPlus.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    boolean existsByUserAndTipoAndStatusIn(User user, String tipo, List<String> statuses);
    Optional<Documento> findByUserAndTipo(User user, String tipo);
}

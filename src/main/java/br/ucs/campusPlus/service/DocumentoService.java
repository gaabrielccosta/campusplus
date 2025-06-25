package  br.ucs.campusPlus.service;

import br.ucs.campusPlus.entity.Documento;
import br.ucs.campusPlus.entity.User;
import br.ucs.campusPlus.exception.BusinessException;
import br.ucs.campusPlus.exception.NotFoundException;
import br.ucs.campusPlus.repository.DocumentoRepository;
import br.ucs.campusPlus.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Documento solicitarDocumento(Long userId, String tipo) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        if (documentoRepository.existsByUserAndTipoAndStatusIn(
                user, tipo, Arrays.asList("Em processo", "Pendente"))) {
            throw new BusinessException("Você já possui uma solicitação em andamento para este documento");
        }

        Documento doc = new Documento();
        doc.setUser(user);
        doc.setTipo(tipo);
        doc.setStatus("Em processo");
        doc.setDataSolicitacao(new Date());

        return documentoRepository.save(doc);
    }

    public Optional<Documento> buscarDocumento(Long userId, String tipo) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        return documentoRepository.findByUserAndTipo(user, tipo);
    }
}

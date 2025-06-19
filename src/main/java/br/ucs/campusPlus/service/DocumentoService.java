package  br.ucs.campusPlus.service;

import br.ucs.campusPlus.entity.Aluno;
import br.ucs.campusPlus.entity.Documento;
import br.ucs.campusPlus.exception.BusinessException;
import br.ucs.campusPlus.exception.NotFoundException;
import br.ucs.campusPlus.repository.AlunoRepository;
import br.ucs.campusPlus.repository.DocumentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepository;

    @Autowired
    private AlunoRepository alunoRepository; // origem: subsistema de Usuários (ciclo 1)

    @Transactional
    public Documento solicitarDocumento(Long alunoId, String tipo) {
        // Origem: Pré-condição – aluno autenticado (ciclo 1)
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado"));

        // Extensão 3a – fluxo alternativo do UC01
        if (documentoRepository.existsByAlunoAndTipoAndStatusIn(
                aluno, tipo, Arrays.asList("Em processo", "Pendente"))) {
            throw new BusinessException("Você já possui uma solicitação em andamento para este documento");
        }

        // Fluxo básico – passos 3 e 4 do UC01
        Documento doc = new Documento();
        doc.setAluno(aluno);
        doc.setTipo(tipo);
        doc.setStatus("Em processo");
        doc.setDataSolicitacao(LocalDate.now());

        return documentoRepository.save(doc);
    }
}

package br.ucs.campusPlus.controller;

import br.ucs.campusPlus.entity.Documento;
import br.ucs.campusPlus.exception.BusinessException;
import br.ucs.campusPlus.exception.NotFoundException;
import br.ucs.campusPlus.service.DocumentoService;
import br.ucs.campusPlus.vo.DocumentoVO;
import br.ucs.campusPlus.vo.SolicitarDocumentoRequestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    @Autowired
    private DocumentoService documentoService;

    // Endpoint exposto no Protótipo de Tela – formulário de solicitação
    @PostMapping("/solicitar")
    public ResponseEntity<DocumentoVO> solicitar(@RequestBody SolicitarDocumentoRequestVO request) {
        try {
            Documento doc = documentoService.solicitarDocumento(request.getUserId(), request.getTipo());
            return ResponseEntity.ok(DocumentoVO.from(doc));
        } catch (NotFoundException | BusinessException e) {
            DocumentoVO vo = new DocumentoVO();
            vo.setErro(e.getMessage());
            return ResponseEntity.ok(vo);
        }
    }
}
package br.ucs.campusPlus.vo;

import br.ucs.campusPlus.entity.Documento;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DocumentoVO {
    private Long id;
    private String erro;
    private String tipo;
    private String status;
    private Date dataSolicitacao;

    public static DocumentoVO from(Documento doc) {
        DocumentoVO dto = new DocumentoVO();
        dto.id = doc.getId();
        dto.tipo = doc.getTipo();
        dto.status = doc.getStatus();
        dto.dataSolicitacao = doc.getDataSolicitacao();
        return dto;
    }
}

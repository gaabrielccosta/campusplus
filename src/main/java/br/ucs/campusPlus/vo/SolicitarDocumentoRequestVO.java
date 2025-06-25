package br.ucs.campusPlus.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SolicitarDocumentoRequestVO {
    private Long userId;
    private String tipo;
}

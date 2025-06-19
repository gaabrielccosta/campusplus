package br.ucs.campusPlus.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SolicitarDocumentoRequestVO {
    private Long alunoId; // mapeia campo oculto com ID do aluno autenticado
    private String tipo;   // selecionado no dropdown do protótipo de tela
}

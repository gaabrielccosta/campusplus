package br.ucs.campusPlus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTopicDTO {
    private String title;
    private String author;
    private String role;
    private String curso;
    private String departamento;
    private String content;
}

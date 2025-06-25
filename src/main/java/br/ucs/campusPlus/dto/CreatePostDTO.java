package br.ucs.campusPlus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostDTO {
    private String author;
    private String content;
}

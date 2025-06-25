package br.ucs.campusPlus.dto;

import br.ucs.campusPlus.entity.Aluno;
import br.ucs.campusPlus.entity.Professor;
import br.ucs.campusPlus.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private boolean authenticated;
    private User user;
    private Aluno aluno;
    private Professor professor;
}

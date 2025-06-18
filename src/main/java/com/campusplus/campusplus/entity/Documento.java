package com.campusplus.campusplus.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "documento")
@Getter
@Setter
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tipo; // derivado de 'tipo' do modelo de classes

    @Column(nullable = false)
    private String status; // inicializa como "Em processo" conforme UC01

    @Column(name = "data_solicitacao", nullable = false)
    private LocalDate dataSolicitacao; // definido no fluxo principal do diagrama de sequência

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno; // associação Aluno 1..* --- Documento 0..*
}

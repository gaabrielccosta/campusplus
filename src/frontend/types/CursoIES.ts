import { Curso } from "./Curso";
import { InstituicaoEnsinoSuperior } from "./InstituicaoEnsinoSuperior";
import { Campus } from "./Campus";

export interface CursoIES {
  idCursoIES: number;
  idIES: InstituicaoEnsinoSuperior;
  idCurso: Curso;
  idCampus: Campus;
  modalidade?: string;
  ano2014?: number;
  ano2015?: number;
  ano2016?: number;
  ano2017?: number;
  ano2018?: number;
  ano2019?: number;
  ano2020?: number;
  ano2021?: number;
  ano2022?: number;
}

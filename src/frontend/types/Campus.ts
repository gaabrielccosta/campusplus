import { InstituicaoEnsinoSuperior } from "./InstituicaoEnsinoSuperior";
import { Cidade } from "./Cidade";

export interface Campus {
  idCampus: number;
  instituicaoEnsinoSuperior: InstituicaoEnsinoSuperior;
  cidade: Cidade;
}

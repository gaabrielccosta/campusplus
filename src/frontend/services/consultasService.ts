import api from "./api";
import { TotalAlunosPorAno } from "../types/consultas/TotalAlunosPorAno";
import { RankingCurso } from "../types/consultas/RankingCurso";

const saveToLocalStorage = (key: string, data: any) => {
  const existingData = JSON.parse(localStorage.getItem(key) || "[]");
  const updatedData = [data, ...existingData].slice(0, 2); // Keep only the last 2 queries
  localStorage.setItem(key, JSON.stringify(updatedData));
};

export const buscarTotalAlunosPorAno = async (
  ano: number,
  modalidade?: string,
  estado?: string,
  curso?: string
): Promise<TotalAlunosPorAno[]> => {
  let endpoint = `/pesquisas/totalAlunos/${ano}`;

  if (!modalidade && (estado || curso)) {
    modalidade = "ALL";
  }

  if (!estado && curso) {
    estado = "ALL";
  }

  if (modalidade && curso && estado) {
    endpoint += `/${modalidade}/${estado}/${curso}`;
  } else if (modalidade && estado) {
    endpoint += `/${modalidade}/${estado}`;
  } else if (modalidade) {
    endpoint += `/${modalidade}`;
  } else if (estado) {
    endpoint += `/${estado}`;
  } else if (curso) {
    endpoint += `/${curso}`;
  }

  const response = await api.get(endpoint);
  const data = response.data;

  // Save the result to localStorage
  saveToLocalStorage("lastTotalAlunosQueries", { ano, modalidade, estado, curso, data });

  return data;
};

export const buscarRankingCursos = async (
  ano: number,
  modalidade?: string,
  estado?: string
): Promise<RankingCurso[]> => {
  let endpoint = `/pesquisas/rankingCursos/${ano}`;

  if (!modalidade && estado) {
    modalidade = "ALL";
  }

  if (modalidade && estado) {
    endpoint += `/${modalidade}/${estado}`;
  } else if (modalidade) {
    endpoint += `/${modalidade}`;
  } else if (estado) {
    endpoint += `/${estado}`;
  }

  const response = await api.get(endpoint);
  const data = response.data;

  // Save the result to localStorage
  saveToLocalStorage("lastRankingCursosQueries", { ano, modalidade, estado, data });

  return data;
};
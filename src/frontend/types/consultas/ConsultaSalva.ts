export interface ConsultaSalva {
  tipoConsulta: "TOTAL_ANUAL" | "RANKING_CURSOS" | "TOTAL_ESTADO";
  parametros: {
    ano?: number;
    modalidade?: string;
    estado?: string;
  };
  resultado: any;
  dataHora: string;
}

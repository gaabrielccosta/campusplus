import React, { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

export interface DocumentoDTO {
    id: number;
    tipo: string;
    status: string;
    dataSolicitacao: string;
}

interface ISolicitarDocumentoFormProps {
    alunoId: number;
    onSuccess: (doc: DocumentoDTO) => void;
}

const SolicitarDocumentoForm: React.FC<ISolicitarDocumentoFormProps> = ({
    alunoId,
    onSuccess
}) => {
    const [tipo, setTipo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post<DocumentoDTO>(
                '/api/documentos/solicitar',
                { alunoId, tipo },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // HTTP 201 Created
            if (response.status === 201) {
                onSuccess(response.data);
            } else {
                alert(`Resposta inesperada: ${response.status}`);
            }
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                // Erro de resposta do servidor
                alert(`Erro ${error.response.status}: ${error.response.data}`);
            } else {
                // Falha de rede ou outro
                alert(`Erro ao conectar: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tipo de Documento:
                <select
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                    required
                    disabled={loading}
                >
                    <option value="">Selecione</option>
                    <option value="Atestado">Atestado</option>
                    <option value="Histórico">Histórico</option>
                    <option value="Declaração">Declaração</option>
                </select>
            </label>
            <button type="submit" disabled={loading || !tipo}>
                {loading ? 'Enviando...' : 'Solicitar'}
            </button>
        </form>
    );
}

export default SolicitarDocumentoForm;
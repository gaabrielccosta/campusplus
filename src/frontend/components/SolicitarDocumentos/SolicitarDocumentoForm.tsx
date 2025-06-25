import React, { FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import './SolicitarDocumentoForm.css';
import api from '../../services/api';
import { Documento } from '../../types/Documento';

interface ISolicitarDocumentoFormProps {
    userId: number;
}

const SolicitarDocumentoForm: React.FC<ISolicitarDocumentoFormProps> = ({
    userId,
}) => {
    const [tipo, setTipo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post<Documento>(
                '/documentos/solicitar',
                { userId, tipo },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const documento = response.data;
            if (documento.erro) {
                alert(documento.erro);
            } else {
                alert("Documento solicitado com sucesso!");
            }
        } catch (err) {
            const error = err as AxiosError;
            if (error.response) {
                alert(`Erro ${error.response.status}: ${error.response.data}`);
            } else {
                alert(`Erro ao conectar: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <h1>Solicitar Documentos</h1>
                <label className="form-label" htmlFor="tipo">
                    Tipo de Documento
                </label>
                <select
                    id="tipo"
                    className="form-select"
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
            </div>
            <button
                type="submit"
                className="submit-button"
                disabled={loading || !tipo}
            >
                {loading ? 'Enviando...' : 'Solicitar'}
            </button>
        </form>
    );
};

export default SolicitarDocumentoForm;

// Arquivo: src/App.tsx

import React, { JSX } from 'react';
import './App.css';
import SolicitarDocumentoForm, { DocumentoDTO } from './components/pages/SolicitarDocumentoForm';

const App: React.FC = () => {
  const onSuccess = (doc: DocumentoDTO) => {
    console.log('Documento criado com sucesso:', doc);
    // aqui você pode atualizar estado, mostrar notificação, etc.
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Campus+ - Solicitar Documento</h1>
      </header>
      <main>
        <SolicitarDocumentoForm alunoId={1} onSuccess={onSuccess} />
      </main>
    </div>
  );
}

export default App;

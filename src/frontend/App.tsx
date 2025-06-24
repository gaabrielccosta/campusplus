// Arquivo: src/App.tsx

import React, { JSX, useState } from 'react';
import './App.css';
import SolicitarDocumentoForm, { DocumentoDTO } from './components/SolicitarDocumentos/SolicitarDocumentoForm';
import Login from './components/Login/Login';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const onSuccess = (doc: DocumentoDTO) => {
    console.log('Documento criado com sucesso:', doc);
    // aqui você pode atualizar estado, mostrar notificação, etc.
  };

  return (
    <>
      {!loggedIn && (
        <Login setLoggedIn={setLoggedIn} />
      )}
      {loggedIn && (
        <div className="App">
          <header className="App-header">
            <h1>Campus+ - Solicitar Documento</h1>
          </header>
          <main>
            <SolicitarDocumentoForm alunoId={1} onSuccess={onSuccess} />
          </main>
        </div>
      )}
    </>
  );
}

export default App;

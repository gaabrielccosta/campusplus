import React, { useState } from 'react';
import './App.css';
import SolicitarDocumentoForm from './components/SolicitarDocumentos/SolicitarDocumentoForm';
import Login from './components/Login/Login';
import { UserResponse } from './types/UserResponse';
import ForumPage from './components/pages/Forum/ForumPage';

type Page = 'solicitar' | 'forum';

const App: React.FC = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('solicitar');

  return (
    <>
      {!user?.authenticated && <Login setUser={setUser} />}
      {user && user.authenticated && (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Campus+
            </h1>
            <nav className="App-nav">
              <select
                className="App-select"
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value as Page)}
              >
                <option value="solicitar">Solicitar Documentos</option>
                <option value="forum">Fórum</option>
                {/* futuras páginas */}
              </select>
            </nav>
          </header>

          <main className="App-main">
            {currentPage === 'solicitar' && (
              <SolicitarDocumentoForm userId={user.id!} />
            )}
            {currentPage === 'forum' && (
              <ForumPage username={user.username}/>
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default App;
import React, { useState } from 'react';
import './Login.css';
import api from '../../services/api';
import { UserResponse } from '../../types/UserResponse';

interface LoginProps {
    setUser: (user: UserResponse) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postLogin();
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError('Preencha todos os campos');
        } else if (password !== confirmPassword) {
            setError('As senhas não coincidem');
        } else {
            postRegister();
        }
    };

    const postRegister = async () => {
        const response = await api.post<UserResponse>(
            '/auth/register',
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const userRespose = response.data;
        if (userRespose.authenticated) {
            alert("Registrado com sucesso!");
            setError('');
            setIsRegistering(false);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setError("Usuário já existe.");
        }
    }

    const postLogin = async () => {
        const response = await api.post<UserResponse>(
            '/auth/login',
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const userRespose = response.data;
        if (userRespose.authenticated) {
            setUser(userRespose);
            console.log(userRespose);
        } else {
            setError("Usuário ou senha inválidos.");
        }
    }

    return (
        <div className="login-container">
            {!isRegistering ? (
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="username">Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Entrar</button>
                    <p className="toggle-text">
                        Não tem conta?{' '}
                        <button className="toggle-btn" onClick={() => { setIsRegistering(true); setError(''); }}>
                            Registrar-se
                        </button>
                    </p>
                </form>
            ) : (
                <form onSubmit={handleRegister} className="login-form">
                    <h2>Registrar</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="username">Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Registrar</button>
                    <p className="toggle-text">
                        Já tem conta?{' '}
                        <button className="login-button" onClick={() => { setIsRegistering(false); setError(''); }}>
                            Entrar
                        </button>
                    </p>
                </form>
            )
            }
        </div >
    );
};

export default Login;
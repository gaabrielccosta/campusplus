import React, { useState } from "react";
import "./Login.css";
import api from "../../services/api";
import { UserResponse } from "../../types/UserResponse";

interface LoginProps {
  setUser: (user: UserResponse) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<"aluno" | "professor">("aluno");
  const [curso, setCurso] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setRole("aluno");
    setCurso("");
    setDepartamento("");
    setError("");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postLogin();
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError("Preencha todos os campos");
    } else if (password !== confirmPassword) {
      setError("As senhas não coincidem");
    } else if (role === "aluno" && !curso) {
      setError("Preencha o campo de curso");
    } else if (role === "professor" && !departamento) {
      setError("Preencha o campo de departamento");
    } else {
      postRegister();
    }
  };

  const postRegister = async () => {
    try {
      const payload: any = { username, password, role };
      if (role === "aluno") payload.curso = curso;
      else payload.departamento = departamento;

      const response = await api.post<UserResponse>("/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const userResponse = response.data;
      if (userResponse.authenticated) {
        alert("Registrado com sucesso!");
        resetFields();
        setIsRegistering(false);
      } else {
        setError("Usuário já existe.");
      }
    } catch (err) {
      setError("Erro ao registrar.");
    }
  };

  const postLogin = async () => {
    try {
      const response = await api.post<UserResponse>(
        "/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const userResponse = response.data;
      if (userResponse.authenticated) {
        setUser(userResponse);
      } else {
        setError("Usuário ou senha inválidos.");
      }
    } catch (err) {
      setError("Erro ao autenticar.");
    }
  };

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
            Não tem conta?{" "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                resetFields();
                setIsRegistering(true);
              }}
            >
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
          <div className="form-group">
            <label htmlFor="role">Tipo de usuário:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as "aluno" | "professor")}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>
          {role === "aluno" ? (
            <div className="form-group">
              <label htmlFor="curso">Curso:</label>
              <input
                type="text"
                id="curso"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="departamento">Departamento:</label>
              <input
                type="text"
                id="departamento"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
          )}
          <button type="submit">Registrar</button>
          <p className="toggle-text">
            Já tem conta?{" "}
            <button
              type="button"
              className="login-button"
              onClick={() => {
                resetFields();
                setIsRegistering(false);
              }}
            >
              Entrar
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/diario.png";
import "./auth.css";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) throw new Error("Erro no cadastro");

      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo do Diário" className="logo" />
      <h1 className="title">Meu Diário Pessoal</h1>
      <h2 className="subtitle">Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já tem uma conta?{" "}
        <span className="link" onClick={() => navigate("/")}>
          Fazer login
        </span>
      </p>
    </div>
  );
}

export default Register;


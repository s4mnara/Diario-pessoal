import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/diario.png";
import "./auth.css";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) throw new Error("Erro no login");

      const data = await response.json();
      console.log("✅ Resposta do backend:", data);

      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);

      const userResponse = await fetch("http://localhost:3000/auth/profile", {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      if (userResponse.ok) {
        const usuario = await userResponse.json();
        console.log("👤 Usuário autenticado:", usuario);

        // Lógica de segurança para garantir que é um objeto e tem nome
        let usuarioObjeto = usuario;
        if (typeof usuario === 'string') {
          usuarioObjeto = JSON.parse(usuario);
        }
        
        const primeiroNome = usuarioObjeto.nome ? usuarioObjeto.nome.split(" ")[0] : 'Usuário';

        localStorage.setItem("usuario", JSON.stringify(usuario));

        // 💡 CORREÇÃO FINAL: Navega APENAS DEPOIS de salvar e passa o nome no state
        navigate("/dashboard", { state: { primeiroNome: primeiroNome } });
      } else {
        console.warn("⚠️ Não foi possível buscar o perfil do usuário.");
        localStorage.removeItem("token");
        setToken(null);
        alert("Falha ao carregar o perfil. Tente novamente.");
      }
    } catch (error) {
      console.error("❌ Erro no login:", error);
      alert("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="Logo do Diário" className="logo" />
      <h1 className="title">Meu Diário Pessoal</h1>
      <h2 className="subtitle">Login</h2>

      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>

      <p>
        Não tem conta?{" "}
        <span className="link" onClick={() => navigate("/register")}>
          Cadastre-se
        </span>
      </p>
    </div>
  );
}

export default Login;


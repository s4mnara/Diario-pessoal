import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  NotebookPen,
  Home,
} from "lucide-react";
import Notas from "./Notas";
import Reflexoes from "./Reflexoes";
import Configuracoes from "./Configuracoes";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [aba, setAba] = useState("home");

  useEffect(() => {
    if (location.state?.primeiroNome) {
      setNomeUsuario(location.state.primeiroNome);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const usuarioData = localStorage.getItem("usuario");
    if (usuarioData) {
      try {
        let usuario = JSON.parse(usuarioData);
        if (typeof usuario === "string" && usuario.startsWith("{")) {
          usuario = JSON.parse(usuario);
        }
        if (usuario.nome) {
          setNomeUsuario(usuario.nome.split(" ")[0]);
        }
      } catch (error) {
        console.error("Erro ao ler usuário do localStorage:", error);
      }
    }
  }, [navigate, location.state]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const renderConteudo = () => {
    if (aba === "notas") return <Notas />;
    if (aba === "reflexoes") return <Reflexoes />;
    if (aba === "config") {
      return (
        <Configuracoes
          onProfileUpdate={(nome) => setNomeUsuario(nome.split(" ")[0])}
        />
      );
    }
    return (
      <div className="welcome-card">
        <h1>Bem-vindo(a), {nomeUsuario} 💙</h1>
        <h2>Seu Diário Pessoal</h2>
        <p>Use o menu ao lado para gerenciar notas, reflexões e configurações.</p>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-section">
          <NotebookPen size={42} className="logo-icon" />
          <h2>Meu Diário</h2>
        </div>

        <nav className="menu">
          <button
            className={`menu-item ${aba === "home" ? "active" : ""}`}
            onClick={() => setAba("home")}
          >
            <Home size={20} />
            <span>Início</span>
          </button>
          <button
            className={`menu-item ${aba === "notas" ? "active" : ""}`}
            onClick={() => setAba("notas")}
          >
            <BookOpen size={20} />
            <span>Minhas Notas</span>
          </button>
          <button
            className={`menu-item ${aba === "reflexoes" ? "active" : ""}`}
            onClick={() => setAba("reflexoes")}
          >
            <MessageSquare size={20} />
            <span>Reflexões</span>
          </button>
          <button
            className={`menu-item ${aba === "config" ? "active" : ""}`}
            onClick={() => setAba("config")}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </aside>

      <main className={`main-content ${aba !== "home" ? "main-content-fill" : ""}`}>
        {renderConteudo()}
      </main>
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import {
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  NotebookPen,
} from "lucide-react";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  useEffect(() => {
    // 1. Prioriza o nome passado no estado de navegação (Rápido na 1ª Montagem)
    if (location.state?.primeiroNome) {
      setNomeUsuario(location.state.primeiroNome);
      return; 
    }

    // 2. Tenta ler do localStorage (em caso de atualização manual)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const usuarioData = localStorage.getItem("usuario");
    if (usuarioData) {
      try {
        let usuario = JSON.parse(usuarioData);

        // Lógica para lidar com a dupla codificação, se o primeiro parse não for um objeto
        if (typeof usuario === 'string' && usuario.startsWith('{')) {
          usuario = JSON.parse(usuario);
        }

        if (usuario.nome) {
          const primeiroNome = usuario.nome.split(" ")[0];
          setNomeUsuario(primeiroNome);
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

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-section">
          <NotebookPen size={42} className="logo-icon" />
          <h2>Meu Diário</h2>
        </div>

        <nav className="menu">
          <button className="menu-item">
            <BookOpen size={20} />
            <span>Minhas Notas</span>
          </button>
          <button className="menu-item">
            <MessageSquare size={20} />
            <span>Reflexões</span>
          </button>
          <button className="menu-item">
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </aside>

      <main className="main-content">
        <div className="welcome-card">
          <h1>Bem-vindo(a), {nomeUsuario} 💙</h1>
          <h2>Seu Diário Pessoal</h2>
          <p>Aqui você pode gerenciar suas anotações e pensamentos!</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;



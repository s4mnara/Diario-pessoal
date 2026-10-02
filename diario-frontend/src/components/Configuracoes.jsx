import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";
import api from "../api/api";

function Configuracoes({ onProfileUpdate }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setNome(data.nome || "");
        setEmail(data.email || "");
        setErro("");
      } catch (e) {
        // fallback localStorage
        try {
          const raw = localStorage.getItem("usuario");
          if (raw) {
            const u = JSON.parse(raw);
            setNome(u.nome || "");
            setEmail(u.email || "");
          }
        } catch (_) {}
        setErro("Não foi possível carregar o perfil do servidor.");
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErro("");
    try {
      const payload = { nome, email };
      if (senha.trim()) payload.senha = senha;
      const { data } = await api.patch("/auth/profile", payload);
      localStorage.setItem(
        "usuario",
        JSON.stringify({ id: data.id, nome: data.nome, email: data.email })
      );
      setSenha("");
      setMsg("Perfil atualizado com sucesso!");
      if (onProfileUpdate) onProfileUpdate(data.nome);
    } catch (e) {
      const detail =
        e.response?.data?.message ||
        "Erro ao atualizar o perfil. Verifique os dados.";
      setErro(Array.isArray(detail) ? detail.join(", ") : detail);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="feature-panel">
      <h2>Configurações</h2>
      <p className="feature-subtitle">Atualize seu nome, e-mail ou senha.</p>

      {msg && <p className="feature-success">{msg}</p>}
      {erro && <p className="feature-error">{erro}</p>}

      <form className="feature-form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Nova senha (deixe em branco para manter)
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            minLength={6}
            placeholder="••••••"
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            <Save size={16} /> Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default Configuracoes;

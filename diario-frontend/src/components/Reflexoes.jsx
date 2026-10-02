import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import api from "../api/api";

const HUMORES = ["😊 Feliz", "😐 Neutro", "😔 Triste", "😤 Irritado", "🙏 Grato"];

function Reflexoes() {
  const [itens, setItens] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [humor, setHumor] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/reflexoes");
      setItens(data);
      setErro("");
    } catch (e) {
      setErro("Não foi possível carregar as reflexões.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const limparForm = () => {
    setTitulo("");
    setConteudo("");
    setHumor("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !conteudo.trim()) return;
    try {
      const payload = { titulo, conteudo, humor: humor || undefined };
      if (editId) {
        await api.patch(`/reflexoes/${editId}`, payload);
      } else {
        await api.post("/reflexoes", payload);
      }
      limparForm();
      carregar();
    } catch (e) {
      setErro("Erro ao salvar a reflexão.");
    }
  };

  const iniciarEdicao = (item) => {
    setEditId(item.id);
    setTitulo(item.titulo);
    setConteudo(item.conteudo);
    setHumor(item.humor || "");
  };

  const excluir = async (id) => {
    if (!window.confirm("Excluir esta reflexão?")) return;
    try {
      await api.delete(`/reflexoes/${id}`);
      if (editId === id) limparForm();
      carregar();
    } catch (e) {
      setErro("Erro ao excluir a reflexão.");
    }
  };

  return (
    <div className="feature-panel">
      <h2>Reflexões</h2>
      <p className="feature-subtitle">Registre seus pensamentos e humor do dia.</p>

      {erro && <p className="feature-error">{erro}</p>}

      <form className="feature-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <select value={humor} onChange={(e) => setHumor(e.target.value)}>
          <option value="">Humor (opcional)</option>
          {HUMORES.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Sua reflexão..."
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          rows={4}
          required
        />
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editId ? <Save size={16} /> : <Plus size={16} />}
            {editId ? "Salvar" : "Adicionar"}
          </button>
          {editId && (
            <button type="button" className="btn-secondary" onClick={limparForm}>
              <X size={16} /> Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="empty-msg">Nenhuma reflexão ainda. Escreva a primeira!</p>
      ) : (
        <ul className="item-list">
          {itens.map((item) => (
            <li key={item.id} className="item-card">
              <div className="item-body">
                <h3>
                  {item.titulo}
                  {item.humor ? <span className="humor-tag">{item.humor}</span> : null}
                </h3>
                <p>{item.conteudo}</p>
                <small>
                  {item.atualizadoEm
                    ? new Date(item.atualizadoEm).toLocaleString("pt-BR")
                    : ""}
                </small>
              </div>
              <div className="item-actions">
                <button type="button" onClick={() => iniciarEdicao(item)} title="Editar">
                  <Pencil size={16} />
                </button>
                <button type="button" onClick={() => excluir(item.id)} title="Excluir">
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reflexoes;

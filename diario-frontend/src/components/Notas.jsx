import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import api from "../api/api";

function Notas() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const carregar = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/notas");
      setNotas(data);
      setErro("");
    } catch (e) {
      setErro("Não foi possível carregar as notas.");
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
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !conteudo.trim()) return;
    try {
      if (editId) {
        await api.patch(`/notas/${editId}`, { titulo, conteudo });
      } else {
        await api.post("/notas", { titulo, conteudo });
      }
      limparForm();
      carregar();
    } catch (e) {
      setErro("Erro ao salvar a nota.");
    }
  };

  const iniciarEdicao = (nota) => {
    setEditId(nota.id);
    setTitulo(nota.titulo);
    setConteudo(nota.conteudo);
  };

  const excluir = async (id) => {
    if (!window.confirm("Excluir esta nota?")) return;
    try {
      await api.delete(`/notas/${id}`);
      if (editId === id) limparForm();
      carregar();
    } catch (e) {
      setErro("Erro ao excluir a nota.");
    }
  };

  return (
    <div className="feature-panel">
      <h2>Minhas Notas</h2>
      <p className="feature-subtitle">Crie, edite e organize suas anotações.</p>

      {erro && <p className="feature-error">{erro}</p>}

      <form className="feature-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Conteúdo da nota..."
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
      ) : notas.length === 0 ? (
        <p className="empty-msg">Nenhuma nota ainda. Crie a primeira!</p>
      ) : (
        <ul className="item-list">
          {notas.map((nota) => (
            <li key={nota.id} className="item-card">
              <div className="item-body">
                <h3>{nota.titulo}</h3>
                <p>{nota.conteudo}</p>
                <small>
                  {nota.atualizadoEm
                    ? new Date(nota.atualizadoEm).toLocaleString("pt-BR")
                    : ""}
                </small>
              </div>
              <div className="item-actions">
                <button type="button" onClick={() => iniciarEdicao(nota)} title="Editar">
                  <Pencil size={16} />
                </button>
                <button type="button" onClick={() => excluir(nota.id)} title="Excluir">
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

export default Notas;

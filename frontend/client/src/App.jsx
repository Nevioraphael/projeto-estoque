// client/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/produtos';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', quantidade: '', preco: '' });
  const [editando, setEditando] = useState(null);
  const [toast, setToast] = useState(null);

  // Buscar produtos ao carregar a página
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(API_URL);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, quantidade: Number(form.quantidade), preco: Number(form.preco) };
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, payload);
        setEditando(null);
        setToast({ message: 'Produto atualizado com sucesso', type: 'success' });
      } else {
        await axios.post(API_URL, payload);
        setToast({ message: 'Produto criado com sucesso', type: 'success' });
      }
      setForm({ nome: '', descricao: '', quantidade: '', preco: '' });
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto', error);
      setToast({ message: 'Erro ao salvar produto', type: 'error' });
    }
  };

  const handleEdit = (produto) => {
    setForm(produto);
    setEditando(produto.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProdutos();
        setToast({ message: 'Produto deletado com sucesso', type: 'success' });
      } catch (error) {
        console.error('Erro ao deletar', error);
        setToast({ message: 'Erro ao deletar produto', type: 'error' });
      }
    }
  };

  // Auto-dismiss toast after 3s
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="container">
      {toast && (
        <div className={`toast ${toast.type}`} role="status">
          {toast.message}
        </div>
      )}
      <div className="header">
        <div className="title">
          <h1>📦 Sistema de Estoque</h1>
          
        </div>
        <div className="summary">Produtos: {produtos.length}</div>
      </div>

      <div className="content">
        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <input name="nome" placeholder="Nome do Produto" value={form.nome} onChange={handleChange} required />
            <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
            <input name="quantidade" type="number" placeholder="Quantidade" value={form.quantidade} onChange={handleChange} required />
            <input name="preco" type="number" step="0.01" placeholder="Preço (R$)" value={form.preco} onChange={handleChange} required />
            <div className="actions full">
              <button type="submit" className="btn btn-primary">{editando ? 'Atualizar' : 'Cadastrar'}</button>
              {editando && <button type="button" className="btn btn-ghost" onClick={() => { setEditando(null); setForm({ nome: '', descricao: '', quantidade: '', preco: '' }); }}>Cancelar</button>}
            </div>
          </form>
        </div>

        <div className="card table-wrap">
          <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
                <td className="price">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(produto.preco))}</td>
              <td>
                <div className="actions-cell">
                  <button className="btn-edit" onClick={() => handleEdit(produto)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(produto.id)}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import useApiStore from '../../../services/web-api.js';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthAdmin from '../../../hooks/adminAuth.js';
import './formReserva.css';

// Componente para editar uma reserva existente
function EditarReserva() {
  // Recupera autenticação de admin, navegação e id da reserva
  const { authUser, authHeader } = useAuthAdmin();
  const { id } = useParams();
  const navigate = useNavigate();
  // Funções da store para buscar, atualizar e deletar reserva
  const { getReservaById, updateReserva, deleteReserva, loading } = useApiStore();
  // Estado para exibir o modal de confirmação de exclusão
  const [showModal, setShowModal] = useState(false);
  // Abre o modal de confirmação de exclusão
  const abrirModal = () => {
    setShowModal(true);
  };

  // Fecha o modal de confirmação
  const fecharModal = () => {
    setShowModal(false);
  };

  // Confirma a exclusão da reserva
  const confirmarExclusao = async () => {
    try {
      await deleteReserva(id, authHeader);
      navigate('/admin/reservas');
    } catch (error) {
      console.error('Erro ao excluir reserva:', error);
      alert('Não foi possível excluir a reserva. Tente novamente.');
    }
    fecharModal();
  };

  // Estado do formulário da reserva
  const [form, setForm] = useState({
    quarto_id: '',
    cliente_id: '',
    hospedes: '',
    inicio: '',
    fim: ''
  });

  // Busca os dados da reserva ao carregar o componente
  useEffect(() => {
    async function fetchData() {
      const data = await getReservaById(id);
      if (data) {
        setForm({
          quarto_id: data.quarto_id || '',
          cliente_id: data.cliente_id || '',
          hospedes: data.hospedes || '',
          inicio: data.inicio ? data.inicio.slice(0, 10) : '',
          fim: data.fim ? data.fim.slice(0, 10) : ''
        });
      }
    }
    fetchData();
  }, [id, getReservaById]);

  // Atualiza o estado do formulário ao digitar nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Envia o formulário para atualizar a reserva
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReserva(id, form, authHeader);
      navigate('/admin/reservas');
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
      alert('Não foi possível salvar as alterações. Tente novamente.');
    }
  };

  return (
    <div className="editar-reserva-container">
      <h1 className="editar-reserva-title">Editar Reserva</h1>
      <form className="editar-reserva-form" onSubmit={handleSubmit}>
        <label>
          ID do Quarto:
          <input
            type="number"
            name="quarto_id"
            value={form.quarto_id}
            onChange={handleChange}
            className="editar-reserva-input"
            required
          />
        </label>
        <label>
          ID do Cliente:
          <input
            type="number"
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            className="editar-reserva-input"
            required
          />
        </label>
        <label>
          Hóspedes:
          <input
            type="number"
            name="hospedes"
            value={form.hospedes}
            onChange={handleChange}
            className="editar-reserva-input"
            required
          />
        </label>
        <label>
          Início:
          <input
            type="date"
            name="inicio"
            value={form.inicio}
            onChange={handleChange}
            className="editar-reserva-input"
            required
          />
        </label>
        <label>
          Fim:
          <input
            type="date"
            name="fim"
            value={form.fim}
            onChange={handleChange}
            className="editar-reserva-input"
            required
          />
        </label>
        <div className="editar-reserva-actions">
          <button
            type="button"
            className="editar-reserva-cancelar"
            onClick={() => navigate('/admin/reservas')}
            disabled={loading}
          >
            Cancelar
          </button>

                    <button
            type="button"
            className="editar-reserva-excluir"
            onClick={abrirModal}
            disabled={loading}
            style={{ marginLeft: '10px', background: '#bd1b15ff', color: 'white' }}
          >
            Excluir Reserva
          </button>
          
          <button
            type="submit"
            className="editar-reserva-salvar"
            disabled={loading}
          >
            Salvar
          </button>

        </div>
      </form>
      {showModal && (
        <div className="modal-bg" onClick={fecharModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Confirmar Exclusão</h2>
            <p>Deseja realmente excluir esta reserva?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={fecharModal}>Cancelar</button>
              <button className="btn-confirm" onClick={confirmarExclusao}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarReserva;

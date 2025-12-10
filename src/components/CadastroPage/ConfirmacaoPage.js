import "./CadastroPage.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';

import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useApiStore from '../../services/web-api.js';

function ConfirmacaoPage() {
  const navigate = useNavigate();
  const { confirmCliente, loading } = useApiStore();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Retrieve user info from sessionStorage
  useEffect(() => {
    const userInfo = sessionStorage.getItem('userInfo');
    if (userInfo) {
      const { nome, email, telefone, senha } = JSON.parse(userInfo);
      setNome(nome);
      setEmail(email);
      setTelefone(telefone);
      setSenha(senha);
    } else {
      setError('Erro interno. Tente novamente.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!codigo) {
      setError("Digite o código de confirmação.");
      return;
    }

    setLoading(true);
    try {
      const userInfo = sessionStorage.getItem('userInfo');
      if (!userInfo) {
        setError('Erro interno. Tente novamente.');
        setLoading(false);
        return;
      }

      const { nome, email, telefone, senha } = JSON.parse(userInfo);
      const response = await confirmCliente({ nome, email, telefone, senha, confirmationCode: codigo });

      if (response && response.success) {
        setSuccess("Cadastro confirmado com sucesso!");
        sessionStorage.removeItem('userInfo');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(response.message || "Código inválido ou expirado.");
      }
    } catch (err) {
      setError("Erro ao confirmar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo-title-row">
          <div className="logo">
            <img className="logo-img-login" src={logo} alt="Logo" />
          </div>
          <h1>Hotel <br /> Brasileiro</h1>
        </div>
        <h2>Confirmação de Cadastro</h2>
        <p>Insira o código enviado para o seu email.</p>
      </div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Confirme seu Cadastro</h2>
          <label>Código de Confirmação</label>
          <input
            type="text"
            name="codigo"
            placeholder="Digite o código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            autoComplete="off"
          />
          {error && <div style={{ color: 'red', margin: '8px 0', textAlign: 'center' }}>{error}</div>}
          {success && <div style={{ color: 'green', margin: '8px 0', textAlign: 'center' }}>{success}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Confirmando..." : "Confirmar Cadastro"}
          </button>
          <div className="back-home" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <p>Volte para o início</p>
            <img className="home-icon" src={homeimg} alt="Home" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmacaoPage;
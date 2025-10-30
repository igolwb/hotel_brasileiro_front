import "./novaSenha.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function NovaSenha() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!password || !confirmPassword) {
      setMessage('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://test-back-7vih.onrender.com/api/clientes/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate('/login');
      } else {
        setMessage(data.message || 'Erro ao atualizar senha.');
      }
    } catch (err) {
      setMessage('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo-title-row">
          <div className="logo">
            <img className='logo-img-login' src={logo} alt="Logo" />
          </div>
          <h1>
            Hotel <br /> Brasileiro
          </h1>
        </div>
        <h2>Sua próxima jornada começa aqui</h2>
        <p>
          Só precisamos de duas coisas: <br />
          seu email e sua vontade de relaxar.
        </p>
      </div>
      <div className="right-panel">
        <form className="password-form" onSubmit={handleSubmit}>
          <h2>Digite sua nova senha</h2>

          <div className="input-group">
            <label>Digite sua nova senha:</label>
            <div className="password-input" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirme sua nova senha:</label>
            <div className="password-input" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {message && (
            <div style={{ color: 'red', fontSize: '0.95rem', marginTop: '12px', textAlign: 'center' }}>{message}</div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Redefinindo...' : 'Redefinir senha'}</button>

          <div className="back-home">
            <p>Volte para o início</p>
            <img className="home-icon" src={homeimg} alt="Home" onClick={() => navigate('/')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaSenha;
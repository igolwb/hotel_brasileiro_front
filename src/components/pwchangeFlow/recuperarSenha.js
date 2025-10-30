import "./recuperarsenha.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setMessage('Digite um email válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://test-back-7vih.onrender.com/api/clientes/send-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate('/emailCode', { state: { email } });
      } else {
        setMessage(data.message || 'Erro ao enviar token.');
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
        <form className="recover-form" onSubmit={handleSend}>
          <h2>Recuperar senha</h2>
          <p className="subtitle">Digite seu email para receber o código de recuperação</p>

          <div className="input-with-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '320px' }}
            />
          </div>

          {message && (
            <div style={{ color: message.includes('Erro') ? 'red' : 'green', fontSize: '0.95rem', marginTop: '12px', textAlign: 'center' }}>{message}</div>
          )}

          <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Prosseguir'}</button>

          <div className="back-home">
            <p>Volte para o início</p>
            <img className="home-icon" src={homeimg} alt="Home" onClick={() => navigate('/')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;


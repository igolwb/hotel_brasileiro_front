import "./emailcode.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function EmailCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [code, setCode] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleResend = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        "https://test-back-7vih.onrender.com/api/clientes/send-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

        if (response.ok && data.success) {
        navigate('/novaSenha', { state: { email } });
      } else {
        setMessage(data.message || "Erro ao reenviar código.");
      }
    } catch (err) {
      setMessage("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    setLoading(true);
    try {
      const response = await fetch(
        "https://test-back-7vih.onrender.com/api/clientes/send-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Código enviado para seu email.");
        navigate("/novaSenha", { state: { email } });
      } else {
        setMessage(data.message || "Erro ao enviar código.");
      }
    } catch (err) {
      setMessage("Erro de conexão. Tente novamente.");
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
        <form className="code-form" onSubmit={handleSubmit}>
          <h2>Enviamos um código para seu e-mail</h2>
          <p className="subtitle">Digite o código de verificação que enviamos para seu e-mail.</p>

          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={1}
                className="code-input"
              />
            ))}
          </div>

          <button type="button" className="resend-button" onClick={handleResend} disabled={loading}>{loading ? 'Enviando...' : 'Reenviar código'}</button>
          <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Verificando...' : 'Enviar'}</button>

          {message && (
            <div className="message" style={{ color: 'red', fontSize: '0.95rem', marginTop: '12px', textAlign: 'center' }}>{message}</div>
          )}

          <div className="back-home">
            <p>Volte para o início</p>
            <img className="home-icon" src={homeimg} alt="Home" onClick={() => navigate('/')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailCode;
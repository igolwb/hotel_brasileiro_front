import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/homePage.js';
import LoginPage from '../pages/LoginPage/loginPage.js';
import CadastroPage from '../pages/CadastroPage/cadastroPage.js';
import ReservaPage from '../pages/ReservarPage/reservarPage.js';
import Clientes from '../pages/AdminPages/ClientePage/clientePage.js';
import Quartos from '../pages/AdminPages/QuartoPage/quartoPage.js';
import EditarQuarto from '../pages/AdminPages/EditarQuarto/editQuarto.js';
import AddQuarto from '../pages/AdminPages/EditarQuarto/addQuarto.js';
import AdminReservas from '../pages/AdminPages/ReservasPage/reservasPage.js';
import EditarReserva from '../pages/AdminPages/EditarReserva/editReserva.js';
import AddReserva from '../pages/AdminPages/EditarReserva/addReserva.js';
import MinhasReservas from '../pages/MenuUser/menuUser.js';
import SuccessPage from '../pages/ReservaConcluida/successPage.js';
import ReservaGraphs from '../pages/AdminPages/ReservaGraphs/reservaGraphs.js';
import RecuperarSenha from '../pages/pwchangeFlow/recuperarSenha.js';
import EmailCode from '../pages/pwchangeFlow/emailcode.js';
import NovaSenha from '../pages/pwchangeFlow/novaSenha.js';
import ConfirmacaoPage from '../pages/CadastroPage/ConfirmacaoPage.js'; // Importando a nova página de confirmação


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/emailCode" element={<EmailCode />} />
      <Route path="/novaSenha" element={<NovaSenha />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/reserva/:roomId" element={<ReservaPage />} />
      <Route path="/reserva/concluida" element={<SuccessPage />} />
      <Route path="/minhas-reservas" element={<MinhasReservas />} />
      <Route path="/confirmacao" element={<ConfirmacaoPage />} /> {/* Rota para a página de confirmação */}

      {/* Rotas de Admin */}

      <Route path="/admin/clientes" element={<Clientes />} />

      <Route path="/admin/quartos" element={<Quartos />} />
      <Route path="/admin/quartos/:id" element={<EditarQuarto />} />
      <Route path="/admin/quartos/addQuarto" element={<AddQuarto />} />

      <Route path="/admin/reservas" element={<AdminReservas />} />
      <Route path="/admin/estatisticas" element={<ReservaGraphs />} />
      <Route path="/admin/reservas/:id" element={<EditarReserva />} />
      <Route path="/admin/reservas/addReserva" element={<AddReserva />} />
    </Routes>
  );
}

export default AppRoutes;

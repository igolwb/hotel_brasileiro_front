import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/homePage.js';
import LoginPage from '../components/LoginPage/loginPage.js';
import CadastroPage from '../components/CadastroPage/cadastroPage.js';
import ReservaPage from '../components/ReservarPage/reservarPage.js';
import Clientes from '../components/AdminPages/ClientePage/clientePage.js';
import Quartos from '../components/AdminPages/QuartoPage/quartoPage.js';
import EditarQuarto from '../components/AdminPages/EditarQuarto/editQuarto.js';
import AddQuarto from '../components/AdminPages/EditarQuarto/addQuarto.js';
import AdminReservas from '../components/AdminPages/ReservasPage/reservasPage.js';
import EditarReserva from '../components/AdminPages/EditarReserva/editReserva.js';
import AddReserva from '../components/AdminPages/EditarReserva/addReserva.js';
import MinhasReservas from '../components/MenuUser/menuUser.js';
import SuccessPage from '../components/ReservaConcluida/successPage.js';
import ReservaGraphs from '../components/AdminPages/ReservaGraphs/reservaGraphs.js';
import RecuperarSenha from '../components/pwchangeFlow/recuperarSenha.js';
import EmailCode from '../components/pwchangeFlow/emailcode.js';
import NovaSenha from '../components/pwchangeFlow/novaSenha.js';


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

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import { CssBaseline } from '@mui/material';
import axios from 'axios';
import Layout from './layout/Layout';
import NotFoundView from './views/NotFoundView';
import ActividadesPorUnidadesView from './views/ActividadesPorUnidadesView';
import UnidadView from './views/UnidadView';
import DescripcionActividadView from './views/DescipcionActividadView';
import PanelControlView from './views/PanelControlView';
import LoginView from './views/LoginView';
import RegistroView from './views/RegistroView';
import AsignarView from './views/AsignarView';
import AgregarCursoView from './views/AgregarCursoView';
import CursosView from './views/CursosView';
import ParticipantesView from './views/ParticipantesView';
import EditarCursoView from './views/EditarCursoView';
import QRView from './views/QRView';
// import CursoView from './views/CursoView';
import EditarEstudianteView from './views/EditarEstudianteView';
import ProtectedRoute from './layout/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';

axios.defaults.withCredentials = true;

const App = () => (
  <>
    <CssBaseline />
    <Helmet>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins"
      />
      <title>Kidspace | Aplicacion educativa STEAM</title>
      <meta name="description" content="Aplicación educativa libre de sesgos de género que, mediante desafíos con Realidad Aumentada e IA, desarrolla habilidades STEAM en niños y niñas, introduciéndolos a distintas profesiones." />
    </Helmet>
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PanelControlView />} />
            <Route path="/login" element={<ProtectedRoute loggedout><LoginView /></ProtectedRoute>} />
            <Route path="/registro" element={<ProtectedRoute loggedout><RegistroView /></ProtectedRoute>} />
            {/* <Route path="/curso" element={<CursoView />} /> */}
            <Route path="/cursos" element={<CursosView />} />
            <Route path="/cursos/:cursoId/:estudianteId" element={<EditarEstudianteView />} />
            <Route path="/cursos/agregar" element={<AgregarCursoView />} />
            <Route path="/cursos/:cursoId" element={<ParticipantesView />} />
            <Route path="/cursos/:cursoId/editar" element={<EditarCursoView />} />
            <Route path="/cursos/:cursoId/qr" element={<QRView />} />
            <Route path="/actividades" element={<ActividadesPorUnidadesView />} />
            <Route path="/actividades/unidad/:nunidad" element={<UnidadView />} />
            <Route path="/actividades/unidad/:nunidad/actividad/:nactividad" element={<DescripcionActividadView />} />
            <Route path="/actividades/unidad/:nunidad/actividad/:nactividad/asignar" element={<AsignarView />} />
            <Route path="/estadisticas" />
            <Route path="/*" element={<NotFoundView />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  </>
);

export default App;

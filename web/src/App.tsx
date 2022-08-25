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
      <Layout>
        <Routes>
          <Route path="/" element={<PanelControlView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/registro" element={<RegistroView />} />
          <Route path="/cursos" />
          <Route path="/actividades" element={<ActividadesPorUnidadesView />} />
          <Route path="/actividades/unidad/:nunidad" element={<UnidadView />} />
          <Route path="/actividades/unidad/:nunidad/actividad/:nactividad" element={<DescripcionActividadView />} />
          <Route path="/actividades/unidad/:nunidad/actividad/:nactividad/asignar" element={<AsignarView />} />
          <Route path="/estadisticas" />
          <Route path="/*" element={<NotFoundView />} />
        </Routes>
      </Layout>
    </Router>
  </>
);

export default App;

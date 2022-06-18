import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import { CssBaseline } from '@mui/material';
import Layout from './layout/Layout';
import NotFoundView from './views/NotFoundView';
import ActividadesPorUnidadesView from './views/ActividadesPorUnidadesView';
import UnidadView from './views/UnidadView';
import DescripcionActividadView from './views/DescipcionActividadView';
import PanelControlView from './views/PanelControlView';
import AsignarView from './views/AsignarView';

const App = () => (
  <>
    <CssBaseline />
    <Helmet>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins"
      />
    </Helmet>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PanelControlView />} />
          <Route path="/cursos" />
          <Route path="/actividades" element={<ActividadesPorUnidadesView />} />
          <Route path="/actividades/unidad/:nUnidad" element={<UnidadView />} />
          <Route path="/actividades/unidad/:nUnidad/actividad/:nActividad" element={<DescripcionActividadView />} />
          <Route path="/actividades/unidad/:nUnidad/actividad/:nActividad/asignar" element={<AsignarView />} />
          <Route path="/estadisticas" />
          <Route path="/*" element={<NotFoundView />} />
        </Routes>
      </Layout>
    </Router>
  </>
);

export default App;

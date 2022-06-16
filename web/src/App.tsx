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
import KoroneTestView from './views/KoroneTestView';
import NotFoundView from './views/NotFoundView';
import ActividadesPorUnidadesView from './views/ActividadesPorUnidadesView';
import UnidadView from './views/UnidadView';

const App = () => (
  <>
    <CssBaseline />
    <Helmet>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Helmet>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<KoroneTestView />} />
          <Route path="/cursos" />
          <Route path="/actividades" element={<ActividadesPorUnidadesView />} />
          <Route path="/actividades/unidad/:nUnidad" element={<UnidadView />} />
          <Route path="/estadisticas" />
          <Route path="/*" element={<NotFoundView />} />
        </Routes>
      </Layout>
    </Router>
  </>
);

export default App;

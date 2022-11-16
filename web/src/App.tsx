import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import {
  createTheme, CssBaseline, ThemeProvider,
} from '@mui/material';
import { esES } from '@mui/x-data-grid';
import { esES as pickersesES } from '@mui/x-date-pickers';
import { esES as coreesES } from '@mui/material/locale';
import axios from 'axios';
import Layout from './layout/Layout';
import NotFoundView from './views/NotFoundView';
import LandingView from './views/LandingView';
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
import EstadisticasProfesorView from './views/EstadisticasProfesorView';
import PupilosView from './views/PupilosView';
import EstadisticasApoderadoView from './views/EstadisticasApoderadoView';
import QRView from './views/QRView';
import ActividadIndividualView from './views/ActividadIndividualView';
import ActividadDocenteView from './views/ActividadDocenteView';
import EditarEstudianteView from './views/EditarEstudianteView';
import ProtectedRoute from './layout/ProtectedRoute';

import ProfesoresView from './views/institucion/ProfesoresView';
// import EditarProfesorView from './views/institucion/EditarProfesorView';
import AgregarProfesorView from './views/institucion/AgregarProfesorView';

import { AuthProvider } from './hooks/useAuth';
import Aprobado from './views/Pagos/AprobadoView';
import Rechazado from './views/Pagos/RechazadoView';
import PaquetesView from './views/Pagos/PaquetesView';
import RedirectHomeRoute from './layout/RedirectHomeRoute';

axios.defaults.withCredentials = true;

const { palette } = createTheme();
const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#5c9dec',
        contrastText: 'rgb(255, 255, 255)',
      },
      secondary: {
        main: '#f57c00',
      },
      tertiary: palette.augmentColor({ color: { main: '#EC87C0' } }),
      quaternary: palette.augmentColor({ color: { main: '#A1C96A' } }),
      textcol: {
        ...palette.augmentColor({ color: { main: '#063d69' } }),
        light: '#5C9DEC',
      },
      extra: palette.augmentColor({ color: { main: '#F1F3F8' } }),
    },
    typography: {
      fontFamily: 'Poppins',
      allVariants: {
        color: '#063d69',
      },
    },
  },
  esES, // x-data-grid translations
  pickersesES, // x-date-pickers translations
  coreesES, // core translations
);

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
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute loggedout />}>
              <Route path="/" element={<LandingView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/registro" element={<RegistroView />} />
              <Route path="/aprobado/:planId" element={<Aprobado />} />
              <Route path="/rechazado" element={<Rechazado />} />
            </Route>
            <Route element={<ProtectedRoute loggedin noProfesor noApoderado />}>
              <Route path="/paquetes" element={<PaquetesView />} />
            </Route>
            <Route element={<ProtectedRoute loggedin />}>
              <Route element={<Layout />}>
                <Route element={<ProtectedRoute noApoderado noRepresentante />}>
                  <Route path="/panel" element={<PanelControlView />} />
                  <Route path="/cursos" element={<CursosView />} />
                  <Route path="/cursos/:cursoId/:estudianteId" element={<EditarEstudianteView />} />
                  <Route path="/cursos/agregar" element={<AgregarCursoView />} />
                  <Route path="/cursos/:cursoId" element={<ParticipantesView />} />
                  <Route path="/cursos/:cursoId/editar" element={<EditarCursoView />} />
                  <Route path="/cursos/:cursoId/qr" element={<QRView />} />
                  <Route path="/cursos/:cursoId/estadisticas" element={<EstadisticasProfesorView />} />
                  <Route path="/cursos/:cursoId/estadisticas/actividadDocente/:actividad" element={<ActividadDocenteView />} />
                  <Route path="/cursos/:cursoId/estadisticas/actividadIndividual/:actividad" element={<ActividadIndividualView />} />
                  <Route path="/cursos/:cursoId/estadisticas/estadisticasEstudiante/:pupiloId" element={<EstadisticasApoderadoView />} />
                  <Route path="/actividades" element={<ActividadesPorUnidadesView />} />
                  <Route path="/actividades/unidad/:nunidad" element={<UnidadView />} />
                  <Route path="/actividades/unidad/:nunidad/actividad/:nactividad" element={<DescripcionActividadView />} />
                  <Route path="/actividades/unidad/:nunidad/actividad/:nactividad/asignar" element={<AsignarView />} />
                </Route>
                <Route element={<ProtectedRoute noProfesor noRepresentante />}>
                  <Route path="/pupilo" element={<PupilosView />} />
                  <Route path="/pupilo/:pupiloId/estadisticas" element={<EstadisticasApoderadoView />} />
                </Route>
                <Route element={<ProtectedRoute noProfesor noApoderado hasPlan />}>
                  <Route path="/profesores" element={<ProfesoresView />} />
                  <Route path="/profesores/agregar" element={<AgregarProfesorView />} />
                  <Route path="/profesores/:profesorId/editar" element={<AgregarProfesorView />} />
                </Route>
                <Route path="/" element={<RedirectHomeRoute />} />
                <Route path="/*" element={<NotFoundView />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </>
);

export default App;

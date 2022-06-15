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
import NotFound from './views/NotFound';

// const App = () => (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );

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
          <Route path="/actividades" />
          <Route path="/estadisticas" />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  </>
);

export default App;

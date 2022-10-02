/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundView from './NotFoundView';
import '../App.css';
import PupilosTable from '../components/PupilosTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

const img = require('../assets/statistics.png');

const PupilosView = () => {
  const params = useParams();
  const [curso, setCurso] = useState<ICurso>();
  const [loading, setLoading] = useState(true);
  const { cursoId } = params;
  const navigate = useNavigate();

  const { logout } = useAuth();
  const getCurso = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/63310b2d77aa3a312eb9fcb5`); // ${cursoId}`);
      setCurso(res.data.curso);
      console.log(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!curso) getCurso();
  }, []);

  if (loading) return (<Box />);
  if (!curso) return (<NotFoundView />);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Stack
        direction="row"
        style={{
          width: '100%', justifyContent: 'center', height: '30vh', backgroundColor: '#F2C144', alignItems: 'center',
        }}
      >
        <Stack direction="column" spacing={2} sx={{ margin: 2, width: 4 / 5 }}>
          <Typography display="block" variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>Hola, nombre</b>
          </Typography>
          <Typography display="block" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>¡Te damos la bienvenida al sistema de estadísticas de Kidspace!</b>
          </Typography>
        </Stack>
        <Box
          component="img"
          sx={{
            alignSelf: 'right',
            maxHeight: '25vh',
            margin: 2,
          }}
          src={img}
        />
      </Stack>
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Lista de pupilos
        </Typography>
        <PupilosTable rows={curso.estudiantes} updateEstudiantes={getCurso} />
      </Box>
    </Stack>
  );
};
export default PupilosView;

/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box, Stack, Theme, Typography,
} from '@mui/material';
import axios from 'axios';
import PupilosTable from '../components/PupilosTable';
import { useAuth } from '../hooks/useAuth';
import { IEstudiantes } from '../types/estudiantes';
import CargaView from './LoadingView';
import NotFoundView from './NotFoundView';

const img = require('../assets/statistics.png');

const PupilosView = () => {
  const [estudiantes, setEstudiantes] = useState<IEstudiantes>();
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const { user } = useAuth();

  const getCurso = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Apoderado/mispupilos`);
      setEstudiantes(res.data.estudiantes);
      setLoading(false);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!estudiantes) getCurso();
  }, []);

  if (loading) return (<CargaView />);
  if (!estudiantes) return (<NotFoundView />);
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
            <b>Hola, {user?.nombres} {user?.apellidos}</b>
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
        <PupilosTable rows={estudiantes} />
      </Box>
    </Stack>
  );
};
export default PupilosView;

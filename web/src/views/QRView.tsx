import React, { useEffect, useState } from 'react';
import {
  Box,
  Card, Grid,
  CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Qr from '../components/Qr';
import NotFoundView from './NotFoundView';
import '../App.css';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

const img = require('../assets/cursosimg.png');
const logoKidspace = require('../assets/logo-horizontal.png');

const QRView = () => {
  const params = useParams();
  const [curso, setCurso] = useState<ICurso>();
  const [loading, setLoading] = useState(true);
  const { cursoId } = params;
  // const navigate = useNavigate();

  const { logout } = useAuth();

  const getCurso = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
      setCurso(res.data.curso);
      setLoading(false);
      console.log(res.data);
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
          width: '100%', justifyContent: 'center', height: '30vh',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#B878EA', px: 3, py: 3, width: 1.5 / 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography display="block" variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
              <b>Curso: {curso.nombre}</b>
            </Typography>
          </Stack>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 2.5 / 4 }}
          image={img}
        />
      </Stack>
      <Grid
        container
        spacing={0}
        justifyContent="center"
      >
        <Grid item xs={12} sm={12} md={6}>
          <Stack justifyContent="center" spacing={3} sx={{ height: '100%', p: 4, ml: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
              <b>Modo de uso:</b>
            </Typography>{' '}
            <Typography display="block" sx={{ marginBottom: 2 }}>
              Proyecte el código en la pantalla o imprima el
              código para entregarlo a cada estudiante.
            </Typography>
            <Typography display="block" sx={{ marginBottom: 2 }}>
              Una vez que la aplicación reconozca el código,
              el o la estudiante podrá rellenar sus datos y estos
              serán automáticamente agregados a la lista del
              curso.
            </Typography>
            <Typography display="block" sx={{ marginBottom: 2 }}>
              Estos datos posteriormente pueden ser editados
              por el o la docente con acceso al curso.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Card sx={{
              alignItems: 'center', justifyContent: 'center', borderRadius: 5, paddingLeft: 8, paddingRight: 8,
            }}
            >
              <Qr curso={curso} />
              <CardMedia
                component="img"
                sx={{ height: '25%' }}
                image={logoKidspace}
              />
              <Typography variant="h5">
                ¡Únete al curso {curso.nombre}!
              </Typography>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
export default QRView;

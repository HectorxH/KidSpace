import React from 'react';
import {
  Box,
  Card,
  CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import NotFoundView from './NotFoundView';
import RSize from '../utils/responsive';
import '../App.css';

const img = require('../assets/cursosimg.png');
const logoKidspace = require('../assets/logo-horizontal.png');

const QRView = () => {
  const params = useParams();
  const { ncurso } = params;
  // const navigate = useNavigate();
  if (typeof ncurso === 'undefined') return (<NotFoundView />);

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Stack direction="row" style={{ width: '100%', justifyContent: 'center' }}>
        <Box
          sx={{
            backgroundColor: '#B878EA', px: 3, py: 3, width: 1.5 / 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography display="block" variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
              <b>Curso: {ncurso}</b>
            </Typography>
          </Stack>
        </Box>
        <CardMedia
          component="img"
          sx={{ height: RSize(0.3, 'h'), width: 3.5 / 4 }}
          image={img}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
        sx={{ p: 4 }}
      >
        <Box sx={{ width: 2 / 4, margin: 4 }}>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Modo de uso:
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
        </Box>
        <Box sx={{ width: 2 / 4, justifyContent: 'center' }}>
          <Card sx={{
            alignItems: 'center', justifyContent: 'center', margin: 4, borderRadius: '20px', paddingBottom: 5,
          }}
          >
            <CardMedia
              component="img"
              sx={{ height: 100, width: 100, margin: 5 }}
              image={img}
            />
            <CardMedia
              component="img"
              sx={{ width: '50%' }}
              image={logoKidspace}
            />
            <Typography variant="h5">
              ¡Únete al curso {ncurso}!
            </Typography>
          </Card>
        </Box>
      </Stack>
    </Stack>
  );
};
export default QRView;

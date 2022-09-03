import React from 'react';
import {
  Box,
  Button,
  CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import NotFoundView from './NotFoundView';
import RSize from '../utils/responsive';
import '../App.css';

const img = require('../assets/cursosimg.png');

const ParticipantesView = () => {
  const params = useParams();
  const { ncurso } = params;
  const navigate = useNavigate();
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
            <Button
              sx={{ backgroundColor: '#A66CD4', color: '#FFFFFF' }}
              onClick={() => navigate(`/cursos/${ncurso}/editar`)}
            ><EditIcon /> Editar
            </Button>
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
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box
          sx={{
            width: 2 / 4,
          }}
        >
          <Typography>
            Los y las estudiantes deben escanear el código
            QR dentro de la aplicación para unirse al curso.
          </Typography>
        </Box>
        <Button
          sx={{ backgroundColor: '#FF8A01', color: '#FFFFFF', marginRight: 2 }}
          onClick={() => navigate(`/cursos/${ncurso}/qr`)}
        >
          <QrCodeIcon />Generar QR
        </Button>
      </Stack>
    </Stack>
  );
};
export default ParticipantesView;

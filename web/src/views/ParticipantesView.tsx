/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card, Grid,
  CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import NotFoundView from './NotFoundView';
import '../App.css';
import CursoTable from '../components/CursoTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

const img = require('../assets/cursosimg.png');

const ParticipantesView = () => {
  const params = useParams();
  const [curso, setCurso] = useState<ICurso>();
  const [loading, setLoading] = useState(true);
  const { cursoId } = params;
  const navigate = useNavigate();

  const { logout } = useAuth();
  const getCurso = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
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
            <Button
              sx={{ backgroundColor: '#A66CD4', color: '#FFFFFF' }}
              onClick={() => navigate(`/cursos/${cursoId}/editar`)}
            ><EditIcon /> Editar
            </Button>
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
        justifyContent="right"
        sx={{ px: 2 }}
      >
        <Grid item xs={12} sm={12} md={3} />
        <Grid item xs={12} sm={12} md={6}>
          <Typography>
            Los y las estudiantes deben escanear el código
            QR dentro de la aplicación para unirse al curso.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Button
              startIcon={<QrCodeIcon />}
              sx={{
                backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                width: 150,
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#ffbe82',
                  color: '#FFFFFF',
                },
              }}
              onClick={() => navigate(`/cursos/${cursoId}/qr`)}
            >
              Generar QR
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          Participantes
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Stack sx={{
            maxWidth: 850, marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <CursoTable rows={curso.estudiantes} updateEstudiantes={getCurso} />
          </Stack>
        </Stack>
        <Card sx={{
          mt: 2, p: 3, backgroundColor: '#F1F3F8', borderRadius: 5,
        }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ px: 1 }}
          >
            <Grid item xs={12} sm={12} md={8}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h5">
                  Reporte de las estadísticas de curso
                </Typography>
                <Typography>
                  Genera un informe para ver el progreso de este curso, por cierta actividad o por área STEAM.
                  También pordrás acceder a las estadísticas por cierta actividad o alumno de este curso.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                <Button
                  startIcon={<PieChartIcon />}
                  sx={{
                    alignSelf: 'center',
                    width: 200,
                    textTransfrom: 'none',
                    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#ffbe82',
                      color: '#FFFFFF',
                    },
                  }}
                  onClick={() => navigate(`/cursos/${cursoId}/estadisticas`)}
                >
                  Generar reporte
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Stack>
  );
};
export default ParticipantesView;

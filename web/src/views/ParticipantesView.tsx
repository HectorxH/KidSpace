/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
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
          startIcon={<QrCodeIcon />}
          sx={{
            marginRight: 2,
            backgroundColor: (theme: Theme) => theme.palette.secondary.main,
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
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Participantes
        </Typography>
        <CursoTable rows={curso.estudiantes} updateEstudiantes={getCurso} />
        <Card sx={{
          mt: 2, p: 3, backgroundColor: '#F1F3F8', borderRadius: 5,
        }}
        >
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Stack direction="column" spacing={2} sx={{ width: 5 / 7 }}>
              <Typography variant="h5">
                Reporte de las estadísticas de curso
              </Typography>
              <Typography>
                Genera un informe para ver el progreso de este curso, por cierta actividad o por área STEAM.
                También pordrás acceder a las estadísticas por cierta actividad o alumno de este curso.
              </Typography>
            </Stack>
            <Stack sx={{
              justifyContent: 'center', minWidth: 180, width: 2 / 7,
            }}
            >
              <Button
                startIcon={<PieChartIcon />}
                sx={{
                  alignSelf: 'center',
                  minWidth: 150,
                  maxHeight: 40,
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
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
};
export default ParticipantesView;

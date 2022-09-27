/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia, Stack, Theme, Typography, CardContent, Divider, CardHeader,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import NotFoundView from './NotFoundView';
import '../App.css';
import PupilosTable from '../components/PupilosTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

import actividades from '../mock/actividades';
import actividadesIndividuales from '../mock/actividadesIndividuales';
import HistorialTable from '../components/HistorialTable';

const img = require('../assets/statistics.png');
const imgStudent = require('../assets/webApoderados/student.png');

const info = [{
  titulo: 'NombreActividad',
  tipo: 'Docente',
  fecha: '2022/09/26',
}];
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ['Ciencia (S)', 'Tecnología (T)', 'Ingeniería (E)', 'Arte (A)', 'Matemáticas (M)'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 3], // Utils.numbers(NUMBER_CFG),
      backgroundColor: ['#5C9DEC', '#B878EA', '#FF8A00', '#F2C144', '#A1C96A'],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
};

const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];
const EstadisticasApoderadoView = () => {
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
      <Box sx={{ backgroundColor: '#F2C144', px: 4, py: 2 }}>
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas por pupilo</b>
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          px: 5, justifyContent: 'center', alingContent: 'center', height: '400px',
        }}
      >
        <Card sx={{
          padding: 3, width: 2 / 6, borderRadius: 5, alignItems: 'center',
        }}
        >
          <CardMedia
            component="img"
            sx={{
              heigth: 150, width: 150, borderRadius: 100, marginTop: 3,
            }}
            image={imgStudent}
          />
          <Typography>
            nombre apellido apellido {/* {nombre} {apellido} */}
          </Typography>
          <Typography>
            Curso: why feria
          </Typography>
        </Card>
        <Card sx={{ padding: 1, width: 4 / 6, borderRadius: 5 }}>
          <Doughnut data={data} options={options} />
        </Card>
      </Stack>
      <Stack spacing={2} sx={{ px: 5 }}>
        <Card sx={{
          padding: 4, width: 1, borderRadius: 5,
        }}
        >
          <Line
            height="100px"
            options={{ maintainAspectRatio: false }}
            data={data}
          />
        </Card>
      </Stack>
      <Stack spacing={3} sx={{ px: 5, py: 1 }}>
        <Typography variant="h4">
          Actividades en la sala de clases (docentes)
        </Typography>
        <Typography>
          STEAM es un enfoque educativo, que incluye ciencia, tecnología, ingeniería y matemáticas.
          Cada actividad se enfoca en uno o más áreas STEAM.
        </Typography>
        <Stack direction="column" spacing={2}>
          {(actividades.map((row) => (
            <Card key={row.id} sx={{ borderRadius: 5 }}>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={2} sx={{ width: 3 / 5 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      heigth: 100, width: 100, borderRadius: 100, margin: 3,
                    }}
                    image={row.img}
                  />
                  <Stack direction="column" sx={{ justifyContent: 'center', alignContent: 'center' }}>
                    <Typography>{row.title}</Typography>
                    <Typography sx={{ color: row.estado === 'Completada' ? '#A1C96A' : '#EA6A6A' }}>{row.estado}</Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    width: 2 / 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'right',
                  }}
                >
                  {(letras.map((letra, id) => (
                    <Typography sx={{
                      color: row.steam[id] !== 0 ? colores[id] : '#B5B5B5', alignSelf: 'Right', fontSize: 50, margin: 0.5,
                    }}
                    ><b>{letra}</b>
                    </Typography>
                  )))}
                </Stack>
              </Stack>
            </Card>
          ))
          )}
        </Stack>
        <Typography variant="h4">
          Actividades Individuales
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {(actividadesIndividuales.map((act, id) => (
            <Card key={act.id} sx={{ borderRadius: 5, width: '18vw', margin: 2 }}>
              <CardMedia
                component="img"
                image={act.img}
              />
              <CardHeader
                title={act.title}
                sx={{ fontSize: 1 }}
              />
              <CardContent>
                <Typography sx={{ color: act.estado === 'Completada' ? '#A1C96A' : '#EA6A6A' }}>{act.estado}</Typography>
                <Typography>
                  Repeticiones: {act.repeticiones}
                </Typography>
                <Divider style={{ width: '100%', alignSelf: 'center', marginTop: 15 }} />
                <Stack
                  direction="row"
                  sx={{
                    width: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                  }}
                >
                  {(letras.map((letra, i) => (
                    <Typography
                      sx={{
                        color: act.steam[i] !== 0 ? colores[i] : '#B5B5B5', fontSize: 50, margin: 0.5,
                      }}
                    ><b>{letra}</b>
                    </Typography>
                  )))}
                </Stack>
              </CardContent>
            </Card>
          )))}
        </Box>
        <Typography variant="h4">
          Historial de actividades
        </Typography>
        <HistorialTable rows={info} />
      </Stack>
    </Stack>
  );
};
export default EstadisticasApoderadoView;

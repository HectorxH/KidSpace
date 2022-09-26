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
// import { Doughnut } from 'chart.js';
import NotFoundView from './NotFoundView';
import '../App.css';
import PupilosTable from '../components/PupilosTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

import actividades from '../mock/actividades';
import actividadesIndividuales from '../mock/actividadesIndividuales';

const img = require('../assets/statistics.png');

const data = {
  labels: ['Ciencia (S)', 'Tecnología (T)', 'Ingeniería (E)', 'Arte (A)', 'Matemáticas (M)'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [300, 50, 100, 5, 250], // Utils.numbers(NUMBER_CFG),
      backgroundColor: ['#5C9DEC', '#B878EA', '#FF8A00', '#F2C144', '#A1C96A'],
    },
  ],
};
const letras = ['S', 'T', 'E', 'A', 'M'];
const options = {
  legend: {
    display: true,
    position: 'center',
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

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
      <Stack direction="row" spacing={3} sx={{ px: 5 }}>
        <Stack spacing={2} sx={{ justifyContent: 'center', alingContent: 'center' }}>
          <Card sx={{
            padding: 4, width: 1, borderRadius: 5, alignItems: 'center',
          }}
          >
            <CardMedia
              component="img"
              sx={{
                heigth: 100, width: 100, borderRadius: 100, margin: 3,
              }}
              image={img}
            />
            <Typography>
              nombre
              {/* {nombre} {apellido} */}
            </Typography>
            <Typography>
              <br />curso
            </Typography>
          </Card>
        </Stack>
        <Card sx={{ padding: 4, width: 1, borderRadius: 5 }}>
          {/* <Doughnut data={data} options={options} /> */}
        </Card>
      </Stack>
      <Stack spacing={3} sx={{ px: 5 }}>
        <Card sx={{ padding: 4, width: 1, borderRadius: 5 }}>
          <CardMedia
            component="img"
            sx={{ heigth: 100, width: 100 }}
            image={img}
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
                      color: row.steam[id] !== 0 ? row.steam[id] : '#B5B5B5', alignSelf: 'Right', fontSize: 50, margin: 0.5,
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
            margin: 5,
            p: 1,
            m: 1,
          }}
        >
          {(actividadesIndividuales.map((act, id) => (
            <Card key={act.id} sx={{ borderRadius: 5, width: 350, margin: 2 }}>
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
                        color: act.steam[i] !== 0 ? act.steam[i] : '#B5B5B5', fontSize: 50, margin: 0.5,
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
      </Stack>
    </Stack>
  );
};
export default EstadisticasApoderadoView;

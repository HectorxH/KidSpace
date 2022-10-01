/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia, Stack, Theme, Typography, CardContent, Divider, CardHeader, Grid,
} from '@mui/material';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import '../App.css';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import actividades from '../mock/actividades';
import actividadesIndividuales from '../mock/actividadesIndividuales';
import HistorialTable from '../components/HistorialTable';
import NotFoundView from './NotFoundView';
import { IEstudiante } from '../types/estudiantes';
import CargaView from './LoadingView';
import { useAuth } from '../hooks/useAuth';
import { IActividadLogs } from '../types/actividadLog';

// const img = require('../assets/statistics.png');
const imgStudent = require('../assets/webApoderados/student.png');

const makeDataDona = (data: number[]) => {
  if (_.reduce(data, (a, b) => a + b, 0) > 0) {
    return {
      labels: ['Ciencia (S)', 'Tecnología (T)', 'Ingeniería (E)', 'Arte (A)', 'Matemáticas (M)'],
      datasets: [
        {
          label: 'Dataset 1',
          data,
          backgroundColor: ['#5C9DEC', '#B878EA', '#FF8A00', '#F2C144', '#A1C96A'],
        },
      ],
    };
  }
  return {
    labels: ['No hay actividades completadas'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1],
        backgroundColor: ['#bbb'],
      },
    ],
  };
};

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

type SteamArray = number[];
type Actividades = {[key:string]: number}

const EstadisticasApoderadoView = () => {
  const [pupilo, setPupilo] = useState<IEstudiante>();
  const [steamStats, setSteamStats] = useState<SteamArray>();
  const [timeline, setTimeline] = useState<SteamArray>();
  const [actividadesI, setActividadesI] = useState<Actividades>();
  const [actividadesC, setActividadesC] = useState<Actividades>();
  const [historial, setHistorial] = useState<IActividadLogs>();
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  const params = useParams();
  if (typeof params.pupiloId === 'undefined') return <NotFoundView />;
  const { pupiloId } = params;

  const getData = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/estudiante/${pupiloId}/actividades`);
      setActividadesI(res.data.actividadesIndividuales);
      setActividadesC(res.data.actividadesClase);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/estudiante/${pupiloId}/timeline`);
      setTimeline(res.data.timeline);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/estudiante/${pupiloId}/steam`);
      setSteamStats(res.data.steam);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/estudiante/${pupiloId}/historial`);
      setHistorial(res.data.historial);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estudiante/${pupiloId}`);
      setPupilo(res.data.estudiante);
      console.log(actividadesI);
      console.log(actividadesC);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!pupilo) getData();
  }, []);

  if (loading) return <CargaView />;
  if (!pupilo || !steamStats || !timeline
    || !actividadesI || !actividadesC || !historial) { return <NotFoundView />; }
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: '#F2C144', px: 4, py: 2 }}>
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas por pupilo</b>
        </Typography>
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          height: { sx: '100%', md: '50vh' }, width: '100%', px: 5, justifyContent: 'space-between',
        }}
      >
        <Grid item sx={{ height: '100%', width: 2 / 6 }}>
          <Card sx={{
            borderRadius: 5, px: 3, pt: 3, alignItems: 'center', height: '100%',
          }}
          >
            <CardMedia
              component="img"
              sx={{
                width: '60%', borderRadius: 100, maxWidth: '20vh',
              }}
              image={imgStudent}
            />
            <CardContent sx={{
              alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%',
            }}
            >
              <Typography>
                {pupilo.user.nombres} {pupilo.user.apellidos}
              </Typography>
              <Typography>
                Curso: {pupilo.curso.nombre}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={{ height: '100%', width: 4 / 6 }}>
          <Card sx={{ borderRadius: 5, p: 3, height: '100%' }}>
            <Doughnut data={makeDataDona(steamStats)} options={options} />
          </Card>
        </Grid>
      </Stack>
      <Box sx={{ px: 5 }}>
        <Card sx={{
          padding: 4, width: 1, borderRadius: 5, px: 5,
        }}
        >
          <Line
            height="100px"
            options={{ maintainAspectRatio: false }}
            data={makeDataDona(steamStats)}
          />
        </Card>
      </Box>
      <Stack spacing={3} sx={{ px: 5, py: 1 }}>
        <Typography variant="h4">
          Actividades en la sala de clases (docentes)
        </Typography>
        <Typography>
          STEAM es un enfoque educativo, que incluye ciencia, tecnología, ingeniería y matemáticas.
          Cada actividad se enfoca en uno o más áreas STEAM.
        </Typography>
        <Stack direction="column" spacing={2}>
          {(actividades.map((row) => {
            const completada = actividadesI[row.title] > 0;
            return (
              <Card key={row.id} sx={{ borderRadius: 5, p: 3 }}>
                <Stack direction="row" spacing={2} sx={{ alignContent: 'center', width: '100%' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 100, width: 100, borderRadius: 100,
                    }}
                    image={row.img}
                  />
                  <CardContent sx={{
                    display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignSelf: 'center',
                  }}
                  >
                    <Typography>{row.title}</Typography>
                    <Typography sx={{ color: completada ? '#A1C96A' : '#EA6A6A' }}>{completada ? 'Completada' : 'Sin completar'}</Typography>
                  </CardContent>
                  <Stack
                    direction="row"
                    style={{ marginLeft: 'auto' }}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    {(letras.map((letra, id) => (
                      <Typography
                        key={`${pupilo._id}-${letra}`}
                        sx={{
                          color: row.steam[id] !== 0 ? colores[id] : '#B5B5B5', fontSize: 50, margin: 0.5,
                        }}
                      ><b>{letra}</b>
                      </Typography>
                    )))}
                  </Stack>
                </Stack>
              </Card>
            );
          })
          )}
        </Stack>
        <Typography variant="h4">
          Actividades Individuales
        </Typography>
        <Grid container>
          {(actividadesIndividuales.map((act) => {
            const completada = actividadesC[act.title] > 0;
            return (
              <Grid key={`${pupilo._id}-${act.id}`} item xs={4} p={1}>
                <Card key={act.id} sx={{ borderRadius: 5, height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={act.img}
                  />
                  <CardHeader
                    title={act.title}
                    sx={{ fontSize: 1 }}
                  />
                  <CardContent>
                    <Typography sx={{ color: completada ? '#A1C96A' : '#EA6A6A' }}>{completada ? 'Completada' : 'Sin completar'}</Typography>
                    <Typography>
                      Repeticiones: {actividadesC[act.title]}
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
                          key={`${pupilo._id}-${letra}`}
                          sx={{
                            color: act.steam[i] !== 0 ? colores[i] : '#B5B5B5', fontSize: 50, margin: 0.5,
                          }}
                        ><b>{letra}</b>
                        </Typography>
                      )))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          }))}
        </Grid>
        <Typography variant="h4">
          Historial de actividades
        </Typography>
        <HistorialTable rows={historial} />
      </Stack>
    </Stack>
  );
};
export default EstadisticasApoderadoView;

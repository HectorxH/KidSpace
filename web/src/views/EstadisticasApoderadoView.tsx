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
  TimeScale,
  TimeSeriesScale,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import '../App.css';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import actividades from '../mock/actividades';
import actividadesIndividuales from '../mock/actividadesIndividuales';
import HistorialTable from '../components/HistorialTable';
import NotFoundView from './NotFoundView';
import { IEstudiante } from '../types/estudiantes';
import CargaView from './LoadingView';
import { useAuth } from '../hooks/useAuth';
import { IActividadLogs } from '../types/actividadLog';
import 'chartjs-adapter-moment';

const imgStudent = require('../assets/webApoderados/student.png');

type SteamArray = number[];
type Actividades = {[key:string]: number}
type PointArray = {x: number, y: number}[]

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

const makeDataScatter = (data: PointArray) => {
  if (data.length > 0) {
    return {
      datasets: [
        {
          label: 'Actividades completadas',
          data,
          backgroundColor: '#f070f0',
          borderColor: '#d03080',
          fill: '#f070f0',
        },
      ],
    };
  }
  return {
    datasets: [
      {
        label: 'No hay actividades completadas',
        data: [{ x: 0, y: 1 }],
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
  TimeScale,
  TimeSeriesScale,
);

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Tiempo promedio empleado por actividad',
    },
  },
};

const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];

const EstadisticasApoderadoView = () => {
  const [pupilo, setPupilo] = useState<IEstudiante>();
  const [steamStats, setSteamStats] = useState<SteamArray>();
  const [timeline, setTimeline] = useState<PointArray>();
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
      const timeDays = _.map(res.data.timeline, (o) => ({ x: moment(new Date(o.x)).format('MM/DD/YYYY'), y: o.y }));
      const reducedTimeline = Object.values(timeDays.reduce((r, o) => {
        // eslint-disable-next-line no-param-reassign
        r[o.x] = r[o.x] || { x: o.x, y: 0 };
        // eslint-disable-next-line no-param-reassign
        r[o.x].y += o.y;
        return r;
      }, {} as {[key: string]: any}));
      setTimeline(reducedTimeline);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/estudiante/${pupiloId}/steam`);
      setSteamStats(res.data.steam);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/estudiante/${pupiloId}/historial`);
      setHistorial(res.data.historial);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estudiante/${pupiloId}`);
      setPupilo(res.data.estudiante);
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
    <Stack>
      <Box sx={{
        backgroundColor: '#F2C144', px: 4, py: 2, pb: 2,
      }}
      >
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas por pupilo</b>
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ minHeight: 300, px: 5, marginTop: 3 }}
      >
        <Grid item xs={12} sm={12} md={5}>
          <Card sx={{
            borderRadius: 5, px: 3, pt: 3, alignItems: 'center', height: '100%',
          }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: 100, maxWidth: '20vh',
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
        <Grid item xs={12} sm={12} md={7}>
          <Card sx={{ borderRadius: 5, p: 3, height: '100%' }}>
            <Doughnut data={makeDataDona(steamStats)} options={options} />
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ px: 5, marginTop: 3, marginBottom: 3 }}>
        <Card sx={{
          padding: 4, width: 1, borderRadius: 5, px: 5,
        }}
        >
          <Line
            height="100px"
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day',
                    round: 'day',
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Resumen de actividades completadas',
                },
              },
            }}
            data={makeDataScatter(timeline)}
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
      </Stack>
      <Stack direction="column" spacing={2} sx={{ px: 5 }}>
        {(actividades.map((row) => {
          const completada = actividadesC[row.name] > 0;
          return (
            <Card key={row.id} sx={{ borderRadius: 5, p: 3 }}>
              <Grid
                container
                spacing={0}
                justifyContent="center"
              >
                <Grid item xs={12} sm={8} md={6}>
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
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    {(letras.map((letra, id) => (
                      <Typography
                        key={`${pupilo._id}-${letra}`}
                        sx={{
                          color: row.steam[id] !== 0 ? colores[id] : '#B5B5B5', fontSize: 50,
                        }}
                      ><b>{letra}</b>
                      </Typography>
                    )))}
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          );
        })
          )}
        <Typography variant="h4">
          Actividades Individuales
        </Typography>
      </Stack>
      <Stack sx={{ marginTop: 5, marginBottom: 5 }}>
        <Grid container spacing={1} sx={{ px: 5 }}>
          {(actividadesIndividuales.map((act) => {
            const completada = actividadesI[act.title] > 0;
            return (
              <Grid key={`${pupilo._id}-${act.id}`} item xs={12} sm={9} md={4}>
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
                      Repeticiones: {actividadesI[act.title]}
                    </Typography>
                    <Divider style={{ width: '100%', alignSelf: 'center', marginTop: 15 }} />
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        width: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
                      }}
                    >
                      {(letras.map((letra, i) => (
                        <Typography
                          key={`${pupilo._id}-${letra}`}
                          sx={{
                            color: act.steam[i] !== 0 ? colores[i] : '#B5B5B5', fontSize: 50,
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
      </Stack>
      <Stack sx={{
        px: 5, maxWidth: 1000, marginTop: 5, marginBottom: 5,
      }}
      >
        <Typography variant="h4">
          Historial de actividades
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <HistorialTable rows={historial} />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default EstadisticasApoderadoView;

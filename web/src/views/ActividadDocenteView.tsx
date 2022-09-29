/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
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
  BarElement,
  LineElement,
  Title,
} from 'chart.js';
import {
  Doughnut, Line, Bar, Pie,
} from 'react-chartjs-2';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import NotFoundView from './NotFoundView';
import '../App.css';
// import PupilosTable from '../components/PupilosTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';
import ResultadosQuizTable from '../components/ResultadosQuizTable';
// import actividades from '../mock/actividades';
// import actividadesIndividuales from '../mock/actividadesIndividuales';
// import HistorialTable from '../components/HistorialTable';
const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];
const infoResultadosQuizTable = [
  {
    _id: 0,
    nombre: 'Skylar',
    estado: 'Completada',
    pregunta1: 'imagénes',
    pregunta2: 'una lista',
  },
  {
    _id: 1,
    nombre: 'Cirrus',
    estado: 'Sin Completar',
    pregunta1: '-',
    pregunta2: '-',
  },
  {
    _id: 2,
    nombre: 'Kai',
    estado: 'Completada',
    pregunta1: 'celdas',
    pregunta2: 'una lista',
  },
  {
    _id: 3,
    nombre: 'Soo',
    estado: 'Completada',
    pregunta1: 'gráfico',
    pregunta2: 'una tabla',
  },
];

const img = require('../assets/quiz.png');

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const preguntas = [
  {
    id: 0,
    tipo: 'Selección simple',
    enunciado: 'El software Excel permite crear tablas y ______',
    alternativas: ['imágenes', 'gráficos', 'celdas'],
    respuestaCorrecta: 'gráficos',
    data: [10, 5, 2],
  },
  {
    id: 1,
    tipo: 'Selección simple',
    enunciado: 'Para elaborar un gráfico, debemos usar valores guardados en ______',
    alternativas: ['una lista', 'una celda', 'una tabla'],
    respuestaCorrecta: 'una tabla',
    data: [9, 6, 2],
  },
];

const dataGrafico = (d:number[]) => {
  console.log(d);
  const datosDona = {
    labels: ['Respuesta Correcta', 'Respuesta Incorrecta', 'Sin responder'],
    datasets: [
      {
        label: 'Pregunta',
        data: d,
        backgroundColor: ['#A1C96A', '#EA6A6A', 'gray'],
      },
    ],
  };

  return datosDona;
};

// const dataGrafico = (d:number[]) => {
//   console.log(d);
//   const datosDona = {
//     labels: ['Respuesta Correcta', 'Respuesta Incorrecta', 'Sin responder'],
//     datasets: [
//       {
//         label: 'Pregunta',
//         data: d,
//         backgroundColor: ['#A1C96A', '#EA6A6A', 'gray'],
//       },
//     ],
//   };

//   return datosDona;
// };

const ActividadDocenteView = () => {
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
          <b>Estadísticas por actividad docente</b>
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          px: 5, justifyContent: 'center', alingContent: 'center',
        }}
      >
        <Card sx={{
          width: 3 / 6, borderRadius: 5, alignItems: 'center', height: '50vh',
        }}
        >
          <CardMedia
            component="img"
            sx={{ height: '30vh' }}
            image={img}
          />
          <Typography>
            Nombre:
          </Typography>
          <Typography>
            Estado:
          </Typography>
          <Divider style={{ width: '90%', alignSelf: 'center' }} />
          <Stack
            direction="row"
            sx={{
              width: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
            }}
          >
            {(letras.map((letra, i) => (
              <Typography
                sx={{
                  color: '#B5B5B5', fontSize: 30, margin: 0.5,
                }}
              ><b>{letra}</b>
              </Typography>
            )))}
          </Stack>
        </Card>
        <Card sx={{
          padding: 1, width: 3 / 6, borderRadius: 5, height: '50vh',
        }}
        >
          <Doughnut data={data} options={options} />
        </Card>
      </Stack>
      <Stack spacing={2} sx={{ px: 5 }}>
        <Card sx={{
          padding: 4, width: 1, borderRadius: 5,
        }}
        >
          <Bar
            data={data}
          />
        </Card>
        <Typography variant="h5">
          Preguntas del Quiz
        </Typography>
        {(preguntas.map((pregunta, id) => (
          <Stack direction="row" spacing={2}>
            <Card sx={{
              width: 1.2 / 2, borderRadius: 5, backgroundColor: '#F1F3F8',
            }}
            >
              <Stack sx={{ m: 3 }}>
                <Typography variant="h6">
                  <b>Pregunta {id + 1}</b>
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  <b>Tipo: {pregunta.tipo}</b>
                </Typography>
                <Typography>
                  {pregunta.enunciado}
                  {(pregunta.alternativas.map((alt) => (
                    <li>{alt}</li>
                  )))}
                </Typography>
              </Stack>
            </Card>
            <Card sx={{ width: 0.8 / 2, borderRadius: 5 }}>
              <Pie data={dataGrafico(pregunta.data)} options={options} />
            </Card>
          </Stack>
        )))}
        <Typography variant="h5">
          Resultados del Quiz
        </Typography>
        <ResultadosQuizTable rows={infoResultadosQuizTable} />
      </Stack>
      {/*
      <Stack spacing={3} sx={{ px: 5, py: 1 }}>

        <Stack direction="column" spacing={2}>
          {(actividades.map((row) => (
            <Card key={row.id} sx={{ borderRadius: 5 }}>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={2} sx={{ width: 3 / 5 }}>
                  <CardMedia
                    component="
                    img"
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
      </Stack> */}
    </Stack>
  );
};
export default ActividadDocenteView;

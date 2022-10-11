import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia, Stack, Theme, Typography, Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
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
  Doughnut, Bar, Pie,
} from 'react-chartjs-2';
import _ from 'lodash';
import { useAuth } from '../hooks/useAuth';
import ResultadosQuizTable from '../components/ResultadosQuizTable';
import actividadesDocentes from '../mock/actividadesDocentes';
import NotFoundView from './NotFoundView';
import CargaView from './LoadingView';

const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];
const infoResultadosQuizTable = [
  {
    _id: 0,
    nombre: 'Skylar',
    estado: 'Completada',
    pregunta1: 'imágenes',
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
    pregunta1: 'gráficos',
    pregunta2: 'una tabla',
  },
];

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

const dataGrafico = (d:number[]) => {
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

const RespuestasCorrectas: {[key: string]: string[]} = {
  Diagramas: ['gráficos', 'una tabla'],
  Diseños: ['función', 'textura'],
  Materiales: ['centro', 'lote'],
};

const ActividadDocenteView = () => {
  const [loading, setLoading] = useState(true);

  const { actividad } = useParams();
  if (!actividad) return <NotFoundView />;
  const respuestasCorrectas = RespuestasCorrectas[actividad];
  const actividadData = _.find(actividadesDocentes, { actividad });

  const { logout } = useAuth();

  const loadData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/63310b2d77aa3a312eb9fcb5`);
      console.log(res);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return (<CargaView />);
  if (!actividadData) return <NotFoundView />;
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
            image={actividadData.img}
          />
          <Typography>
            Nombre: {actividadData.actividad}
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
            <Stack
              direction="row"
              sx={{
                width: 2 / 5, justifyContent: 'center', alignItems: 'center', alignSelf: 'right',
              }}
            >
              {(letras.map((letra, id) => (
                <Typography sx={{
                  color: actividadData.steam[id] !== 0 ? colores[id] : '#B5B5B5', alignSelf: 'Right', fontSize: 40, margin: 0.5,
                }}
                ><b>{letra}</b>
                </Typography>
              )))}
            </Stack>
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
        {(actividadData.preguntas.map((pregunta, id) => (
          <Stack direction="row" spacing={2}>
            <Card sx={{
              width: 1.2 / 2, borderRadius: 5, backgroundColor: '#F1F3F8',
            }}
            >
              <Stack sx={{ m: 3 }}>
                <Typography variant="h6">
                  <b>Pregunta {id + 1}</b>
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
        <ResultadosQuizTable rows={infoResultadosQuizTable} correctas={respuestasCorrectas} />
      </Stack>
    </Stack>
  );
};
export default ActividadDocenteView;

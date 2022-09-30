/* eslint-disable max-len */
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
  BarElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import NotFoundView from './NotFoundView';
import '../App.css';
import ActividadDocenteTable from '../components/ActividadDocenteTable';
import ActividadIndividualTable from '../components/ActividadIndividualTable';
import RankingTable from '../components/RankingTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

const infoActividadDocenteTable = [
  {
    _id: 0,
    actividad: 'Diagramas',
    estado: 'Completada',
    porcentaje: 70,
  },
  {
    _id: 1,
    actividad: 'Soluciones tecnologicas',
    estado: 'Sin completar',
    porcentaje: 30,
  },
];

const infoActividadIndividualTable = [
  {
    _id: 0,
    actividad: 'Informática y algrotimos en nuestra vida ',
    porcentaje: 70,
  },
  {
    _id: 1,
    actividad: '¿Qué es un computador?',
    porcentaje: 30,
  },
];

const infoRankingTable = [
  {
    id: 0,
    lugar: 1,
    nombre: 'Skylar',
    actividades: 70,
  },
  {
    id: 1,
    lugar: 2,
    nombre: 'Cirrus',
    actividades: 30,
  },
  {
    id: 2,
    lugar: 4,
    nombre: 'Kai',
    actividades: 10,
  },
  {
    id: 3,
    lugar: 3,
    nombre: 'Soo',
    actividades: 20,
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

const img = require('../assets/quiz.png');

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

const EstadisticasProfesorView = () => {
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
      <Box sx={{ backgroundColor: '#B878EA', px: 4, py: 2 }}>
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas por actividad docente</b>
        </Typography>
      </Box>
      <Stack spacing={3} sx={{ px: 5, py: 1 }}>
        <Typography variant="h5">
          Actividades en la sala de clases (docentes)
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          sx={{
            justifyContent: 'center', alingContent: 'center',
          }}
        >
          <Card sx={{
            p: 3, width: 3.5 / 6, borderRadius: 5, alignItems: 'center',
          }}
          >
            <Bar
              data={data}
            />
          </Card>
          <Card sx={{ p: 1, width: 2.5 / 6, borderRadius: 5 }}>
            <Doughnut data={data} options={options} />
          </Card>
        </Stack>
        <ActividadDocenteTable rows={infoActividadDocenteTable} />
        <Typography variant="h5">
          Actividades Individuales
        </Typography>
        <ActividadIndividualTable rows={infoActividadIndividualTable} />
        <Typography variant="h5">
          Ranking de Estudiantes
        </Typography>
        <RankingTable rows={infoRankingTable} />
      </Stack>
    </Stack>
  );
};
export default EstadisticasProfesorView;

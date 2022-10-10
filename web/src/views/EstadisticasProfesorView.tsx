/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Stack, Theme, Typography,
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
import { Doughnut, Bar } from 'react-chartjs-2';
import _ from 'lodash';
import NotFoundView from './NotFoundView';
import '../App.css';
import ActividadDocenteTable from '../components/ActividadDocenteTable';
import ActividadIndividualTable from '../components/ActividadIndividualTable';
import RankingTable from '../components/RankingTable';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';
import CargaView from './LoadingView';

interface ITiempoData {
  [key: string]: number
}

interface ICountCorrectas {
  [key: string]: {'Correctas': number, 'Incorrectas': number}
}

interface IActividadesCurso {
  [key: string]: number
}

// const infoActividadIndividualTable = [
//   'Informática y algrotimos en nuestra vida ',
//   '¿Qué es un computador?',
//   'Tierra, Luna y Sol',
//   '¿Qué vemos en el cielo nocturno?',
//   'Interpretando etiquetas de los alimentos',
//   'Analizando nuestro dieta',
//   'Teoría de colores',
//   'Diseño gráfico en nuestro alrededor',
// ];

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
  {
    _id: 2,
    actividad: 'Tierra, Luna y Sol',
    porcentaje: 30,
  },
  {
    _id: 3,
    actividad: '¿Qué vemos en el cielo nocturno?',
    porcentaje: 30,
  },
  {
    _id: 4,
    actividad: 'Interpretando etiquetas de los alimentos',
    porcentaje: 30,
  },
  {
    _id: 5,
    actividad: 'Analizando nuestro dieta',
    porcentaje: 30,
  },
  {
    _id: 6,
    actividad: 'Teoría de colores',
    porcentaje: 30,
  },
  {
    _id: 7,
    actividad: 'Diseño gráfico en nuestro alrededor',
    porcentaje: 30,
  },
];

const infoRankingTable = [
  {
    _id: '0',
    lugar: 0,
    nombre: 'Skylar',
    actividades: 70,
  },
  {
    _id: '1',
    lugar: 0,
    nombre: 'Cirrus',
    actividades: 30,
  },
  {
    _id: '2',
    lugar: 0,
    nombre: 'Kai',
    actividades: 10,
  },
  {
    _id: '3',
    lugar: 0,
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
};

// eslint-disable-next-line no-shadow
const makeTiempoData = (data: ITiempoData) => {
  const x = Object.keys(data);
  const y = Object.values(data);
  if (x.length > 0) {
    return {
      labels: x,
      datasets: [
        {
          label: 'Tiempo promedio de actividad (seg)',
          data: y,
          backgroundColor: '#B878EA',
          // borderColor: '#d03080',
          // fill: '#f070f0',
        },
      ],
    };
  }
  return {
    labels: ['-'],
    datasets: [
      {
        label: 'No hay actividades completadas',
        data: [1],
        backgroundColor: ['#bbb'],
      },
    ],
  };
};

// eslint-disable-next-line no-shadow
const makeCorrectasData = (data: ICountCorrectas) => {
  const counts = _.reduce(Object.values(data), (a, b) => ({
    Correctas: a.Correctas + (b.Correctas || 0),
    Incorrectas: a.Incorrectas + (b.Incorrectas || 0),
  }), { Correctas: 0, Incorrectas: 0 });
  if (counts.Correctas + counts.Incorrectas > 0) {
    return {
      labels: ['Correctas', 'Incorrectas'],
      datasets: [
        {
          label: 'Tiempo promedio de actividad (seg)',
          data: [counts.Correctas, counts.Incorrectas],
          backgroundColor: ['#A1C96A', '#EA6A6A'],
        },
      ],
    };
  }
  return {
    labels: ['-'],
    datasets: [
      {
        label: 'No hay actividades completadas',
        data: [1],
        backgroundColor: ['#bbb'],
      },
    ],
  };
};

const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];

const EstadisticasProfesorView = () => {
  const { cursoId } = useParams();
  const [curso, setCurso] = useState<ICurso>();
  const [tiempoData, setTiempoData] = useState<ITiempoData>();
  const [countCorrectas, setCountCorrectas] = useState<ICountCorrectas>();
  const [actividadesCurso, setActividadesCurso] = useState<IActividadesCurso>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { logout } = useAuth();
  const getData = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`); // ${cursoId}`);
      setCurso(res.data.curso);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/tiempo`);
      setTiempoData(res.data.tiempo);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/countCorrectasQuiz`);
      setCountCorrectas(res.data.countCorrectas);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/%delcurso`);
      setActividadesCurso(res.data.actividadesCurso);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return (<CargaView />);
  if (!curso || !tiempoData || !countCorrectas || !actividadesCurso) return (<NotFoundView />);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: '#B878EA', px: 4, py: 2 }}>
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas del curso: </b>
          {curso.nombre}
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
            justifyContent: 'center',
            alingContent: 'center',
          }}
        >
          <Card sx={{
            p: 3, width: 3.5 / 6, borderRadius: 5, alignItems: 'center',
          }}
          >
            <Bar
              data={makeTiempoData(tiempoData)}
            />
          </Card>
          <Card sx={{
            p: 1, width: 2.5 / 6, borderRadius: 5,
          }}
          >
            <Doughnut data={makeCorrectasData(countCorrectas)} options={options} />
          </Card>
        </Stack>
        <ActividadDocenteTable rowsData={actividadesCurso} cursoId={curso._id} />
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

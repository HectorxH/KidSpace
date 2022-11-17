import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Stack, Theme, Typography, Grid,
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
import { IEstudiante } from '../types/estudiantes';

interface ITiempoData {
  [key: string]: number
}

interface ICountCorrectas {
  [key: string]: {'Correctas': number, 'Incorrectas': number}
}

interface IActividades {
  [key: string]: number
}

interface IRank {
  estudiante: IEstudiante,
  cantidad: number
}

interface IInstitucion {
  institucion: boolean
}

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

const quicesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Resultados de quices',
    },
  },
};

const makeTiempoData = (data: ITiempoData) => {
  const x = Object.keys(data);
  const y = Object.values(data);
  if (x.length > 0) {
    return {
      labels: x,
      datasets: [
        {
          label: 'segundos',
          data: y,
          backgroundColor: '#FF8A00',
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
          data: [counts.Correctas, counts.Incorrectas],
          backgroundColor: ['#A1C96A', '#EA6A6A'],
        },
      ],
    };
  }
  return {
    labels: ['No hay actividades completadas'],
    datasets: [
      {
        label: 'No hay actividades completadas',
        data: [1],
        backgroundColor: ['#bbb'],
      },
    ],
  };
};

const EstadisticasProfesorView = (institucion: IInstitucion) => {
  const { cursoId, startDate, endDate } = useParams();
  if (!cursoId) return <NotFoundView />;
  const [curso, setCurso] = useState<ICurso>();
  const [tiempoData, setTiempoData] = useState<ITiempoData>();
  const [countCorrectas, setCountCorrectas] = useState<ICountCorrectas>();
  const [actividadesCurso, setActividadesCurso] = useState<IActividades>();
  const [actividadesIndividual, setActividadesIndividual] = useState<IActividades>();
  const [rank, setRank] = useState<IRank[]>();
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();
  const getData = async () => {
    let res;
    try {
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
      setCurso(res.data.curso);
      if (institucion && startDate && endDate) {
        const dateRange = [startDate, endDate];
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/tiempo`, { dateRange });
        setTiempoData(res.data.tiempo);
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/countCorrectasQuiz`, { dateRange });
        setCountCorrectas(res.data.countCorrectas);
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/%curso`, { dateRange });
        setActividadesCurso(res.data.actividadesCurso);
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/%individual`, { dateRange });
        setActividadesIndividual(res.data.actividadesIndividual);
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/rank`, { dateRange });
        setRank(res.data.rank);
      } else {
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/tiempo`);
        setTiempoData(res.data.tiempo);
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/countCorrectasQuiz`);
        setCountCorrectas(res.data.countCorrectas);
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/%curso`);
        setActividadesCurso(res.data.actividadesCurso);
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/%individual`);
        setActividadesIndividual(res.data.actividadesIndividual);
        res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/rank`);
        setRank(res.data.rank);
      }
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

  const tiempoOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Tiempo promedio empleado por actividad',
      },
    },
  };

  if (loading) return (<CargaView />);
  if (!curso || !tiempoData || !countCorrectas
    || !actividadesCurso || !actividadesIndividual || !rank) return (<NotFoundView />);
  return (
    <Stack>
      <Box sx={{
        backgroundColor: '#B878EA', pb: 4, px: 4, py: 2,
      }}
      >
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas del curso: </b>
          {curso.nombre}
        </Typography>
      </Box>
      <Stack sx={{ px: 5, py: 1, m: 3 }}>
        <Typography variant="h5">
          Actividades en la sala de clases (docentes)
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: 3, minHeight: 300 }}
        >
          <Grid item xs={12} sm={12} md={7}>
            <Card sx={{
              p: 3, borderRadius: 5, alignItems: 'center', height: '100%',
            }}
            >
              <Bar
                data={makeTiempoData(tiempoData)}
                options={tiempoOptions}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Card sx={{
              p: 1, borderRadius: 5, height: '100%',
            }}
            >
              <Doughnut data={makeCorrectasData(countCorrectas)} options={quicesOptions} />
            </Card>
          </Grid>
        </Grid>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Stack sx={{
            maxWidth: 850, marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <ActividadDocenteTable rowsData={actividadesCurso} institucion={institucion} />
          </Stack>
        </Stack>
        <Typography variant="h5" sx={{ alignSelf: 'center' }}>
          Actividades Individuales
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Stack sx={{
            maxWidth: 850, marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <ActividadIndividualTable rowsData={actividadesIndividual} institucion={institucion} />
          </Stack>
        </Stack>
        <Typography variant="h5" sx={{ alignSelf: 'center' }}>
          Ranking de Estudiantes
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Stack sx={{
            maxWidth: 850, marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <RankingTable rowsData={rank} institucion={institucion} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default EstadisticasProfesorView;

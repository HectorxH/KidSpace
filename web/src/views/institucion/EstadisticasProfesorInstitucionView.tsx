import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Stack, Theme, Typography, Grid,
} from '@mui/material';
// import { useParams } from 'react-router-dom';
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
import { useParams } from 'react-router-dom';
import NotFoundView from '../NotFoundView';
import '../../App.css';
import ActividadDocenteTable from '../../components/ActividadDocenteTable';
import HistorialIntitucionTable from './HistorialInstitucionTable';
import CursosInstitucionTable from './CursosInstitucionTable';
import { useAuth } from '../../hooks/useAuth';
import CargaView from '../LoadingView';
import { IProfesor } from '../../types/profesores';
import { ICurso } from '../../types/cursos';

interface ITiempoData {
  [key: string]: number
}

interface ICountCorrectas {
  [key: string]: {'Correctas': number, 'Incorrectas': number}
}

interface IActividades {
  [key: string]: number
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

// const mockHistorial = [
//   {
//     _id: '1',
//     actividad: 'Diagramas',
//     curso: '6 - A',
//     fecha: new Date('2022-10-13T00:42:11.000+00:00'),
//   },
//   {
//     _id: '2',
//     actividad: 'Diagramass',
//     curso: '6 - B',
//     fecha: new Date('2022-10-13T00:42:11.000+00:00'),
//   },
//   {
//     _id: '3',
//     actividad: 'Diagramasss',
//     curso: '6 - C',
//     fecha: new Date('2022-10-13T00:42:11.000+00:00'),
//   },
// ];

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

interface IInstitucion {
  institucion: boolean,
}

interface IHistorial {
  _id: string,
  actividad: string,
  curso: ICurso,
  createdAt: string,
}

const EstadisticasProfesorInstitucionView = () => {
  const { profesorId, startDate, endDate } = useParams();
  if (!profesorId || !startDate || !endDate) return <NotFoundView />;
  const [profesor, setProfesor] = useState<IProfesor>();
  const [tiempoData, setTiempoData] = useState<ITiempoData>();
  const [countCorrectas, setCountCorrectas] = useState<ICountCorrectas>();
  const [actividadesCurso, setActividadesCurso] = useState<IActividades>();
  const [loading, setLoading] = useState(true);
  const [historial, setHistorial] = useState<IHistorial[]>();

  const institucion = { institucion: true } as IInstitucion;

  const { logout } = useAuth();
  const getData = async () => {
    const dateRange = [new Date(Number(startDate)), new Date(Number(endDate))];
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Profesor/${profesorId}`);
      setProfesor(res.data.profesor);
      res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/profesor/${profesorId}/tiempo`, { dateRange });
      setTiempoData(res.data.tiempo);
      res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/profesor/${profesorId}/countCorrectasQuiz`, { dateRange });
      setCountCorrectas(res.data.countCorrectas);
      res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/profesor/${profesorId}/%curso`, { dateRange });
      setActividadesCurso(res.data.actividadesCurso);
      console.log(res.data.actividadesCurso);
      res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/profesor/${profesorId}/historialDocente`, { dateRange });
      setHistorial(res.data.historial);
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
  if (!profesor || !tiempoData || !countCorrectas
    || !actividadesCurso || !historial) return (<NotFoundView />);
  return (
    <Stack>
      <Box sx={{
        backgroundColor: '#B878EA', pb: 4, px: 4, py: 2,
      }}
      >
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas del profesor: </b>
          {`${profesor.user.nombres} ${profesor.user.apellidos}`}
        </Typography>
      </Box>
      <Stack sx={{ px: 5, py: 1, m: 3 }}>
        <Typography variant="h5">
          Cursos
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Stack sx={{
            maxWidth: 850, marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <CursosInstitucionTable rows={profesor.cursos} />
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ px: 5, py: 1, m: 3 }}>
        <Typography variant="h5">
          Actividades en la sala de clases de todos los cursos
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
      </Stack>
      <Stack sx={{ px: 5, py: 1, m: 3 }}>
        <Typography variant="h5">
          Historial de actividades
        </Typography>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Stack sx={{
            maxWidth: 850, marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <HistorialIntitucionTable rows={historial} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default EstadisticasProfesorInstitucionView;

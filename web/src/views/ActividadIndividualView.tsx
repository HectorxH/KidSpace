/* eslint-disable no-underscore-dangle */
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
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import _ from 'lodash';
import actividadesIndividuales from '../mock/actividadesIndividuales';
import ActividadIndividualAlumnosTable from '../components/ActividadIndividualAlumnosTable';
import CargaView from './LoadingView';
import NotFoundView from './NotFoundView';
import { useAuth } from '../hooks/useAuth';
import { ICurso } from '../types/cursos';
import { IEstudiante } from '../types/estudiantes';

interface IResultado {
  nombre: string;
  fecha: string;
  duracion: string;
}

interface IResultados {
  [key: string]: IResultado
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
      text: 'Cantidad de alumnos que completaron la actividad',
    },
  },
};

const makeGlobalData = (data: IEstudiante[], curso: ICurso) => {
  const completadas = data.length;
  const sinCompletar = curso.estudiantes.length - completadas;
  return {
    labels: ['Completaron', 'No completaron'],
    datasets: [
      {
        data: [completadas, sinCompletar],
        backgroundColor: ['#A1C96A', '#EA6A6A'],
      },
    ],
  };
};

const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];
const ActividadIndividualView = () => {
  const [nLogs, setNLogs] = useState<number>();
  const [completadas, setCompletadas] = useState<IEstudiante[]>();
  const [resultados, setResultados] = useState<IResultados>();
  const [curso, setCurso] = useState<ICurso>();
  const [loading, setLoading] = useState(true);

  const { actividad, cursoId } = useParams();
  if (!actividad) return <NotFoundView />;
  const actividadData = _.find(actividadesIndividuales, { title: actividad });

  const { logout } = useAuth();

  const loadData = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
      setCurso(res.data.curso);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/individual/${encodeURIComponent(actividad)}`);
      setNLogs(res.data.nLogs);
      setCompletadas(res.data.completadas);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/individual/${encodeURIComponent(actividad)}/resultados`);
      setResultados(res.data.resultados);
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
  if (
    _.isUndefined(actividadData)
    || _.isUndefined(curso)
    || _.isUndefined(nLogs)
    || _.isUndefined(completadas)
    || _.isUndefined(resultados)) {
    return <NotFoundView />;
  }
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: '#F2C144', px: 4, py: 2 }}>
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Estadísticas por actividad individual</b>
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          px: 5, justifyContent: 'center', height: '25em', alingContent: 'center',
        }}
      >
        <Stack direction="column" spacing={1} sx={{ width: 0.6 }}>
          <Card sx={{
            width: 1, borderRadius: 5, alignItems: 'center', height: '100%',
          }}
          >
            <CardMedia
              component="img"
              sx={{ height: '60%', maxWidth: '40em' }}
              image={actividadData.img}
            />
            <Typography sx={{ m: 1 }}>
              <b>Nombre:</b> {actividadData.title}
              <br />
              <b>Carrera Asociada:</b> {actividadData.carrera}
            </Typography>
            <Divider style={{ width: '90%', alignSelf: 'center' }} />
            <Stack
              direction="column"
              sx={{
                justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
              }}
            >
              <Stack
                direction="row"
                sx={{
                  width: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
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
            padding: 2, borderRadius: 5, alignItems: 'center',
          }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            >
              <CheckCircleIcon sx={{ color: '#A1C96A', mr: 1 }} />
              <Typography sx={{ fontSize: 16 }}>
                <Typography sx={{ fontSize: 16 }} display="inline">
                  La actividad se realizó un total de
                </Typography>
                <Typography sx={{ fontSize: 21, color: '#A1C96A' }} display="inline">
                  {` ${nLogs} `}
                </Typography>
                <Typography sx={{ fontSize: 16 }} display="inline">
                  veces por los y las estudiantes del curso.
                </Typography>
              </Typography>
            </Stack>
          </Card>

        </Stack>
        <Card sx={{
          padding: 1, width: 0.6, borderRadius: 5,
        }}
        >
          <Doughnut data={makeGlobalData(completadas, curso)} options={options} />
        </Card>
      </Stack>
      <Stack sx={{ px: 5, py: 2 }}>
        <ActividadIndividualAlumnosTable
          rows={resultados}
          estudiantes={_.map(curso.estudiantes, (estudiante) => `${estudiante.user.nombres} ${estudiante.user.apellidos}`)}
        />
      </Stack>
    </Stack>
  );
};
export default ActividadIndividualView;

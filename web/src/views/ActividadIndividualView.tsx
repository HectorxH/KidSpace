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
const infoActividadIndividualAlumnosTable = [
  {
    _id: 0,
    nombre: 'Soohyun',
    estado: 'Completada',
    tiempo: '3min 20 s',
  },
  {
    _id: 0,
    nombre: 'Soohyeong',
    estado: 'Completada',
    tiempo: '1min 50 s',
  },
  {
    _id: 0,
    nombre: 'Jihwa',
    estado: 'Sin completar',
    tiempo: '-',
  },
];
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
const ActividadIndividualView = () => {
  const [loading, setLoading] = useState(true);

  const { actividad } = useParams();
  const actividadData = _.find(actividadesIndividuales, { title: actividad });

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
          <b>Estadísticas por actividad individual</b>
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          px: 5, justifyContent: 'center', alingContent: 'center', height: '400px',
        }}
      >
        <Stack direction="column" spacing={1} sx={{ width: 0.9 / 2 }}>
          <Card sx={{
            width: 1, borderRadius: 5, alignItems: 'center',
          }}
          >
            <CardMedia
              component="img"
              // sx={{ height: '20vh' }}
              image={actividadData.img}
            />
            <Typography sx={{ m: 1 }}>
              <b>Nombre:</b> {actividadData.title}
              <br />
              <b>Carrera Asociada:</b> {actividadData.carrera}
            </Typography>
            <Divider style={{ width: '90%', alignSelf: 'center' }} />
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
          </Card>
          <Card sx={{
            padding: 2, borderRadius: 5, alignItems: 'center',
          }}
          >
            <Stack
              direction="row"
              sx={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}
            ><CheckCircleIcon sx={{ color: '#A1C96A', mr: 1 }} />
              <Typography sx={{ fontSize: 14 }}>
                La actividad se realizó un total de  25 veces por los y las estudiantes del curso
              </Typography>
            </Stack>
          </Card>

        </Stack>
        <Card sx={{ padding: 1, width: 1.1 / 2, borderRadius: 5 }}>
          <Doughnut data={data} options={options} />
        </Card>
      </Stack>
      <Stack sx={{ px: 5, py: 2 }}>
        <ActividadIndividualAlumnosTable rows={infoActividadIndividualAlumnosTable} />
      </Stack>
    </Stack>
  );
};
export default ActividadIndividualView;

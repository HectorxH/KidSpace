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
  Doughnut, Pie,
} from 'react-chartjs-2';
import _ from 'lodash';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../hooks/useAuth';
import ResultadosQuizTable from '../components/ResultadosQuizTable';
import actividadesDocentes from '../mock/actividadesDocentes';
import NotFoundView from './NotFoundView';
import CargaView from './LoadingView';
import { ICurso } from '../types/cursos';

interface IResultado {
  nombre: string;
  fecha: string;
  respuesta1: string;
  respuesta2:string;
}

interface IResultados {
  [key: string]: IResultado;
}

interface ICount {
    Correctas: number,
    Incorrectas: number
}

const letras = ['S', 'T', 'E', 'A', 'M'];
const colores = ['#5C9DEC', '#B878EA', '#FF8A00', '#F3C550', '#A1C96A'];

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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
  },
};

const makeSingleData = (data: ICount[], curso: ICurso, idx: number) => {
  const correctas = data[idx].Correctas || 0;
  const incorrectas = data[idx].Incorrectas || 0;
  const sinResponder = curso.estudiantes.length - correctas - incorrectas;
  return {
    labels: ['Respuesta Correcta', 'Respuesta Incorrecta', 'Sin responder'],
    datasets: [
      {
        data: [correctas, incorrectas, sinResponder],
        backgroundColor: ['#A1C96A', '#EA6A6A', 'gray'],
      },
    ],
  };
};

const makeGlobalData = (data: ICount[], curso: ICurso) => {
  const correctas = (data[0].Correctas || 0) + (data[1].Correctas || 0);
  const incorrectas = (data[0].Incorrectas || 0) + (data[1].Incorrectas || 0);
  const sinResponder = curso.estudiantes.length * 2 - correctas - incorrectas;
  return {
    labels: ['Respuesta Correcta', 'Respuesta Incorrecta', 'Sin responder'],
    datasets: [
      {
        data: [correctas, incorrectas, sinResponder],
        backgroundColor: ['#A1C96A', '#EA6A6A', 'gray'],
      },
    ],
  };
};

const RespuestasCorrectas: {[key: string]: string[]} = {
  Diagramas: ['gráficos', 'una tabla'],
  Diseños: ['función', 'textura'],
  Materiales: ['centro', 'lote'],
  Reciclaje: ['placeholder', 'placeholder'],
  'Soluciones Tecnológicas': ['placeholder', 'placeholder'],
};

const ActividadDocenteView = () => {
  const [curso, setCurso] = useState<ICurso>();
  const [resultados, setResultados] = useState<IResultados>();
  const [nLogs, setNLogs] = useState<number>();
  const [counts, setCounts] = useState<ICount[]>();
  const [loading, setLoading] = useState(true);

  const { actividad, cursoId } = useParams();
  if (!actividad) return <NotFoundView />;
  const respuestasCorrectas = RespuestasCorrectas[actividad];
  const actividadData = _.find(actividadesDocentes, { actividad });

  const { logout } = useAuth();

  const loadData = async () => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`); // ${cursoId}`);
      setCurso(res.data.curso);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/docente/${encodeURIComponent(actividad)}`);
      setNLogs(res.data.nLogs);
      setCounts(res.data.counts);
      res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estadisticas/curso/${cursoId}/docente/${encodeURIComponent(actividad)}/resultados`);
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
    || _.isUndefined(counts)
    || _.isUndefined(resultados)) {
    return <NotFoundView />;
  }
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
            <Typography display="inline" sx={{ fontSize: '15px', color: nLogs > 0 ? '#A1C96A' : '#EA6A6A' }}>
              {nLogs > 0 ? ' Completada' : ' Sin Completar' }
            </Typography>
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
                <Typography
                  sx={{
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
          <Doughnut data={makeGlobalData(counts, curso)} options={options} />
        </Card>
      </Stack>
      <Stack spacing={2} sx={{ px: 5 }}>
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
                  {pregunta.alternativas.map((alt) => {
                    if (respuestasCorrectas[id] === alt) {
                      return (
                        <Stack direction="row">
                          <li>{alt}</li> <CheckIcon sx={{ color: '#A1C96A', marginX: 1 }} />
                        </Stack>
                      );
                    }
                    return (<li>{alt}</li>);
                  })}
                </Typography>
              </Stack>
            </Card>
            <Card sx={{ width: 0.8 / 2, borderRadius: 5 }}>
              <Pie data={makeSingleData(counts, curso, id)} options={options} />
            </Card>
          </Stack>
        )))}
        <Typography variant="h5">
          Resultados del Quiz
        </Typography>
        <ResultadosQuizTable
          rows={resultados}
          correctas={respuestasCorrectas}
          estudiantes={_.map(curso.estudiantes, (estudiante) => `${estudiante.user.nombres} ${estudiante.user.apellidos}`)}
        />
      </Stack>
    </Stack>
  );
};
export default ActividadDocenteView;

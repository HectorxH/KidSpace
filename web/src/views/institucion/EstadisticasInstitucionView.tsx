/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box, MenuItem,
  Grid, Button,
  Stack, Theme, Typography, TextField,
} from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import locale from 'date-fns/locale/es';
import axios from 'axios';
import { ICursos } from '../../types/cursos';
import NotFoundView from '../NotFoundView';
import '../../App.css';
import { useAuth } from '../../hooks/useAuth';

const img = require('../../assets/institucion.png');

const profesores = [
  {
    _id: '63475e1711ba100d7ce87ca3',
    nombre: 'Profe 1',
  },
  {
    _id: '2',
    nombre: 'Profe 2',
  },
];

const EstadisticasInstitucionView = () => {
  const user = {
    _id: 'sdfs54df6', nombres: 'nombre', apellidos: 'apellidos', institucion: 'Institucion', plan: 2,
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const { logout } = useAuth();

  const [cursos, setCursos] = useState<ICursos>([]);
  const [loading, setLoading] = useState(false);
  const [profesor, setProfesor] = useState('');
  const [curso, setCurso] = useState('');
  const [isDisabledCurso, setIsDisabledCurso] = useState(true);
  const [dateSelected, setDateSelected] = useState(false);
  const navigate = useNavigate();

  const changeProfesor = (event: any) => {
    setProfesor(event.target.value);
    setIsDisabledCurso(false);
  };

  const changeDate = (item: any) => {
    setState(item);
    setDateSelected(true);
  };

  const updateCursos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso`);
      setCursos(res.data.cursos);
      console.log(res);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (cursos.length === 0) updateCursos();
    setLoading(false);
  }, []);

  const handleReporte = () => (
    curso === ''
      ? navigate(`/estadisticas/${profesor}`)
      : navigate(`/estadisticas/${profesor}/${curso}`)
  );

  const reporteActivo = () => {
    if (dateSelected && profesor !== '') {
      return false;
    }
    return true;
  };

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Stack
        direction="row"
        style={{
          width: '100%', justifyContent: 'center', height: '30vh', backgroundColor: '#F2C144', alignItems: 'center',
        }}
      >
        <Stack direction="column" spacing={2} sx={{ margin: 2, width: 4 / 5 }}>
          <Typography display="block" variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>Hola, {user?.nombres} {user?.apellidos}</b>
          </Typography>
          <Typography display="block" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>¡Te damos la bienvenida al sistema de estadísticas de Kidspace!</b>
          </Typography>
        </Stack>
        <Box
          component="img"
          sx={{
            alignSelf: 'right',
            maxHeight: '25vh',
            margin: 2,
          }}
          src={img}
        />
      </Stack>
      <Stack justifyContent="center" direction="row" spacing={15}>
        <DateRangePicker
          onChange={(item: any) => changeDate([item.selection])}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
          preventSnapRefocus
          calendarFocus="backwards"
          weekStartsOn={1}
          dateDisplayFormat="dd/MM/yyyy"
          locale={locale}
        />
        <Stack spacing={10} alignSelf="center">
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione un profesor:
            </Typography>
            <TextField
              select
              id="select-profesor"
              sx={{ minWidth: '270px' }}
              label="Profesor"
              defaultValue=""
              onChange={(e) => changeProfesor(e)}
              required
            >
              {profesores?.map((p) => (
                <MenuItem key={p._id} value={p._id}>{p.nombre}</MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione un curso:
            </Typography>
            <TextField
              select
              id="select-curso"
              sx={{ minWidth: '270px' }}
              label="Curso"
              defaultValue=""
              disabled={isDisabledCurso}
              onChange={(e) => setCurso(e.target.value)}
            >
              <MenuItem key={0} value="">Ninguno</MenuItem>
              {cursos?.map((c) => (
                <MenuItem key={c._id} value={c._id}>{c.nombre}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ pr: 10 }}>
        <Button
          startIcon={<PieChartIcon />}
          sx={{
            alignSelf: 'flex-end',
            width: 200,
            textTransfrom: 'none',
            backgroundColor: reporteActivo() ? '#F1F3F8' : (theme: Theme) => theme.palette.secondary.main,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#ffbe82',
              color: '#FFFFFF',
            },
          }}
          disabled={reporteActivo()}
          onClick={handleReporte}
        >
          Generar reporte
        </Button>
      </Stack>
    </Stack>
  );
};

export default EstadisticasInstitucionView;

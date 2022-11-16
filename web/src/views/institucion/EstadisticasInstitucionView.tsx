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
import '../../App.css';
import { useAuth } from '../../hooks/useAuth';
import { IProfesor } from '../../types/profesores';
import CargaView from '../LoadingView';

const img = require('../../assets/institucion.png');

const EstadisticasInstitucionView = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);
  console.log(state[0].startDate);
  console.log((state[0].startDate).getTime());
  console.log(new Date((state[0].startDate).getTime()));
  const { user, logout } = useAuth();
  const [profesores, setProfesores] = useState<IProfesor[]>();
  const [loading, setLoading] = useState(false);
  const [profesorIdx, setProfesorIdx] = useState<number>(0);
  const [cursoIdx, setCursoIdx] = useState<number>();
  const [isDisabledCurso, setIsDisabledCurso] = useState(true);
  const [dateSelected, setDateSelected] = useState(false);
  const navigate = useNavigate();

  const changeProfesor = (event: any) => {
    setProfesorIdx(event.target.value);
    setIsDisabledCurso(false);
  };

  const stateToSimpleObject = (s: any) => ([s[0].startDate.getTime(), s[0].endDate.getTime()]);

  const changeDate = (item: any) => {
    setState(item);
    setDateSelected(true);
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Representante/profesores`);
      setProfesores(res.data.profesores);
      console.log(res.data.profesores);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!profesores) getData();
  }, []);

  const handleReporte = () => {
    if (profesores === undefined || profesorIdx === undefined || cursoIdx === undefined) return;
    if (cursoIdx === -1) {
      navigate(`/estadisticas/${profesores[profesorIdx]._id}/${(state[0].startDate).getTime()}/${(state[0].endDate).getTime()}`);
    } else {
      navigate(`/estadisticas/${profesores[profesorIdx]._id}/${profesores[profesorIdx].cursos[cursoIdx]._id}/${(state[0].startDate).getTime()}/${(state[0].endDate).getTime()}`);
    }
  };

  const reporteActivo = () => {
    if (dateSelected && profesorIdx !== undefined && cursoIdx !== undefined) {
      return false;
    }
    return true;
  };

  if (loading) return <CargaView />;
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
      <Stack justifyContent="center">
        <Grid
          container
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <Typography align="center" sx={{ pb: 2 }}>
              Seleccione un rango de fechas:
            </Typography>
            <Stack alignItems="center">
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
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Stack
              spacing={3}
              alignItems="center"
              py={5}
            >
              <Grid
                container
                alignItems="center"
              >
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" px={4}>
                    Seleccione un profesor:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                  <TextField
                    select
                    id="select-profesor"
                    sx={{ minWidth: '270px' }}
                    label="Profesor"
                    defaultValue=""
                    onChange={(e) => changeProfesor(e)}
                    required
                  >
                    {profesores?.map((p, idx) => (
                      <MenuItem key={p._id} value={idx}>{p.user.nombres}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
              >
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="subtitle2" px={4}>
                    Seleccione un curso:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                  <TextField
                    select
                    id="select-curso"
                    sx={{ minWidth: '270px' }}
                    label="Curso"
                    defaultValue=""
                    disabled={isDisabledCurso}
                    onChange={(e) => setCursoIdx(Number(e.target.value))}
                  >
                    <MenuItem key={0} value={-1}>Todos los cursos</MenuItem>
                    {
                      (profesores !== undefined)
                      && profesores[profesorIdx].cursos.map((c, idx) => (
                        <MenuItem key={c._id} value={idx}>{c.nombre}</MenuItem>
                      ))
                    }
                  </TextField>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
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

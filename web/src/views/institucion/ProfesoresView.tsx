/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card, Grid, Tooltip,
  CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import NotFoundView from '../NotFoundView';
import '../../App.css';
import ProfesoresTable from './ProfesoresTable';
import { ICurso } from '../../types/cursos';
import { useAuth } from '../../hooks/useAuth';
import paquetes from '../../mock/paquetes';

const img = require('../../assets/institucion.png');

const profes = [
  {
    _id: '5ds6f',
    nombres: 'nombre',
    apellidos: 'apellidos',
    email: 'email@gmail.email',
  },
  {
    _id: '5dsgb6f',
    nombres: 'nombress',
    apellidos: 'apellidoss',
    email: 'email@gmail.emaill',
  },
];

interface IProfesores {
  _id: string,
  nombres: string,
  apellidos: string,
  email: string,
}

const ProfesoresView = () => {
  const params = useParams();
  const [profesores, setProfesores] = useState<IProfesores[]>(profes);
  const [loading, setLoading] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);
  const [cantidad, setCantidad] = useState(2);
  const navigate = useNavigate();
  const user = {
    _id: 'sdfs54df6', nombres: 'nombre', apellidos: 'apellidos', institucion: 'Institucion', plan: 2,
  };
  const { logout } = useAuth();
  const getProfesores = () => {
    setProfesores(profes); // res.data
    setCantidad(profes.length);
    if (cantidad === 0) {
      setDisabledButton(true);
    }
    // try {
    //   const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
    //   setCurso(res.data.curso);
    //   console.log(res.data);
    //   setLoading(false);
    // } catch (e) {
    //   console.log(e);
    //   if (axios.isAxiosError(e) && e.response?.status === 401) {
    //     logout();
    //   }
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   if (!curso) getCurso();
  // }, []);

  // if (loading) return (<Box />);
  // if (!curso) return (<NotFoundView />);
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
      <Grid
        container
        spacing={0}
        justifyContent="right"
        sx={{ px: 4 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={paquetes[user.plan].limite
            ? 5 : 8}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={paquetes[user.plan].limite
            ? 7 : 4}
        >
          <Card sx={{
            p: 3, backgroundColor: '#F1F3F8', borderRadius: 5,
          }}
          >
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignItems="center"
            >
              {paquetes[user.plan].limite
                ? (
                  <Grid item xs={12} sm={12} md={8}>
                    {cantidad > 1
                      ? (
                        <Typography>
                          Tienes disponible <b>{cantidad}</b> profesores para registrar
                        </Typography>
                      )
                      : cantidad === 1 ? (
                        <Typography>
                          Tienes disponible <b>{cantidad}</b> profesor más para registrar
                        </Typography>
                      )
                        : (
                          <Typography>
                            Has llegado al límite de profesores a registrar
                          </Typography>
                        )}
                  </Grid>
                )
                : (
                  <Box />
                )}
              <Grid
                item
                xs={12}
                sm={12}
                md={paquetes[user.plan].limite
                  ? 4 : 6}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="h5" sx={{ color: '#000' }}>
                    <b>KIDSPACE</b>
                  </Typography>
                  <Typography variant="h4" sx={{ color: paquetes[user.plan].color }}>
                    <b>{paquetes[user.plan].title}</b>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ px: 4 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h4" sx={{ marginTop: 2 }}>
            Lista de Profesores
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 6, md: 'flex' }, justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/profesores/agregar')}
              sx={{ marginTop: 2 }}
              startIcon={<AddIcon />}
              disabled={disabledButton}
            >
              Profesor/a
            </Button>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'left' }}>
          <Stack sx={{
            marginTop: 3, marginBottom: 3, width: 1,
          }}
          >
            <ProfesoresTable rows={profesores} updateProfesores={getProfesores} />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
export default ProfesoresView;

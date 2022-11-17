/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Button, TextField, Card, CardContent,
  Divider, Stack, Typography, Grid, Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { IProfesor } from '../../types/profesores';
import { useAuth } from '../../hooks/useAuth';
import CargaView from '../LoadingView';

const AgregarProfesorView = () => {
  const params = useParams();
  const { profesorId } = params;
  const [defaultProfesor, setDefaultProfesor] = useState<IProfesor>();
  const [nombres, setNombres] = useState<String>('');
  const [apellidos, setApellidos] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [profesor, setProfesor] = useState<IProfesor>();
  const navigate = useNavigate();
  const [editingProfesor, setEditingProfesor] = useState(true);
  const [nuevo, setNuevo] = useState(true);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();

  const getProfesor = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Profesor/${profesorId}`);
      setProfesor(res.data.profesor);
      setLoading(false);
      console.log();
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (profesor) {
      setNombres(profesor.user.nombres);
      setApellidos(profesor.user.apellidos);
      setEmail(profesor.user.email);
    }
  }, [profesor]);

  useEffect(() => {
    if (profesorId) {
      getProfesor();
      setNuevo(false);
    } else {
      setLoading(false);
    }
  }, []);

  const handleCancelarClick = () => {
    if (!profesor) {
      navigate('/profesores');
    }
    setEditingProfesor(false);
  };

  const handleGuardarClick = async () => {
    try {
      let res;
      if (nuevo) {
        res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/register`,
          {
            tipo: 'profesor',
            nombres,
            apellidos,
            email,
            representanteUid: user?._id,
          },
        );
      } else if (profesor) {
        res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/Profesor/${profesor._id}`,
          {
            nombres,
            apellidos,
            email,
          },
        );
      } else {
        throw Error();
      }
      setProfesor(res.data.profesor);
      setEditingProfesor(false);
      setNuevo(false);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  const handleNombresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event: any) => {
    setApellidos(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const sendCredentials = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Profesor/${profesor?._id}/sendCredentials`);
      console.log(res);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  if (loading) return <CargaView />;
  return (
    <Stack padding={4}>
      <Typography variant="h4">
        Datos del profesor :
      </Typography>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              Datos del profesor:
            </Typography>
            {!nuevo
              ? (
                <Button startIcon={<EditIcon />} onClick={() => { setEditingProfesor(true); }}>
                  Editar
                </Button>
              )
              : (<Box />)}
          </Stack>
          <Divider />
          <Stack
            spacing={3}
            direction="column"
            py={5}
          >
            <Grid
              container
              alignItems="center"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Nombres
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField size="small" disabled={!editingProfesor} value={nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Apellidos
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField size="small" disabled={!editingProfesor} value={apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField size="small" disabled={!editingProfesor} value={email} onChange={handleEmailChange} sx={{ borderRadius: 10 }} />
              </Grid>
            </Grid>
            <Stack direction="row">
              <Stack direction="row" px={3}>
                {profesor
                && (
                <Button
                  startIcon={<ForwardToInboxIcon />}
                  onClick={sendCredentials}
                >
                  Enviar credenciales
                </Button>
                )}
              </Stack>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {editingProfesor && (
                <Stack direction="row">
                  <Button onClick={handleCancelarClick} variant="contained" color="inherit" sx={{ marginRight: 2 }}> Cancelar </Button>
                  <Button onClick={handleGuardarClick} variant="contained" color="quaternary">
                    <Typography variant="button" color="white">
                      Guardar
                    </Typography>
                  </Button>
                </Stack>
                )}
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AgregarProfesorView;

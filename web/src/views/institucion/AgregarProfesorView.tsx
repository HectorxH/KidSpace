/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Button, TextField, Card, CardContent,
  Divider, Stack, Typography, Grid,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import EditarApoderado from '../../components/EditarApoderado';
import { IApoderados, IApoderado } from '../../types/apoderados';
import { useAuth } from '../../hooks/useAuth';
// import { IProfesor } from '../../types/profesors';
import NotFoundView from '../NotFoundView';

interface IProfesor {
  _id: string,
  nombres: string,
  apellidos: string,
  email: string,
}

const AgregarProfesorView = () => {
  const params = useParams();
  // const { profesorId } = params;
  // if (!profesorId) return <NotFoundView />;

  const [defaultProfesor, setDefaultProfesor] = useState<IProfesor>();
  const [profesor, setProfesor] = useState<IProfesor>();
  const [editingProfesor, setEditingProfesor] = useState(false);

  const { logout } = useAuth();

  const getProfesor = async () => {
    // try {
    //   const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Profesor/${funcionarioId}`);
    //   const est : IProfesor = res.data.profesor;
    //   setDefaultProfesor(est);
    //   setProfesor(est);
    //   setApoderados(est.apoderados);
    //   console.log(est);
    // } catch (e) {
    //   console.log(e);
    //   if (axios.isAxiosError(e) && e.response?.status === 401) {
    //     logout();
    //   }
    // }
  };

  // useEffect(() => {
  //   if (!profesor) getProfesor();
  // }, []);

  // const handleCancelarClick = () => {
  //   setProfesor(defaultProfesor);
  //   setEditingProfesor(false);
  // };

  const handleGuardarClick = async () => {
    // try {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_BACKEND_URL}/Profesor/${profesorId}`,
    //     { nombres: profesor?.user.nombres, apellidos: profesor?.user.apellidos },
    //   );
    //   console.log(res);
    //   setEditingProfesor(false);
    // } catch (e) {
    //   console.log(e);
    //   if (axios.isAxiosError(e) && e.response?.status === 401) {
    //     logout();
    //   }
    // }
  };

  const handleNombresChange = (event: any) => {
    console.log(0);
  };

  const handleApellidosChange = (event: any) => {
    console.log(1);
  };
  const navigate = useNavigate();
  // if (!profesor) return <div />;
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
          </Stack>
          <Divider />
          <Stack
            spacing={3}
            direction="column"
            py={4}
          >
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Nombres
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField size="small" disabled={!editingProfesor} value={profesor?.nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Apellidos
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField size="small" disabled={!editingProfesor} value={profesor?.apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" px={4}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={7}>
                <TextField size="small" disabled={!editingProfesor} value={profesor?.email} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="end">
              <Button onClick={() => navigate('/profesores')} variant="contained" color="inherit" sx={{ marginRight: 2 }}> Cancelar </Button>
              <Button onClick={handleGuardarClick} variant="contained" color="quaternary">
                <Typography variant="button" color="white">
                  Guardar
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AgregarProfesorView;

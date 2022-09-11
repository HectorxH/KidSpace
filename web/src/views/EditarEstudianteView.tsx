/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Button, TextField, Card, CardContent,
  Divider, Stack, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import EditarApoderado from '../components/EditarApoderado';
import { IApoderados, IApoderado } from '../types/apoderados';
import { useAuth } from '../hooks/useAuth';
import { IEstudiante } from '../types/estudiantes';
import NotFoundView from './NotFoundView';

const EditarEstudiante = () => {
  const params = useParams();
  const { estudianteId } = params;
  if (!estudianteId) return <NotFoundView />;

  const [defaultEstudiante, setDefaultEstudiante] = useState<IEstudiante>();
  const [estudiante, setEstudiante] = useState<IEstudiante>();
  const [editingEstudiante, setEditingEstudiante] = useState(false);
  const [apoderados, setApoderados] = useState<IApoderados>();

  const { logout } = useAuth();

  const getEstudiante = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Estudiante/${estudianteId}`);
      const est : IEstudiante = res.data.estudiante;
      setDefaultEstudiante(est);
      setEstudiante(est);
      setApoderados(est.apoderados);
      console.log(est);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (!estudiante) getEstudiante();
  }, []);

  const handleCancelarClick = () => {
    setEstudiante(defaultEstudiante);
    setEditingEstudiante(false);
  };

  const handleAddApoderadoClick = () => {
    if (estudiante) {
      const _id = (Math.random() + 1).toString(36).substring(7);
      const apodrado: IApoderado = {
        _id,
        user: {
          nombres: '',
          apellidos: '',
          email: '',
          tipo: 'apoderado',
        },
        enviado: false,
        new: true,
        estudiantes: [estudianteId],
      };
      setEstudiante({
        ...estudiante,
        apoderados: estudiante.apoderados.concat([apodrado]),
      });
      setApoderados(estudiante?.apoderados);
    }
  };

  const updateApoderados = async (apoderado: IApoderado) => {
    if (estudiante) {
      const { nombres, apellidos, email } = apoderado.user;

      try {
        if (apoderado.new) {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/register`,
            {
              nombres, apellidos, email, tipo: 'apoderado',
            },
          );
          apoderado._id = res.data.apoderado._id;
          await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/Estudiante/${estudiante._id}/apoderados`,
            {
              apoderadoId: apoderado._id,
            },
          );
          await getEstudiante();
        } else {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/Apoderado/${apoderado._id}`,
            { nombres, apellidos, email },
          );
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const deleteApoderados = async (_id: string) => {
    if (estudiante && apoderados) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Apoderado/${_id}`);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      setApoderados(apoderados.filter((apoderado) => apoderado._id !== _id));
      setEstudiante({
        ...estudiante,
        apoderados,
      });
    }
  };

  const handleGuardarClick = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/Estudiante/${estudianteId}`,
        { nombres: estudiante?.user.nombres, apellidos: estudiante?.user.apellidos },
      );
      console.log(res);
      setEditingEstudiante(false);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
  };

  const handleNombresChange = (event: any) => {
    if (estudiante) {
      setEstudiante({
        ...estudiante,
        user: { ...estudiante.user, nombres: event.target.value },
      });
    }
  };

  const handleApellidosChange = (event: any) => {
    if (estudiante) {
      setEstudiante({
        ...estudiante,
        user: { ...estudiante.user, apellidos: event.target.value },
      });
    }
  };

  if (!estudiante) return <div />;

  return (
    <Stack padding={4}>
      <Typography variant="h4">
        Datos del estudiante :
      </Typography>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              Datos del estudiante:
            </Typography>
            <Button startIcon={<EditIcon />} onClick={() => { setEditingEstudiante(true); }}>
              Editar
            </Button>
          </Stack>
          <Divider />
          <Stack
            spacing={3}
            direction="column"
            py={4}
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" px={4}>
                Nombres
              </Typography>
              <TextField size="small" disabled={!editingEstudiante} value={estudiante?.user.nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" px={4}>
                Apellidos
              </Typography>
              <TextField size="small" disabled={!editingEstudiante} value={estudiante?.user.apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
            </Stack>
            {editingEstudiante && (
              <Stack direction="row" justifyContent="end">
                <Button onClick={handleCancelarClick} variant="contained" color="inherit" sx={{ marginRight: 2 }}> Cancelar </Button>
                <Button onClick={handleGuardarClick} variant="contained" color="quaternary">
                  <Typography variant="button" color="white">
                    Guardar
                  </Typography>
                </Button>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
      <Stack padding={2}>
        <Button onClick={handleAddApoderadoClick} startIcon={<AddIcon />} variant="contained" sx={{ maxWidth: 150 }}>
          Apoderado/a
        </Button>
      </Stack>
      {estudiante?.apoderados.length !== 0 && (
        estudiante?.apoderados.map((apoderado: IApoderado) => (
          <EditarApoderado
            key={apoderado._id}
            initialApoderado={apoderado}
            updateApoderados={updateApoderados}
            deleteApoderados={deleteApoderados}
          />
        ))
      )}
    </Stack>
  );
};

export default EditarEstudiante;

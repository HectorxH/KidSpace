/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import {
  Button, Paper, Grid, Alert, TextField,
  Card, CardContent, Divider, Stack, Theme, Typography,
} from '@mui/material';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IApoderado } from '../types/apoderados';

interface EdtiarApoderadoParams {
  apoderado: IApoderado,
  handleUpdateApoderado: Function,
  handleEliminarApoderado: Function
}

const getApoderado = (napoderado: string) => {
  const apoderados = localStorage.getItem('apoderados');
  if (apoderados === null) return null;
  const apoderadosArray = JSON.parse(apoderados);
  for (let i = 0; i < apoderadosArray.length; i++) {
    const apoderado = apoderadosArray[i];
    if (apoderado.napoderado === napoderado) {
      return [apoderado.nombres, apoderado.apellidos, apoderado.correo];
    }
  }
  return ['', ''];
};

const EditarApoderado = ({ apoderado, handleUpdateApoderado, handleEliminarApoderado }:
  EdtiarApoderadoParams) => {
  const datos = useParams();
  const [nombres, setNombres] = useState(apoderado.nombres);
  const [apellidos, setApellidos] = useState(apoderado.apellidos);
  const [correo, setCorreo] = useState(apoderado.correo);
  const [editing, setEditing] = useState(false);
  const [correct, setCorrect] = useState(false);

  const changeApoderadoEditing = () => {
    setEditing(!editing);
  };

  const handleCancelarClick = () => {
    setNombres(apoderado.nombres);
    setApellidos(apoderado.apellidos);
    setCorreo(apoderado.correo);
    changeApoderadoEditing();
  };

  const handleUpdate = () => {
    changeApoderadoEditing();
    const newApoderado = {
      napoderado: apoderado.napoderado,
      nombres,
      apellidos,
      correo,
    };
    handleUpdateApoderado(newApoderado);
  };

  const handleEliminar = () => {
    changeApoderadoEditing();
    handleEliminarApoderado(apoderado.napoderado);
  };

  const handleNombresChange = (event: any) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event: any) => {
    setApellidos(event.target.value);
  };

  const handleCorreoChange = (event: any) => {
    setCorreo(event.target.value);
  };

  return (
    <Stack>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              Datos del apoderado:
            </Typography>
            <Button startIcon={<EditIcon />} onClick={changeApoderadoEditing}>
              Editar
            </Button>
          </Stack>
          <Divider />
          <Stack
            spacing={3}
            direction="column"
            pt={4}
            pb={2}
          >
            <Stack maxWidth={500} spacing={3} py={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Nombres
                </Typography>
                <TextField size="small" disabled={!editing} value={nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Apellidos
                </Typography>
                <TextField size="small" disabled={!editing} value={apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Correo electrónico
                </Typography>
                <TextField size="small" disabled={!editing} value={correo} onChange={handleCorreoChange} sx={{ borderRadius: 10 }} />
              </Stack>
            </Stack>
            {editing && (
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Button sx={{ color: '#EA6A6A' }} onClick={handleEliminar} startIcon={<DeleteIcon />}>Eliminar</Button>
                </Stack>
                <Stack direction="row" alignItems="end">
                  <Button onClick={handleCancelarClick} variant="contained" color="inherit" sx={{ marginRight: 2 }}> Cancelar </Button>
                  <Button onClick={handleUpdate} variant="contained" color="quaternary">
                    <Typography variant="button" color="white">
                      Guardar
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default EditarApoderado;

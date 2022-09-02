/* eslint-disable no-plusplus */
import {
  Button, TextField, Card, CardContent,
  Divider, Stack, Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditarApoderado from '../components/EditarApoderado';
import { IApoderado } from '../types/apoderados';

const getEstudiante = (datos: any) => {
  const estudiantes = localStorage.getItem('estudiantes');
  if (estudiantes === null) return null;
  const estudiantesArray = JSON.parse(estudiantes);
  for (let i = 0; i < estudiantesArray.length; i++) {
    const estudiante = estudiantesArray[i];
    if (estudiante.nestudiante === datos.nestudiante) {
      return [estudiante.nombres, estudiante.apellidos, estudiante.apoderados];
    }
  }
  return ['', '', []];
};

const EditarEstudiante = () => {
  const datos = useParams();
  const informacion = getEstudiante(datos);
  const [nombres, setNombres] = useState(informacion![0]);
  const [apellidos, setApellidos] = useState(informacion![1]);
  const [apoderados, setApoderados] = useState(informacion![2]);
  const [editing, setEditing] = useState(false);

  const changeEditing = () => {
    setEditing(!editing);
  };

  const handleCancelarClick = () => {
    const info = getEstudiante(datos);
    setNombres(info![0]);
    setApellidos(info![1]);
    changeEditing();
    return null;
  };

  const handleAddApoderadoClick = () => {
    const estudiantes = localStorage.getItem('estudiantes');
    if (estudiantes === null) return null;
    const estudiantesArray = JSON.parse(estudiantes);
    for (let i = 0; i < estudiantesArray.length; i++) {
      const estudiante = estudiantesArray[i];
      if (estudiante.nestudiante === datos.nestudiante) {
        estudiantesArray[i].apoderados = [...estudiantesArray[i].apoderados, {
          napoderado: (estudiantesArray[i].apoderados.length + 1).toString(),
          nombres: 'Nombres',
          apellidos: 'Apellidos',
          correo: 'Correo',
        }];
        localStorage.setItem('estudiantes', JSON.stringify(estudiantesArray));
        setApoderados(estudiantesArray[i].apoderados);
        return null;
      }
    }
    return null;
  };

  const handleUpdateApoderado = (apoderado: IApoderado) => {
    const estudiantes = localStorage.getItem('estudiantes');
    if (estudiantes === null) return null;
    const estudiantesArray = JSON.parse(estudiantes);
    for (let i = 0; i < estudiantesArray.length; i++) {
      const estudiante = estudiantesArray[i];
      if (estudiante.nestudiante === datos.nestudiante) {
        const oldApoderados = estudiantesArray[i].apoderados;
        for (let j = 0; j < oldApoderados.length; j++) {
          const oldApoderado = oldApoderados[j];
          if (oldApoderado.napoderado === apoderado.napoderado) {
            estudiantesArray[i].apoderados[j] = apoderado;
            localStorage.setItem('estudiantes', JSON.stringify(estudiantesArray));
            setApoderados(estudiantesArray[i].apoderados);
            return null;
          }
        }
      }
    }
    return null;
  };

  const handleEliminarApoderado = (napoderado: string) => {
    const estudiantes = localStorage.getItem('estudiantes');
    if (estudiantes === null) return null;
    const estudiantesArray = JSON.parse(estudiantes);
    for (let i = 0; i < estudiantesArray.length; i++) {
      const estudiante = estudiantesArray[i];
      if (estudiante.nestudiante === datos.nestudiante) {
        const oldApoderados = estudiantesArray[i].apoderados;
        for (let j = 0; j < oldApoderados.length; j++) {
          const oldApoderado = oldApoderados[j];
          if (oldApoderado.napoderado === napoderado) {
            estudiantesArray[i].apoderados.splice(j, 1);
            localStorage.setItem('estudiantes', JSON.stringify(estudiantesArray));
            setApoderados(estudiantesArray[i].apoderados);
            return null;
          }
        }
      }
    }
    return null;
  };

  const handleGuardarClick = () => {
    const estudiantes = localStorage.getItem('estudiantes');
    if (estudiantes === null) return null;
    const estudiantesArray = JSON.parse(estudiantes);
    for (let i = 0; i < estudiantesArray.length; i++) {
      const estudiante = estudiantesArray[i];
      if (estudiante.nestudiante === datos.nestudiante) {
        estudiantesArray[i].nombres = nombres;
        estudiantesArray[i].apellidos = apellidos;
        localStorage.setItem('estudiantes', JSON.stringify(estudiantesArray));
        changeEditing();
        return null;
      }
    }
    return null;
  };

  const handleNombresChange = (event: any) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event: any) => {
    setApellidos(event.target.value);
  };
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
            <Button startIcon={<EditIcon />} onClick={changeEditing}>
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
              <TextField size="small" disabled={!editing} value={nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle2" px={4}>
                Apellidos
              </Typography>
              <TextField size="small" disabled={!editing} value={apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
            </Stack>
            {editing && (
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
      {apoderados.length !== 0 && (
        apoderados.map((apoderado: IApoderado) => (
          <EditarApoderado
            key={apoderado.napoderado}
            apoderado={apoderado}
            handleUpdateApoderado={handleUpdateApoderado}
            handleEliminarApoderado={handleEliminarApoderado}
          />
        ))
      )}
    </Stack>
  );
};

export default EditarEstudiante;

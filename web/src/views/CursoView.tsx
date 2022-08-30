import {
  Box, Button, Stack, Typography, Theme,
} from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import CursoTable from '../components/CursoTable';
import estudiantesDetails from '../mock/estudiantesDetails';
import { IEstudiante } from '../types/estudiantes';

const loadEstudiantes = () => {
  //  let estudiantes = localStorage.getItem('estudiantes');
  //  if (estudiantes == null) estudiantes = '[]';
  //  let estudiantesArray : IEstudiante[] = JSON.parse(estudiantes);
  //  estudiantesArray = _.sortBy(estudiantesArray, 'apellidos');
  //  return estudiantesArray;
  const estudiantesArray: IEstudiante[] = estudiantesDetails;
  return estudiantesArray;
};

const Curso = () => {
  const [estudiantes, setEstudiantes] = useState(loadEstudiantes());
  const updateEstudiantes = () => {
    setEstudiantes(loadEstudiantes());
  };
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box display="flex" justifyContent="flex-end" sx={{ px: 4, py: 2 }}>
        <Typography variant="caption" maxWidth={300}>
          Los y las estudiantes deben escanear el código
          QR dentro de la aplicación para unirse al curso.
        </Typography>
        <Button variant="contained" startIcon={<Icon baseClassName="fas" className="fa-solid fa-qrcode" />}>Generar QR</Button>
      </Box>
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Participantes
        </Typography>
        <CursoTable rows={estudiantes} updateEstudiantes={updateEstudiantes} />
      </Box>
    </Stack>
  );
};

export default Curso;

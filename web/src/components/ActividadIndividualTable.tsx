/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box, TableHead,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
// import { useAuth } from '../hooks/useAuth';

const imgStudent = require('../assets/quiz.png');

interface IRow {
  _id: number,
  actividad: string,
  porcentaje: number
}

interface RowParams {
  row: IRow,
}

interface EditarButtonParams {
  estudiante: IEstudiante,
}

const Row = ({ row }:RowParams) => {
  const {
    _id, actividad, porcentaje,
  } = row;

  const navigate = useNavigate();

  const handleVerStats = () => {
    navigate(`/cursos/63352374912a82092e1799f9/estadisticas/actividadIndividual/${_id}`);
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{actividad}</TableCell>
      <TableCell>{porcentaje}%</TableCell>
      <TableCell>
        <Stack direction="row">
          <Button
            variant="contained"
            color="quaternary"
            onClick={handleVerStats}
            sx={{ alignSelf: 'right' }}
          >
            <Typography
              variant="button"
              color={(theme: Theme) => theme.palette.primary.contrastText}
            >
              Ver estadísticas
            </Typography>
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

interface ICursoTableParams {
  rows: IRow[],
  // updateEstudiantes: Function
}

const ActividadIndividualTable = (
  { rows }: ICursoTableParams,
) => {
  const { logout } = useAuth();

  return (
    <TableContainer
      component={Card}
      elevation={4}
      sx={{ borderRadius: '20px' }}
    >
      <Table
        sx={{ overflowX: 'scroll' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Actividad</TableCell>
            <TableCell>% del curso que completó la actividad</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ justifyContent: 'center' }}>
          {(rows.length === 0
            ? ''
            : rows.map((row) => (
              <Row
                key={row._id}
                row={row}
              />
            ))
          )}
        </TableBody>
      </Table>
      {(rows.length === 0)
        ? <SinActividades mainmsg="Sin participantes." submsg="Cuande añada participantes, estos aparecerán aquí." />
        : ''}
    </TableContainer>
  );
};

export default ActividadIndividualTable;

/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';

const imgStudent = require('../assets/webApoderados/student.png');

interface RowParams {
  row: IEstudiante,
}

const Row = ({ row }:RowParams) => {
  const {
    _id, user, curso,
  } = row;
  const { nombres, apellidos } = user;
  const navigate = useNavigate();

  const handleVerStats = () => {
    navigate(`/pupilo/${_id}/estadisticas`);
  };
  console.log(user);
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center', alignSelf: 'left',
          }}
        >
          <Box
            component="img"
            sx={{
              alignSelf: 'left',
              maxHeight: 50,
              margin: 1,
            }}
            src={imgStudent}
          />
          <Stack direction="column" sx={{ marginLeft: 1 }}>
            <Typography>
              {nombres} {apellidos}
            </Typography>
            <Typography>
              Curso: {curso.nombre}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
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
  rows: IEstudiantes,
}

const PupilosTable = (
  { rows }: ICursoTableParams,
) => (
  <TableContainer
    component={Card}
    elevation={4}
    sx={{ borderRadius: '20px' }}
  >
    <Table
      sx={{ overflowX: 'scroll' }}
      aria-label="simple table"
    >
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

export default PupilosTable;

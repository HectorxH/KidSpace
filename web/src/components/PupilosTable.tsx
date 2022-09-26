/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
// import { useAuth } from '../hooks/useAuth';

const img = require('../assets/statistics.png');

interface RowParams {
  row: IEstudiante,
}

interface EditarButtonParams {
  estudiante: IEstudiante,
}

const Row = ({ row }:RowParams) => {
  const {
    _id, user, curso,
  } = row;
  const { nombres, apellidos } = user;
  const navigate = useNavigate();

  const handleVerStats = () => {
    navigate('/pupilos');
  };
  console.log(user);
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell
        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'WhiteSmoke' } }}
        component="th"
        scope="row"
      >
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
              maxHeight: 100,
            }}
            src={img}
          />
          <Stack direction="column" sx={{ marginLeft: 1 }}>
            <Typography>
              {nombres} {apellidos}
            </Typography>
            <Typography>
              Curso: {curso}
              {/* nombre del curso please */}
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
  updateEstudiantes: Function
}

const PupilosTable = (
  { rows, updateEstudiantes }: ICursoTableParams,
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

export default PupilosTable;

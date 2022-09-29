/* eslint-disable no-nested-ternary */
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
import StarRateIcon from '@mui/icons-material/StarRate';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
// import { useAuth } from '../hooks/useAuth';

const imgStudent = require('../assets/quiz.png');

interface IRow {
  _id: number,
  lugar: number,
  nombre: string,
  actividades: number
}

interface RowParams {
  row: IRow,
}

interface EditarButtonParams {
  estudiante: IEstudiante,
}

const Row = ({ row }:RowParams) => {
  const {
    _id, lugar, nombre, actividades,
  } = row;

  const navigate = useNavigate();

  const handleVerStats = () => {
    navigate(`/${_id}/estadisticasEstudiante`);
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Stack direction="row" spacing={1} sx={{ alignContent: 'center' }}>
          <StarRateIcon sx={{
            color: lugar === 1
              ? '#F2C144'
              : lugar === 2
                ? '#C1C1C1'
                : lugar === 3
                  ? '#DF8366'
                  : null,
            opacity: lugar > 3 ? 0 : 1,
          }}

          />
          <Stack direction="column" spacing={1} sx={{ justifyContent: 'center' }}>
            {lugar}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>{nombre}</TableCell>
      <TableCell>{actividades}</TableCell>
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

const RankingTable = (
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
            <TableCell>Lugar</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Actividades completadas</TableCell>
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

export default RankingTable;

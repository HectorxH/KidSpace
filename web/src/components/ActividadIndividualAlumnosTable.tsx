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
  nombre: string,
  estado: string,
  tiempo: string,
}

interface RowParams {
  row: IRow,
}

const Row = ({ row }:RowParams) => {
  const {
    _id, nombre, estado, tiempo,
  } = row;

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{nombre}</TableCell>
      <TableCell>
        <Typography sx={{ color: estado === 'Completada' ? '#A1C96A' : '#EA6A6A' }}>
          {estado}
        </Typography>
      </TableCell>
      <TableCell>{tiempo}</TableCell>
    </TableRow>
  );
};

interface ICursoTableParams {
  rows: IRow[],
}

const ActividadIndividualAlumnosTable = (
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
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Tiempo</TableCell>
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

export default ActividadIndividualAlumnosTable;

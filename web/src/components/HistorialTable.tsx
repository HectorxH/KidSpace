/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Table, TableBody,
  TableCell, TableHead, TableRow, Stack, Card,
} from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment-timezone';
import SinActividades from './SinActividades';
import { useAuth } from '../hooks/useAuth';

interface IHistorial {
  titulo: string,
  tipo: string,
  fecha: string,
}
interface RowParams {
  row: IHistorial,
}
type IHistorials = IHistorial[]

const Row = ({ row }:RowParams) => {
  const {
    titulo, tipo, fecha,
  } = row;
  // const navigate = useNavigate();

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        {titulo}
      </TableCell>
      <TableCell>{tipo}</TableCell>
      <TableCell>{moment(fecha).format('DD/MM/YYYY')}</TableCell>
    </TableRow>
  );
};

const HistorialTable = (
  { rows }: { rows: IHistorials },
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
            <TableCell>Tipo de Actividad</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ justifyContent: 'center' }}>
          {(rows.length === 0
            ? <TableRow />
            : rows.map((row) => (
              <Row
                key={row.fecha}
                row={row}
              />
            ))
          )}
        </TableBody>
      </Table>
      {(rows.length === 0)
        ? <SinActividades mainmsg="Sin actividades Realizadas." submsg="Este pupilo no ha realizado niguna actividad todavía." />
        : ''}
    </TableContainer>
  );
};

export default HistorialTable;

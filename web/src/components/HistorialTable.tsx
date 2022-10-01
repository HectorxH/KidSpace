/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Table, TableBody,
  TableCell, TableHead, TableRow, Card,
} from '@mui/material';
import React from 'react';
import moment from 'moment-timezone';
import SinActividades from './SinActividades';
import { IActividadLog, IActividadLogs } from '../types/actividadLog';

const Row = ({ row }:{row: IActividadLog}) => {
  const {
    actividad, tipo, fecha,
  } = row;
  // const navigate = useNavigate();

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        {actividad}
      </TableCell>
      <TableCell>{tipo}</TableCell>
      <TableCell>{moment(fecha).format('DD/MM/YYYY')}</TableCell>
    </TableRow>
  );
};

const HistorialTable = (
  { rows }: { rows: IActividadLogs },
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
              key={String(row.fecha)}
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

export default HistorialTable;

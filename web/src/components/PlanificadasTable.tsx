import {
  Card, Button, Table, TableBody, Theme,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import React from 'react';
import { IPlanificadas } from '../types/planificadas';

const PlanificadasTable = ({ rows }: { rows: IPlanificadas }) => (
  <TableContainer component={Card} elevation={4} sx={{ borderRadius: '20px' }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Actividad</TableCell>
          <TableCell>Curso</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Acción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.actividad}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.actividad}
            </TableCell>
            <TableCell>{row.curso}</TableCell>
            <TableCell>{row.fecha}</TableCell>
            <TableCell>
              <Button
                color="quaternary"
                variant="contained"
              >
                <Typography
                  variant="button"
                  sx={{
                    color: (theme: Theme) => theme.palette.primary.contrastText,
                  }}
                >
                  Iniciar
                </Typography>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PlanificadasTable;

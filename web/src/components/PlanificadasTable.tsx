import {
  Card, Button, Table, TableBody, Theme,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import actividadesDetails from '../mock/actividadesDetails';
import { IPlanificada, IPlanificadas } from '../types/planificadas';

interface RowParams {
  row: IPlanificada
}

const Row = ({ row }:RowParams) => {
  const {
    nactividad, nunidad, curso, fecha,
  } = row;
  const actividad = _.find(actividadesDetails, { nactividad });
  const navigate = useNavigate();
  return (
    <TableRow
      key={nactividad}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'WhiteSmoke' } }}
        component="th"
        scope="row"
        onClick={() => navigate(`/actividades/unidad/${nunidad}/actividad/${nactividad}`)}
      >
        {actividad?.titulo}
      </TableCell>
      <TableCell>{curso}</TableCell>
      <TableCell>{fecha}</TableCell>
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
  );
};

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
          <Row row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PlanificadasTable;

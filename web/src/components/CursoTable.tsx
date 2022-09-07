import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableHead, TableRow, Stack, Card,
  Typography, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import estudiantesDetails from '../mock/estudiantesDetails';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';

interface RowParams {
  row: IEstudiante,
  eliminarAsignacion: Function,
}

interface EditarButtonParams {
  estudiante: IEstudiante,
  eliminarAsignacion: Function,
}

const EliminarButton = ({ estudiante, eliminarAsignacion }
  :EditarButtonParams) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminarStudent = () => {
    eliminarAsignacion(estudiante);
    handleCloseDialog();
  };

  const handleClickActive = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickActive}
        sx={{
          backgroundColor: '#EA6A6A',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#f9b3b3',
            color: '#FFFFFF',
          },
        }}

      >
        <Typography
          variant="button"
        >
          Eliminar
        </Typography>
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirme la acción
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Desea eliminar a {estudiante.nombres} {estudiante.apellidos}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: '#EA6A6A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#f9b3b3',
                color: '#FFFFFF',
              },
            }}
            variant="contained"
            onClick={handleEliminarStudent}
          >Eliminar
          </Button>
          <Button sx={{ backgroundColor: '#F1F3F8' }} variant="contained" onClick={handleCloseDialog}>
            <Typography
              variant="button"
              sx={{ color: '#929292' }}
            >
              Cancelar
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Row = ({ row, eliminarAsignacion }:RowParams) => {
  const {
    nestudiante, curso, nombres, apellidos,
  } = row;
  const estudiante = _.find(estudiantesDetails, { nestudiante });
  if (estudiante === undefined) {
    eliminarAsignacion(row);
    return null;
  }
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/cursos/${curso}/${nestudiante}`);
  };

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'WhiteSmoke' } }}
        component="th"
        scope="row"
      >
        {apellidos}
      </TableCell>
      <TableCell>{nombres}</TableCell>
      <TableCell>
        <Stack direction="row">
          <EliminarButton
            estudiante={row}
            eliminarAsignacion={eliminarAsignacion}
          />
          <Button
            variant="contained"
            onClick={handleEditClick}
            sx={{
              marginLeft: '1vw',
              backgroundColor: '#5C9DEC',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#c0d5ed',
                color: '#FFFFFF',
              },
            }}
          >
            <Typography
              variant="button"
              color={(theme: Theme) => theme.palette.info.contrastText}
            >
              Editar
            </Typography>
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

const CursoTable = (
  { rows, updateEstudiantes }: { rows: IEstudiantes, updateEstudiantes: Function },
) => {
  const eliminarAsignacion = (estudiante: IEstudiante) => {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    _.remove(estudiantes, estudiante);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    updateEstudiantes();
  };

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
            <TableCell>Apellidos</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ justifyContent: 'center' }}>
          {(rows.length === 0
            ? ''
            : rows.map((row) => (
              <Row
                key={row.nestudiante}
                row={row}
                eliminarAsignacion={eliminarAsignacion}
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

export default CursoTable;

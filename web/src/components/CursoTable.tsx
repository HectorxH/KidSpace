/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableHead, TableRow, Stack, Card,
  Typography, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
import { useAuth } from '../hooks/useAuth';

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
          sx={{
            color: (theme: Theme) => theme.palette.extra.main,
          }}
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
            ¿Desea eliminar a {estudiante.user.nombres} {estudiante.user.apellidos}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: '#EA6A6A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#f9b3b3',
              },
            }}
            variant="contained"
            onClick={handleEliminarStudent}
          >
            <Typography
              sx={{
                color: (theme: Theme) => theme.palette.extra.main,
              }}
            >
              Eliminar
            </Typography>
          </Button>
          <Button
            color="extra"
            variant="contained"
            onClick={handleCloseDialog}
          >
            <Typography
              sx={{
                color: (theme: Theme) => theme.palette.textcol.main,
              }}
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
    _id, user, curso,
  } = row;
  const { nombres, apellidos } = user;
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/cursos/${curso}/${_id}`);
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

interface ICursoTableParams {
  rows: IEstudiantes,
  updateEstudiantes: Function
}

const CursoTable = (
  { rows, updateEstudiantes }: ICursoTableParams,
) => {
  const { logout } = useAuth();
  const eliminarAsignacion = async (estudiante: IEstudiante) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Estudiante/${estudiante._id}`);
      console.log(res);
      updateEstudiantes();
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
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
                key={row._id}
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

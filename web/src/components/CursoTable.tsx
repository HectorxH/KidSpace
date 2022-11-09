/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Button, Theme,
  TableCell, TableRow, Stack,
  Typography, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Box,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

interface ICursoTableParams {
  rows: IEstudiantes,
  updateEstudiantes: Function
}

const CursoTable = (
  { rows, updateEstudiantes }: ICursoTableParams,
) => {
  const navigate = useNavigate();
  console.log(rows);
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
  const cols: GridColDef[] = [
    {
      field: 'apellidos',
      width: 250,
      headerName: 'Apellidos',
      renderCell: ({ row }) => row.user.apellidos,
    },
    {
      field: 'nombres',
      width: 250,
      headerName: 'Nombres',
      renderCell: ({ row }) => row.user.nombres,
    },
    {
      field: 'accion',
      headerName: 'Acción',
      width: 300,
      sortable: false,
      renderCell: ({ row }) => {
        const handleEditClick = (curso: string, _id: string) => {
          navigate(`/cursos/${curso}/${_id}`);
        };
        return (
          <div>
            <Stack direction="row">
              <EliminarButton
                estudiante={row}
                eliminarAsignacion={eliminarAsignacion}
              />
              <Button
                variant="contained"
                onClick={() => handleEditClick(row.curso, row._id)}
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
          </div>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {(rows.length === 0) ? <SinActividades mainmsg="Sin participantes." submsg="Cuande hayan participantes, estos aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 60}
            autoHeight
            hideFooter
            columns={cols}
            rows={rows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            sx={{
              borderRadius: 5, paddingLeft: 3, paddingRight: 3,
            }}
          />
        )}
    </Box>
  );
};

export default CursoTable;

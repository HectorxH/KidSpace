/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Button, Theme, Stack,
  Typography, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Box, Card,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import SinActividades from '../../components/SinActividades';
import { IEstudiante, IEstudiantes } from '../../types/estudiantes';
import { useAuth } from '../../hooks/useAuth';

interface IProfesores {
  _id: string,
  nombres: string,
  apellidos: string,
  email: string,
}

interface EditarButtonParams {
  profesor: IProfesores,
  eliminarAsignacion: Function,
}

const EliminarButton = ({ profesor, eliminarAsignacion }
  :EditarButtonParams) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminarProfesor = () => {
    eliminarAsignacion(profesor);
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
            ¿Desea eliminar a {profesor.nombres} {profesor.apellidos}?
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
            onClick={handleEliminarProfesor}
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
  rows: IProfesores[],
  updateProfesores: Function
}

const ProfesoresTable = (
  { rows, updateProfesores }: ICursoTableParams,
) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const eliminarAsignacion = async (estudiante: IEstudiante) => {
    //
  };
  const cols: GridColDef[] = [
    {
      field: 'apellidos',
      flex: 1,
      minWidth: 200,
      headerName: 'Apellidos',
      renderCell: ({ row }) => row.apellidos,
    },
    {
      field: 'nombres',
      flex: 1,
      minWidth: 200,
      headerName: 'Nombres',
      renderCell: ({ row }) => row.nombres,
    },
    {
      field: 'email',
      flex: 1,
      minWidth: 300,
      headerName: 'Email',
      renderCell: ({ row }) => row.email,
    },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: ({ row }) => {
        const handleEditClick = (_id: string) => {
          navigate(`/profesores/${_id}/editar`);
        };
        return (
          <div>
            <Stack direction="row">
              <EliminarButton
                profesor={row}
                eliminarAsignacion={eliminarAsignacion}
              />
              <Button
                variant="contained"
                onClick={() => handleEditClick(row._id)}
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
      {(rows.length === 0)
        ? (
          <Stack>
            <Card sx={{ borderRadius: 5 }} elevation={4}>
              <SinActividades mainmsg="No hay profesores inscritos." submsg="Aún no has inscrito un profesor o profesora" />
            </Card>
          </Stack>
        )
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

export default ProfesoresTable;

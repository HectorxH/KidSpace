import {
  TableContainer, Button, Table, TableBody, Theme, IconButton,
  TableCell, TableHead, TableRow, Stack, Card,
  Typography, ClickAwayListener, Tooltip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
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

const EditarButton = ({ estudiante, eliminarAsignacion }
  :EditarButtonParams) => {
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditStudent = async () => {
    try {
      console.log('editar');
    } catch (e) {
      console.log(e);
    }
    setOpenDialog(false);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  const handleClickActive = () => {
    setOpenDialog(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={openTooltip}
        disableFocusListener
        disableTouchListener
        title="No se puede iniciar hasta la fecha programada"
        placement="bottom"
        arrow
      >
        <div>
          <Button
            color="quaternary"
            variant="contained"
            onClick={handleClickActive}
          >
            <Typography
              variant="button"
              color={(theme: Theme) => theme.palette.primary.contrastText}
            >
              Iniciar
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
                ¿Desea iniciar iniciar la actividad seleccionada?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="warning" onClick={handleCloseDialog}>Cancelar</Button>
              <Button color="quaternary" onClick={handleEditStudent}>Iniciar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Tooltip>
    </ClickAwayListener>
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
          <EditarButton
            estudiante={row}
            eliminarAsignacion={eliminarAsignacion}
          />
          <IconButton
            color="warning"
            onClick={() => eliminarAsignacion({
              nestudiante, curso, nombres, apellidos,
            })}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

const CursoTable = (
  { rows, updateEstudiantes }: { rows: IEstudiantes, updateEstudiantes: Function },
) => {
  const eliminarAsignacion = (estudiante: IEstudiante) => {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '');
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
        ? <SinActividades mainmsg="Sin actividades planificadas." submsg="Cuande asigne una actividad, esta aparecerá aquí." />
        : ''}
    </TableContainer>

  );
};

export default CursoTable;

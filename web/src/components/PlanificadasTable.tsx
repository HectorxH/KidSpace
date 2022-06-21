import {
  TableContainer, Button, Table, TableBody, Theme, IconButton,
  TableCell, TableHead, TableRow, Stack, Card,
  Typography, ClickAwayListener, Tooltip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import actividadesDetails from '../mock/actividadesDetails';
import { IPlanificada, IPlanificadas } from '../types/planificadas';
import SinActividades from './SinActividades';
import { IActividadDetail } from '../types/actividad';

interface RowParams {
  row: IPlanificada,
  eliminarAsignacion: Function,
}

interface IniciarButtonParams {
  planificada: IPlanificada,
  actividad: IActividadDetail,
  eliminarAsignacion: Function,
}

const IniciarButton = ({ planificada, actividad, eliminarAsignacion }
  :IniciarButtonParams) => {
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { fecha } = planificada;

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleStartActivity = async () => {
    try {
      const resp = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Activity/message`, {
        msg: actividad,
      });
      console.log(resp);
      eliminarAsignacion(planificada);
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

  const checkDisabled = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate !== fecha;
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
            color={checkDisabled() ? 'extra' : 'quaternary'}
            variant="contained"
            onClick={checkDisabled() ? handleTooltipOpen : handleClickActive}
          >
            <Typography
              variant="button"
              color={checkDisabled()
                ? (theme: Theme) => theme.palette.textcol.main
                : (theme: Theme) => theme.palette.primary.contrastText}
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
              <Button color="quaternary" onClick={handleStartActivity}>Iniciar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Tooltip>
    </ClickAwayListener>
  );
};

const Row = ({ row, eliminarAsignacion }:RowParams) => {
  const {
    nactividad, nunidad, curso, fecha,
  } = row;
  const actividad = _.find(actividadesDetails, { nactividad });
  if (actividad === undefined) {
    eliminarAsignacion(row);
    return null;
  }
  const navigate = useNavigate();

  return (
    <TableRow
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
        <Stack direction="row">
          <IniciarButton
            planificada={row}
            actividad={actividad}
            eliminarAsignacion={eliminarAsignacion}
          />
          <IconButton
            color="warning"
            onClick={() => eliminarAsignacion({
              nactividad, nunidad, curso, fecha,
            })}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

const PlanificadasTable = (
  { rows, updatePlanificadas }: { rows: IPlanificadas, updatePlanificadas: Function },
) => {
  const eliminarAsignacion = (actividadPlanificada: IPlanificada) => {
    const planificadas = JSON.parse(localStorage.getItem('planificadas') || '');
    _.remove(planificadas, actividadPlanificada);
    localStorage.setItem('planificadas', JSON.stringify(planificadas));
    updatePlanificadas();
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
            <TableCell>Actividad</TableCell>
            <TableCell>Curso</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ justifyContent: 'center' }}>
          {(rows.length === 0
            ? ''
            : rows.map((row) => (
              <Row
                key={row.nactividad}
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

export default PlanificadasTable;

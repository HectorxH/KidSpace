/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme, IconButton,
  TableCell, TableHead, TableRow, Stack, Card,
  Typography, ClickAwayListener, Tooltip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import moment from 'moment-timezone';
import actividadesDetails from '../mock/actividadesDetails';
import { IPlanificada, IPlanificadas } from '../types/planificadas';
import SinActividades from './SinActividades';
import { IActividadDetail } from '../types/actividad';
import { useAuth } from '../hooks/useAuth';

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
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const fecha = moment(planificada.fecha);

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
        curso: planificada.curso._id,
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
    const currentDate = moment();
    return !fecha.isSame(currentDate, 'day');
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
  const actividad = _.find(actividadesDetails, { nactividad, nunidad });
  if (actividad === undefined) {
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
      <TableCell>{curso.nombre}</TableCell>
      <TableCell>{moment(fecha).format('DD/MM/YYYY')}</TableCell>
      <TableCell>
        <Stack direction="row">
          <IniciarButton
            planificada={row}
            actividad={actividad}
            eliminarAsignacion={eliminarAsignacion}
          />
          <IconButton
            color="warning"
            onClick={() => eliminarAsignacion(row)}
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
  const { logout } = useAuth();
  const eliminarAsignacion = async (actividadPlanificada: IPlanificada) => {
    try {
      console.log(actividadPlanificada);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Profesor/planificadas`, { del: true, ...actividadPlanificada });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
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
            ? <TableRow />
            : rows.map((row) => (
              <Row
                key={row.fecha}
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

import {
  Card, Button, Table, TableBody, Theme, IconButton,
  TableCell, TableContainer, TableHead, TableRow, Stack,
  Typography, ClickAwayListener, Tooltip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import actividadesDetails from '../mock/actividadesDetails';
import { IPlanificada, IPlanificadas } from '../types/planificadas';
import SinActividades from './SinActividades';

interface RowParams {
  row: IPlanificada,
  eliminarAsignacion: Function,
}

interface IniciarButtonParams {
  fecha: string
}

const IniciarButton = ({ fecha }:IniciarButtonParams) => {
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };
  const handleCloseDialog = () => {
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
              <Button color="quaternary" onClick={handleCloseDialog}>Iniciar</Button>
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
        <Stack direction="row">
          <IniciarButton fecha={fecha} />
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
  const eliminarAsignacion = ({
    nactividad, nunidad, curso, fecha,
  }: IPlanificada) => {
    const planificadas = JSON.parse(localStorage.getItem('planificadas') || '');
    const filtered = planificadas.filter(
      (i: IPlanificada) => i.nactividad !== nactividad
      || i.nunidad !== nunidad || i.curso !== curso || i.fecha !== fecha,
    );
    localStorage.setItem('planificadas', JSON.stringify(filtered));
    updatePlanificadas();
  };
  return (
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
        <TableBody sx={{ justifyContent: 'center' }}>
          {(rows.length === 0
            ? ''
            : rows.map((row) => (<Row row={row} eliminarAsignacion={eliminarAsignacion} />))
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

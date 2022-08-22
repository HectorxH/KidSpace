import {
  Box, Button, MenuItem,
  TextField, Typography, Theme, Stack,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import moment from 'moment-timezone';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import NotFoundView from './NotFoundView';
import { IPlanificada } from '../types/planificadas';

const AsignarView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { nunidad, nactividad } = params;
  if (typeof nunidad === 'undefined') return <NotFoundView />;
  if (typeof nactividad === 'undefined') return <NotFoundView />;
  const currentDate = new Date().toISOString().slice(0, 10);
  const [curso, setCurso] = React.useState('A');
  const [fecha, setFecha] = React.useState(currentDate);
  const [fecha2, setFecha2] = React.useState(currentDate);
  const [success, setSuccess] = React.useState(false);
  const handleFecha = (e : any) => {
    const date = moment(e).format('DD-MM-YYYY');
    setFecha(date);
    setFecha2(e);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit : React.FormEventHandler = (e) => {
    e.preventDefault();
    const asignacion : IPlanificada = {
      nactividad, nunidad, curso, fecha,
    };

    let asignadas = localStorage.getItem('planificadas');
    if (asignadas === null) asignadas = '[]';

    const asignadasArray : IPlanificada[] = JSON.parse(asignadas);
    asignadasArray.push(asignacion);

    localStorage.setItem('planificadas', JSON.stringify(asignadasArray));
    setSuccess(true);
    setTimeout(handleBack, 1200);
  };

  return (
    <Box sx={{
      px: 4, py: 2, mt: 2, width: { sx: '100%', md: '70%' },
    }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">
          Nueva asignación
        </Typography>
        <Stack spacing={{ xs: 4, sm: 1 }} sx={{ mt: '40px' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione un curso:
            </Typography>
            <TextField
              select
              id="select-curso"
              sx={{ minWidth: '270px' }}
              label="Curso"
              defaultValue=""
              onChange={(e) => setCurso(e.target.value)}
              required
            >
              <MenuItem value="A">A</MenuItem>
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione la fecha:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Fecha"
                inputFormat="dd/MM/yyyy"
                disablePast
                value={fecha2}
                onChange={handleFecha}
                renderInput={(props) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...props}
                    sx={{ my: 2, minWidth: '270px' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                )}
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button
              color="extra"
              variant="contained"
              onClick={handleBack}
            >
              <Typography
                variant="button"
                sx={{
                  color: (theme: Theme) => theme.palette.textcol.main,
                }}
              >
                Cancelar
              </Typography>
            </Button>
            <Stack direction="row">
              <Box justifyContent="center" flexDirection="column" display="flex" ml={3}>
                {success ? <CheckCircleOutlineIcon color="success" /> : <div />}
              </Box>
              <Button
                color="quaternary"
                variant="contained"
                type="submit"
              >
                <Typography
                  variant="button"
                  sx={{
                    color: (theme: Theme) => theme.palette.primary.contrastText,
                  }}
                >
                  Guardar
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AsignarView;

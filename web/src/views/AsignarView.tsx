import {
  Box, Button, MenuItem,
  TextField, Typography, Theme, Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import es from 'date-fns/locale/es';
import NotFoundView from './NotFoundView';
import { useAuth } from '../hooks/useAuth';
import { ICursos } from '../types/cursos';

const AsignarView = () => {
  const navigate = useNavigate();
  const params = useParams();
  if (typeof params.nunidad === 'undefined') return <NotFoundView />;
  if (typeof params.nactividad === 'undefined') return <NotFoundView />;
  const nunidad = Number(params.nunidad);
  const nactividad = Number(params.nactividad);

  const { logout } = useAuth();

  const currentDate = new Date().toISOString().slice(0, 10);
  const [curso, setCurso] = useState('');
  const [cursos, setCursos] = useState<ICursos>([]);
  const [fecha, setFecha] = useState(currentDate);
  const [fechaShow, setFechaShow] = useState(currentDate);
  const [success, setSuccess] = useState(false);
  const handleFecha = (e : any) => {
    setFecha(e);
    setFechaShow(e);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit : React.FormEventHandler = async (e) => {
    e.preventDefault();
    const req = {
      nactividad, nunidad, curso, fecha, del: false,
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Profesor/planificadas`, req);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
        logout();
      }
    }
    setSuccess(true);
    setTimeout(handleBack, 1200);
  };

  const updateCursos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso`);
      setCursos(res.data.cursos);
      console.log(res);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (cursos.length === 0) updateCursos();
  }, []);

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
              {cursos.map((nombre) => (
                <MenuItem value={nombre.nombre}>{nombre.nombre}</MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione la fecha:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
              <DesktopDatePicker
                label="Fecha"
                inputFormat="dd/MM/yyyy"
                disablePast
                value={fechaShow}
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

import {
  Box, Button,
  TextField, Typography, Theme, Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
// import { ICurso } from '../types/cursos';

const AsignarCursoView = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [success, setSuccess] = useState(false);
  const handleBack = () => {
    navigate('/cursos');
  };

  const { logout } = useAuth();

  const handleSubmit : React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/Curso`,
        { nombre },
      );
      console.log(res);

      setSuccess(true);
      setTimeout(handleBack, 1200);
    } catch (e) {
      console.log(e);
      logout();
    }
  };

  return (
    <Box sx={{
      px: 4, py: 2, mt: 2, width: { sx: '100%', md: '70%' },
    }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">
          Nuevo Curso
        </Typography>
        <Stack spacing={{ xs: 4, sm: 1 }} sx={{ mt: '40px' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione un curso:
            </Typography>
            <TextField
              id="select-curso"
              sx={{ minWidth: '270px' }}
              label="Nombre de curso"
              defaultValue={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
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

export default AsignarCursoView;

import {
  Box, Button, MenuItem,
  TextField, Typography, Theme, Stack,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ICurso } from '../types/cursos';

const AsignarCursoView = () => {
  const navigate = useNavigate();
  const [curso, setCurso] = React.useState('6');
  const [letra, setLetra] = React.useState('A');
  const [success, setSuccess] = React.useState(false);
  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit : React.FormEventHandler = (e) => {
    e.preventDefault();
    const cursoAgregado : ICurso = {
      curso, letra,
    };

    let asignadas = localStorage.getItem('cursos');
    if (asignadas === null) asignadas = '[]';

    const asignadasArray : ICurso[] = JSON.parse(asignadas);
    asignadasArray.push(cursoAgregado);

    localStorage.setItem('cursos', JSON.stringify(asignadasArray));
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
          Nuevo Curso
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
              defaultValue="6"
              onChange={(e) => setCurso(e.target.value)}
              required
            >
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
            <Typography alignSelf={{ sm: 'center' }}>
              Seleccione la letra:
            </Typography>
            <TextField
              select
              id="select-letra"
              sx={{ minWidth: '270px' }}
              label="Letra"
              defaultValue="A"
              onChange={(e) => setLetra(e.target.value)}
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="E">F</MenuItem>
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="H">H</MenuItem>
              <MenuItem value="I">I</MenuItem>
              <MenuItem value="J">J</MenuItem>
              <MenuItem value="K">K</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="N">N</MenuItem>
            </TextField>
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

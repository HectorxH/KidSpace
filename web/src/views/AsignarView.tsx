import {
  Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent,
  Grid, TextField, Typography, Theme,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import NotFoundView from './NotFoundView';

const AsignarView = () => {
  const params = useParams();
  const { nUnidad, nActividad } = params;
  if (typeof nUnidad === 'undefined') return <NotFoundView />;
  if (typeof nActividad === 'undefined') return <NotFoundView />;

  const [curso, setCurso] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setCurso(event.target.value as string);
  };

  return (
    <Box sx={{ px: 4, py: 2, mt: 2 }}>
      <Typography variant="h4">
        Nueva asignación
      </Typography>
      <Grid container spacing={1} sx={{ mt: '40px' }}>
        <Grid item xs={6} sx={{ alignSelf: 'center' }}>
          <Typography>
            Seleccione un curso:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="label-select-curso">Curso</InputLabel>
          <Select
            labelId="label-select-curso"
            id="select-curso"
            value={curso}
            sx={{ minWidth: '180px' }}
            label="Curso"
            onChange={handleChange}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} sx={{ alignSelf: 'center' }}>
          <Typography>
            Seleccione la fecha:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="date"
            label="Fecha"
            type="date"
            sx={{ my: 4, minWidth: '150px' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            color="extra"
            variant="contained"
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
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={4}>
          <Button
            color="quaternary"
            variant="contained"
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default AsignarView;

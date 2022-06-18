import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import _ from 'lodash';
import {
  Accordion, Stack, Box, Card, Theme,
  Typography, AccordionDetails, AccordionSummary, Button,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotFoundView from './NotFoundView';
import unidadesDetails from '../mock/unidadesDetails';

interface IActividad {
    numactividad: Number,
    actividad: string,
    titulo: string,
    descripcion: string,
    path: string,
}

interface ActividadParam {
  actividad: IActividad
}

const Actividad = ({ actividad }:ActividadParam) => (
  <Accordion elevation={4}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: (theme: Theme) => theme.palette.textcol.light }} />}
    >
      <Typography variant="h6" sx={{ color: (theme: Theme) => theme.palette.textcol.light }}>
        {actividad.actividad} : {actividad.titulo}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container spacing={6}>
        <Grid item sm={8}>
          <Typography>
            {actividad.descripcion}
          </Typography>
        </Grid>
        <Grid item sm={2} />
        <Grid item sm={2}>
          <Button
            component={NavLink}
            to={actividad.path}
            color="quaternary"
            variant="contained"
          >
            <Typography
              variant="button"
              sx={{
                color: (theme: Theme) => theme.palette.primary.contrastText,

              }}
            >
              Ver más información
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

const UnidadView = () => {
  const params = useParams();
  const { nUnidad } = params;

  if (typeof nUnidad === 'undefined') return (<NotFoundView />);
  const numunidad = parseInt(nUnidad, 10);

  const unidad = _.find(unidadesDetails, { numunidad });
  if (typeof unidad === 'undefined') return (<NotFoundView />);

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: (theme: Theme) => theme.palette.quaternary.main, px: 4, py: 2 }}>
        <Typography variant="h5" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Actividades {unidad.unidad}</b>
        </Typography>
      </Box>
      <Box sx={{ px: 4 }}>
        <Card
          sx={{
            p: 2,
            backgroundColor: (theme: Theme) => theme.palette.extra.main,
          }}
          elevation={0}
        >
          <Typography sx={{ color: (theme: Theme) => theme.palette.textcol.main }}>
            {unidad.descripcion}
          </Typography>
        </Card>
      </Box>
      <Stack direction="column" spacing={4} sx={{ px: 4 }}>
        {unidad.actividades.map((actividad) => <Actividad actividad={actividad} />)}
      </Stack>
    </Stack>
  );
};

export default UnidadView;

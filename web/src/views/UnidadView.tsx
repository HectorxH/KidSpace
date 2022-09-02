import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import _ from 'lodash';
import {
  Accordion, Stack, Box, Card, Theme,
  Typography, AccordionDetails, AccordionSummary, Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotFoundView from './NotFoundView';
import unidadesDetails from '../mock/unidadesDetails';

interface IActividad {
    nactividad: number,
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
        actividad : titulo
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 2, sm: 2, md: 4 }}
      >
        <Typography>
          {actividad.descripcion}
        </Typography>
        <Button
          sx={{ px: 5 }}
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
      </Stack>
    </AccordionDetails>
  </Accordion>
);

const UnidadView = () => {
  const params = useParams();
  if (typeof params.nunidad === 'undefined') return (<NotFoundView />);
  const nunidad = Number(params.nunidad);

  const unidad = _.find(unidadesDetails, { nunidad });
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
        {unidad.actividades.map((actividad) => (
          <Actividad actividad={actividad} key={actividad.nactividad} />
        ))}
      </Stack>
    </Stack>
  );
};

export default UnidadView;

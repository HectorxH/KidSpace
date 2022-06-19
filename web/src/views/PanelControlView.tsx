import {
  Box, Card, Stack, Typography,
} from '@mui/material';
import React from 'react';
import Favoritas from '../components/Favoritas';
import PlanificadasTable from '../components/PlanificadasTable';
import SinFavoritas from '../components/SinFavoritas';
import { IPlanificada } from '../types/planificadas';

const loadFavoritas = () => {
  let favs = localStorage.getItem('favs');
  if (favs === null) favs = '[]';
  const favsArray : string[] = JSON.parse(favs);
  return favsArray;
};

const loadPlanificadas = () => {
  let planificadas = localStorage.getItem('planificadas');
  if (planificadas == null) planificadas = '[]';
  const planificadasArray : IPlanificada[] = JSON.parse(planificadas);
  return planificadasArray;
};

const PanelControl = () => {
  const favoritas = loadFavoritas();
  const planificadas = loadPlanificadas();
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ px: 4, py: 2 }}>
        <Typography variant="h4">
          Actividades favoritas
        </Typography>
        <Typography>
          Actividades que guardaste recientemente:
        </Typography>
        <Card elevation={4} sx={{ my: 2, borderRadius: '20px' }}>
          {(favoritas.length === 0 ? <SinFavoritas /> : <Favoritas favoritas={favoritas} />)}
        </Card>
      </Box>
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Actividades planificadas
        </Typography>
        <PlanificadasTable rows={planificadas} />
      </Box>
    </Stack>
  );
};

export default PanelControl;

import {
  Box, Card, Stack, Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import Favoritas from '../components/Favoritas';
import PlanificadasTable from '../components/PlanificadasTable';
import SinActividades from '../components/SinActividades';
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
  let planificadasArray : IPlanificada[] = JSON.parse(planificadas);
  planificadasArray = _.sortBy(planificadasArray, 'fecha');
  return planificadasArray;
};

const PanelControl = () => {
  const favoritas = loadFavoritas();
  const [planificadas, setPlanificadas] = useState(loadPlanificadas());
  const updatePlanificadas = () => {
    setPlanificadas(loadPlanificadas());
  };
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
          {(favoritas.length === 0
            ? <SinActividades mainmsg="Sin actividades guardadas." submsg="Cuande marque una actividad como favorita, esta aparecerá aquí." />
            : <Favoritas favoritas={favoritas} />)}
        </Card>
      </Box>
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Actividades planificadas
        </Typography>
        <PlanificadasTable rows={planificadas} updatePlanificadas={updatePlanificadas} />
      </Box>
    </Stack>
  );
};

export default PanelControl;

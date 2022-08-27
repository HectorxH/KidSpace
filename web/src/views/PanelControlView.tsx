import {
  Box, Card, Stack, Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Favoritas from '../components/Favoritas';
import PlanificadasTable from '../components/PlanificadasTable';
import SinActividades from '../components/SinActividades';
import { useAuth } from '../hooks/useAuth';
import { IFavorita } from '../types/favoritas';
import { IPlanificada } from '../types/planificadas';

const PanelControl = () => {
  const [favoritas, setFavoritas] = useState<IFavorita[]>([]);
  const [planificadas, setPlanificadas] = useState<IPlanificada[]>([]);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  const updatePlanificadas = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Profesor/planificadas`);
      setPlanificadas(res.data.planificadas);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  const updateFavoritas = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Profesor/favoritas`);
      setFavoritas(res.data.favoritas);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (favoritas.length === 0) updateFavoritas();
    if (planificadas.length === 0) updatePlanificadas();
    setLoading(false);
  }, []);
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
          {!loading && (favoritas.length === 0
            ? <SinActividades mainmsg="Sin actividades guardadas." submsg="Cuande marque una actividad como favorita, esta aparecerá aquí." />
            : <Favoritas favoritas={favoritas} />)}
        </Card>
      </Box>
      <Box sx={{ px: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Actividades planificadas
        </Typography>
        {!loading
        && (<PlanificadasTable rows={planificadas} updatePlanificadas={updatePlanificadas} />)}
      </Box>
    </Stack>
  );
};

export default PanelControl;

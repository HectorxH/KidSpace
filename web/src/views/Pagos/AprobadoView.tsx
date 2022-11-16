import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import imgPipoFeliz from '../../assets/pipo_feliz.png';
import { useAuth } from '../../hooks/useAuth';

const Aprobado = () => {
  const { planId } = useParams();

  const { logout, navigateToDefault } = useAuth();

  const handleClick = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Representante/plan`, { plan: planId });
      console.log(res);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
    navigateToDefault();
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', backgroundColor: '#5c9dec' }}
    >
      <Paper
        sx={{
          px: 5, pb: 5, pt: 5,
        }}
        elevation={3}
        component={Stack}
        direction="column"
        justifyContent="center"
      >
        <Box
          component="img"
          src={imgPipoFeliz}
          alt="pipo"
          sx={{
            justifyContent: 'center',
            width: '100%',
            height: 'fit-content',
          }}
        />
        <Typography textAlign="center" sx={{ fontSize: '25px' }}>
          Su pago fue aprobado con éxito
        </Typography>
        <Button
          variant="contained"
          sx={{ m: 1, backgroundColor: '#FF8A00' }}
          onClick={() => handleClick()}
        >
          <Typography
            variant="button"
            color="white"
            textAlign="center"
          >
            Continuar a Kidspace
          </Typography>
        </Button>
      </Paper>
    </Grid>
  );
};

export default Aprobado;

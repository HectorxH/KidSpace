import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import imgPipoTriste from '../../assets/pipo_triste.png';
import { useAuth } from '../../hooks/useAuth';

const Rechazado = () => {
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
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
          src={imgPipoTriste}
          alt="pipo"
          sx={{
            justifyContent: 'center',
            width: '100%',
            height: 'fit-content',
          }}
        />
        <Typography textAlign="center" sx={{ fontSize: '25px' }}>
          Su pago fue rechazado, intentelo nuevamente.
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
            Volver a la página principal
          </Typography>
        </Button>
      </Paper>
    </Grid>
  );
};

export default Rechazado;

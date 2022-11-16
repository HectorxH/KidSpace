import React from 'react';
import {
  Grid,
  Box,
  Card,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import paquetes from '../../mock/paquetes';

const PaquetesView = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh', backgroundColor: '#5c9dec' }}
  >
    <Stack
      direction="row"
      sx={{
        justifyContent: 'center', margin: 5,
      }}
    >
      <Stack sx={{
        maxWidth: 500, alignItems: 'center',
      }}
      >
        <Typography align="center" variant="h6" sx={{ color: '#FFFFFF', margin: 1 }}>
          <b>Elige un plan</b>
        </Typography>
        <Typography sx={{ color: '#FFFFFF' }} align="center">
          Una vez que contrates una suscripción, activaremos tu cuenta.
        </Typography>
      </Stack>
    </Stack>
    <Stack
      direction="row"
      sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {paquetes.map((paquete) => {
        if (paquete.id === 3) {
          return null;
        }
        return (
          <div key={paquete.id}>
            <Card sx={{
              padding: 3, borderRadius: 5, alignItems: 'center', minWidth: 230, width: 300, margin: 1,
            }}
            >
              <Box
                component="img"
                src={paquete.img}
                alt="logo"
                sx={{
                  height: 150,
                }}
              />
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Typography sx={{ color: '#000', margin: 1 }}>
                  <b>KIDSPACE</b>
                </Typography>
                <Typography variant="h5" sx={{ color: paquete.color, margin: 1 }}>
                  <b>{paquete.title}</b>
                </Typography>
              </Stack>
              <Typography align="center" variant="h5" sx={{ color: '#000', alignSelf: 'center' }}>
                <b>{paquete.price}</b>
              </Typography>
              <Typography sx={{ color: '#000', alignSelf: 'center', margin: 1 }}>
                {paquete.cantidad}
              </Typography>
              <Button
                href={`registro/${paquete.id}`}
                sx={{
                  backgroundColor: '#FF8A00',
                  borderRadius: 4,
                  color: '#FFF',
                  textTransform: 'none',
                  width: 150,
                  margin: 1,
                  '&:hover': {
                    backgroundColor: '#ffbe82',
                    color: '#FFFFFF',
                  },
                }}
              >
                <Typography sx={{
                  color: '#FFF',
                }}
                >
                  Comenzar
                </Typography>
              </Button>
            </Card>
          </div>
        );
      })}
    </Stack>
  </Grid>
);

export default PaquetesView;

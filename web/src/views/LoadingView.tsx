import React from 'react';
import LottieView from 'lottie-react';
import { Box, Typography, Stack } from '@mui/material';
import Gatocargando from '../assets/gatocargando.json';

const CargaView = () => (
  <Stack alignItems="center" height="100%">
    <Box>
      <LottieView animationData={Gatocargando} />
    </Box>
    <Typography mt={2}>Estamos despegando...</Typography>
  </Stack>
);

export default CargaView;

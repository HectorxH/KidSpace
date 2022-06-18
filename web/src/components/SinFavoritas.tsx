import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const notfound: string = require('../assets/notfound.webp');

const SinFavoritas = () => (
  <Stack direction="column" sx={{ alignItems: 'center' }}>
    <Box
      component="img"
      sx={{
        maxHeight: { xs: 100, md: 300 },
        maxWidth: { xs: 100, md: 300 },
        alignSelf: 'center',
      }}
      alt="Registros no encontrados"
      src={notfound}
    />
    <Typography variant="h6">
      Sin actividades guardadas.
    </Typography>
    <Typography sx={{ py: 2 }}>
      Cuande marque una actividad como favorita, esta aparecerá aquí.
    </Typography>
  </Stack>
);

export default SinFavoritas;

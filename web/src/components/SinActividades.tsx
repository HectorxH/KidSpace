import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const notfound: string = require('../assets/notfound.webp');

interface NotFoundProps {
  mainmsg : string,
  submsg : string,
}

const SinActividades = ({ mainmsg, submsg }: NotFoundProps) => (
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
      {mainmsg}
    </Typography>
    <Typography sx={{ py: 2 }}>
      {submsg}
    </Typography>
  </Stack>
);

export default SinActividades;

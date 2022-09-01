import {
  Stack,
} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';

const Qr = () => (
  <Stack>
    <QRCode value={JSON.stringify({
      name: 'Nacho',
    })}
    />
  </Stack>
);

export default Qr;

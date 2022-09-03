import {
  Stack,
} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';

const Qr = () => (
  <Stack>
    <QRCode value={JSON.stringify({
      name: '6-A', // curso
    })}
    />
  </Stack>
);

export default Qr;

import {
  Stack,
} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';

const Qr = () => {
  const a = '';
  return (
    <Stack spacing={20} sx={{ mx: 'auto', width: 200, padding: 20 }}>
      <QRCode value={JSON.stringify({
        name: 'Nacho',
      })}
      />
      <QRCode value={JSON.stringify({
        name: 'Ana',
      })}
      />
    </Stack>
  );
};

export default Qr;

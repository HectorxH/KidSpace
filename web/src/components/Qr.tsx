import {
  Stack,
} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';
import { ICurso } from '../types/cursos';

interface QrParams {
  curso: ICurso
}

const Qr = ({ curso }:QrParams) => {
  const { _id } = curso;
  return (
    <Stack>
      <QRCode value={_id} />
    </Stack>
  );
};

export default Qr;

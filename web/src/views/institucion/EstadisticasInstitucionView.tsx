/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Stack, Theme, Typography, TextField,
} from '@mui/material';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import locale from 'date-fns/locale/es';

import axios from 'axios';
import NotFoundView from '../NotFoundView';
import '../../App.css';
import { useAuth } from '../../hooks/useAuth';

const img = require('../../assets/institucion.png');

const EstadisticasInstitucionView = () => {
  const user = {
    _id: 'sdfs54df6', nombres: 'nombre', apellidos: 'apellidos', institucion: 'Institucion', plan: 2,
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Stack
        direction="row"
        style={{
          width: '100%', justifyContent: 'center', height: '30vh', backgroundColor: '#F2C144', alignItems: 'center',
        }}
      >
        <Stack direction="column" spacing={2} sx={{ margin: 2, width: 4 / 5 }}>
          <Typography display="block" variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>Hola, {user?.nombres} {user?.apellidos}</b>
          </Typography>
          <Typography display="block" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>¡Te damos la bienvenida al sistema de estadísticas de Kidspace!</b>
          </Typography>
        </Stack>
        <Box
          component="img"
          sx={{
            alignSelf: 'right',
            maxHeight: '25vh',
            margin: 2,
          }}
          src={img}
        />
      </Stack>
      <Stack alignItems="center">
        <DateRangePicker
          onChange={(item: any) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          preventSnapRefocus
          calendarFocus="backwards"
          weekStartsOn={1}
          dateDisplayFormat="dd/MM/yyyy"
          locale={locale}
        />
      </Stack>
    </Stack>
  );
};

export default EstadisticasInstitucionView;

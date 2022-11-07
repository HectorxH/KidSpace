/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Stack, Theme, Typography, TextField,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

import axios from 'axios';
import NotFoundView from '../NotFoundView';
import '../../App.css';
import { useAuth } from '../../hooks/useAuth';

const img = require('../../assets/institucion.png');

function getWeeksAfter(date: Dayjs | null, amount: number) {
  return date ? date.add(amount, 'week') : undefined;
}

const EstadisticasInstitucionView = () => {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);
  const user = {
    _id: 'sdfs54df6', nombres: 'nombre', apellidos: 'apellidos', institucion: 'Institucion', plan: 2,
  };

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            disablePast
            value={value}
            maxDate={getWeeksAfter(value[0], 4)}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  {...startProps}
                  inputProps={{
                    // autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
};
export default EstadisticasInstitucionView;

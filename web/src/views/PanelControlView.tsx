import {
  Box, Card, Stack, Button, Table, TableBody, Theme,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import React from 'react';

const notfound : string = require('../assets/notfound.webp');

function createData(
  actividad: string,
  curso: string,
  fecha: string,
) {
  return {
    actividad, curso, fecha,
  };
}
const rows = [
  createData('Actividad 2: Materiales', 'C', '17-06-2022'),
];

const PanelControl = () => (
  <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
    <Box sx={{ px: 4, py: 2 }}>
      <Typography variant="h4">
        Actividades favoritas
      </Typography>
      <Typography>
        Actividades que guardaste recientemente:
      </Typography>
      <Card elevation={4} sx={{ my: 2, borderRadius: '20px' }}>
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
      </Card>
    </Box>
    <Box sx={{ px: 4 }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Actividades planificadas
      </Typography>
      <TableContainer component={Card} elevation={4} sx={{ borderRadius: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Actividad</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.actividad}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.actividad}
                </TableCell>
                <TableCell>{row.curso}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>
                  <Button
                    color="quaternary"
                    variant="contained"
                  >
                    <Typography
                      variant="button"
                      sx={{
                        color: (theme: Theme) => theme.palette.primary.contrastText,

                      }}
                    >
                      Iniciar
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Stack>
);

export default PanelControl;

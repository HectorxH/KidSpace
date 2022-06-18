import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions, CardContent, CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import unidades from '../mock/unidades';

const ActividadesPorUnidadesView = () => (
  <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
    <Box sx={{ backgroundColor: (theme: Theme) => theme.palette.tertiary.main, px: 4, py: 2 }}>
      <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
        <b>Visión por unidades</b>
      </Typography>
    </Box>
    <Box sx={{ px: 4 }}>
      <Typography>
        La asignatura de Tecnología busca que los estudiantes comprendan la relación
        del ser humano con el mundo artificial. Esta comprensión implica reconocer que
        a través de la tecnología, la humanidad ha intentado satisfacer sus necesidades
        y deseos, y solucionar sus problemas en numerosas dimensiones.
      </Typography>
    </Box>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} sx={{ px: 4, py: 2 }}>
      {unidades.map(({
        img, path, title, description,
      }) => (
        <Card sx={{ borderRadius: '20px' }}>
          <CardActionArea
            component={NavLink}
            to={path}
          >
            <CardMedia
              component="img"
              image={img}
              alt={`Imagen de ${title}`}
            />
            <CardContent>
              <Typography variant="h5">
                {title}
              </Typography>
              <Typography variant="body2">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              component={NavLink}
              to={path}
              color="quaternary"
              variant="contained"
            >
              <Typography
                variant="button"
                sx={{
                  color: (theme: Theme) => theme.palette.primary.contrastText,
                }}
              >
                Ver las actividades
              </Typography>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  </Stack>
);

export default ActividadesPorUnidadesView;

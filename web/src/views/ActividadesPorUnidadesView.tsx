import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions, CardContent, CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const unidad1Img = require('../assets/unidad1.jpg');
const unidad2Img = require('../assets/unidad2.jpg');
const unidad3Img = require('../assets/unidad3.jpg');

const unidades = [
  {
    img: unidad1Img,
    path: '/unidad1',
    title: 'Unidad 1: Registrar investigaciones y crear documentos digitales',
    description: 'Uso de software para presentaciones y hojas de cálculo. Uso de procesadores de texto, para la creación y edición de sus propios documentos digitales.',
  },
  {
    img: unidad2Img,
    path: '/unidad2',
    title: 'Unidad 2: Crear diseños innovadores de objetos tecnológicos',
    description: 'Creación de diseños innovadores de objetos o sistemas tecnológicos para aprovechar oportunidades o entregar soluciones a diversos problemas.',
  },
  {
    img: unidad3Img,
    path: '/unidad3',
    title: 'Unidad 3: Aplicación de técnicas para el diseño de productos',
    description: 'Aplicación de diversas técnicas, materiales y herramientas para la elaboración de un producto, objeto o sistema tecnológico de calidad.',
  },
];

const ActividadesPorUnidadesView = () => (
  <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
    <Box sx={{ backgroundColor: 'rgba(236, 135, 192, 0.9);', px: 4, py: 2 }}>
      <Typography variant="h4">
        Visión por unidades
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
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ px: 4 }}>
      {unidades.map(({
        img, path, title, description,
      }) => (
        <Card>
          <CardActionArea>
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
              to={`/actividades/${path}`}
              color="secondary"
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

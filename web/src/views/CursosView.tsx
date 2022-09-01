import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions, CardContent, CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { NavLink } from 'react-router-dom';
import RSize from '../utils/responsive';
import '../App.css';

const img = require('../assets/cursosimg.png');

const cursos = [
  {
    curso: '6',
    letra: 'A',
    path: '/cursos/6-A',
  },
  {
    curso: '6',
    letra: 'B',
    path: '/cursos/6-B',
  },
];

const CursosView = () => (
  <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
    <Box sx={{ backgroundColor: (theme: Theme) => theme.palette.tertiary.main, px: 4, py: 2 }}>
      <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
        <b>Cursos que dicto</b>
      </Typography>
    </Box>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} sx={{ px: 4, py: 2 }}>
      {cursos.map(({
        curso, letra, path,
      }) => (
        <Card
          sx={{
            borderRadius: '20px', alignItems: 'center',
          }}
          className="MuiCard-root"
        >
          <CardActionArea
            component={NavLink}
            to={path}
          >
            <CardMedia
              component="img"
              sx={{ height: RSize(0.3, 'h') }}
              image={img}
            />
            <CardContent>
              <Typography variant="h5">
                Curso {curso}-{letra}
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
                Acceder
              </Typography>
            </Button>
          </CardActions>
        </Card>
      ))}
      <Card
        sx={{
          borderRadius: '20px',
        }}
        className="MuiCard-root"
      >
        <CardActionArea
          component={NavLink}
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          to="/cursos/agregar"
        >
          <CardContent>
            <Typography display="block" align="center" style={{ color: '#BBBBBB' }}>
              <AddCircleIcon style={{ fontSize: 100 }} />
            </Typography>
            <Typography display="block" variant="h5" align="center" style={{ color: '#BBBBBB', justifyContent: 'center' }}>
              Agregar nuevo curso
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  </Stack>
);
export default CursosView;

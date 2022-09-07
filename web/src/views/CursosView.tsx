import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions, CardContent, CardMedia, Stack, Theme, Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useAuth } from '../hooks/useAuth';
import { ICursos } from '../types/cursos';
import img from '../assets/cursosimg.png';

const CursosView = () => {
  const [cursos, setCursos] = useState<ICursos>([]);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  const updateCursos = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso`);
      setCursos(res.data.cursos);
      console.log(res);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (cursos.length === 0) updateCursos();
    setLoading(false);
  }, []);

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: (theme: Theme) => theme.palette.tertiary.main, px: 4, py: 2 }}>
        <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
          <b>Cursos que dicto</b>
        </Typography>
      </Box>
      {!loading
        && (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} sx={{ px: 4, py: 2 }}>
          {cursos.map(({
            nombre, _id,
          }) => (
            <Card
              sx={{
                borderRadius: '20px', alignItems: 'center',
              }}
              className="MuiCard-root"
              key={_id}
            >
              <CardActionArea
                component={NavLink}
                to={`/cursos/${_id}`}
              >
                <CardMedia
                  component="img"
                  sx={{ height: '30vh' }}
                  image={img}
                />
                <CardContent>
                  <Typography variant="h5">
                    Curso {nombre}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  component={NavLink}
                  to={`/cursos/${_id}`}
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
        )}
    </Stack>
  );
};
export default CursosView;

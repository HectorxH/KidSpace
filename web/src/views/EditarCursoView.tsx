/* eslint-disable no-unused-vars */
import {
  Box, Button, MenuItem,
  TextField, Typography, Theme, Stack, CardMedia, Modal, Card,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import RSize from '../utils/responsive';
import NotFoundView from './NotFoundView';
import { ICurso } from '../types/cursos';
import { useAuth } from '../hooks/useAuth';

const img = require('../assets/cursosimg.png');

const EditarCursoView = () => {
  const params = useParams();
  const { cursoId } = params;
  const [modalVisble, setModalVisble] = useState(false);
  const navigate = useNavigate();
  const [curso, setCurso] = useState<ICurso>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');

  const { logout } = useAuth();

  const getCurso = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
      setCurso(res.data.curso);
      if (curso) setNombre(curso.nombre);
      setLoading(false);
      console.log(res.data);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModalVisble(false);
  };
  const handleOpen = () => {
    setModalVisble(true);
  };
  const handleEliminar : React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`);
      console.log(res.data);
      navigate('/cursos');
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
    }
  };
  const handleSubmit : React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/Curso/${cursoId}`,
        { nombre },
      );
      console.log(res.data);
      setSuccess(true);
      navigate(`/cursos/${cursoId}`);
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        logout();
      }
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (!curso) getCurso();
  }, []);

  if (loading) return (<Box />);
  if (!curso) return (<NotFoundView />);
  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Modal
        open={modalVisble}
        onClose={handleClose}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <Card sx={{ minWidth: '60%', padding: 4, marginTop: '30vh' }}>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
              Confirme la acción
            </Typography>
            <Typography>
              ¿Desea eliminar el curso?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Box justifyContent="center" flexDirection="column" display="flex" ml={3}>
                {success ? <CheckCircleOutlineIcon color="success" /> : <div />}
              </Box>
              <Button
                color="extra"
                variant="contained"
                onClick={handleClose}
              >
                <Typography
                  variant="button"
                  sx={{
                    color: (theme: Theme) => theme.palette.textcol.main,
                  }}
                >
                  Cancelar
                </Typography>
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={handleEliminar}
                sx={{
                  backgroundColor: '#EA6A6A', color: '#FFFFFF',
                }}
              >
                Eliminar
              </Button>
            </Stack>
          </Card>
        </Box>
      </Modal>
      <Stack direction="row" style={{ width: '100%', justifyContent: 'center' }}>
        <Box
          sx={{
            backgroundColor: '#B878EA', px: 3, py: 3, width: 1.5 / 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Typography display="block" variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
            <b>Curso: {curso.nombre}</b>
          </Typography>
        </Box>
        <CardMedia
          component="img"
          // sx={{ height: RSize(0.3, 'h'), width: 3.5 / 4 }}
          image={img}
        />
      </Stack>
      <Box sx={{
        px: 4, py: 2, mt: 2, width: { sx: '100%', md: '70%' },
      }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">
            Curso {curso.nombre}
          </Typography>
          <Stack spacing={{ xs: 4, sm: 1 }} sx={{ mt: '40px' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <Typography alignSelf={{ sm: 'center' }}>
                Nombre del curso:
              </Typography>
              <TextField
                id="select-curso"
                sx={{ minWidth: '270px' }}
                label="Nombre de curso"
                defaultValue={curso.nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ py: 3 }}>
              <Button
                variant="text"
                onClick={handleOpen}
              >
                <Typography
                  sx={{
                    color: 'red', display: 'flex', flexWrap: 'wrap', alignItems: 'center', textDecoration: 'underline',
                  }}
                >
                  <DeleteOutlineIcon />Eliminar el curso
                </Typography>
              </Button>
              <Stack direction="row" spacing={2}>
                <Box justifyContent="center" flexDirection="column" display="flex" ml={3}>
                  {success ? <CheckCircleOutlineIcon color="success" /> : <div />}
                </Box>
                <Button
                  color="extra"
                  variant="contained"
                  onClick={() => { navigate(`/cursos/${cursoId}`); }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      color: (theme: Theme) => theme.palette.textcol.main,
                    }}
                  >
                    Cancelar
                  </Typography>
                </Button>
                <Button
                  color="quaternary"
                  variant="contained"
                  type="submit"
                >
                  <Typography
                    variant="button"
                    sx={{
                      color: (theme: Theme) => theme.palette.primary.contrastText,
                    }}
                  >
                    Guardar
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default EditarCursoView;

/* eslint-disable no-unused-vars */
import {
  Box, Button, MenuItem,
  TextField, Typography, Theme, Stack, CardMedia, Modal, Card,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RSize from '../utils/responsive';
import NotFoundView from './NotFoundView';

const img = require('../assets/cursosimg.png');

const EditarCursoView = () => {
  const params = useParams();
  const { ncurso } = params;
  const [modalVisble, setModalVisble] = React.useState(false);
  if (typeof ncurso === 'undefined') return (<NotFoundView />);
  const navigate = useNavigate();
  const [curso, setCurso] = React.useState(ncurso);
  const [success, setSuccess] = React.useState(false);
  const handleClose = () => {
    setModalVisble(false);
  };
  const handleOpen = () => {
    setModalVisble(true);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handleEliminar = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };
  const handleSubmit : React.FormEventHandler = (e) => {
    e.preventDefault();
    // const cursoAgregado : ICurso = {
    //   curso, letra,
    // };

    // let asignadas = localStorage.getItem('cursos');
    // if (asignadas === null) asignadas = '[]';

    // const asignadasArray : ICurso[] = JSON.parse(asignadas);
    // asignadasArray.push(cursoAgregado);

    // localStorage.setItem('cursos', JSON.stringify(asignadasArray));
    setSuccess(true);
    // setTimeout(handleBack, 1200);
  };

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
            <b>Curso: {ncurso}</b>
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{ height: RSize(0.3, 'h'), width: 3.5 / 4 }}
          image={img}
        />
      </Stack>
      <Box sx={{
        px: 4, py: 2, mt: 2, width: { sx: '100%', md: '70%' },
      }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">
            Curso {curso}
          </Typography>
          <Stack spacing={{ xs: 4, sm: 1 }} sx={{ mt: '40px' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <Typography alignSelf={{ sm: 'center' }}>
                Nombre del curso:
              </Typography>
              <TextField
                id="select-curso"
                sx={{ minWidth: '270px' }}
                label="Curso-Letra"
                defaultValue={curso}
                onChange={(e) => setCurso(e.target.value)}
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
                  onClick={handleBack}
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

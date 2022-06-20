import {
  Box, Stack, Typography, Theme, Button, Card, Avatar,
} from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import React, { useState } from 'react';
import _ from 'lodash';
import { useParams, NavLink } from 'react-router-dom';
import NotFoundView from './NotFoundView';
import actividadesDetails from '../mock/actividadesDetails';

interface IDescripcionParte {
  num: string,
  title: string,
  descripcion: string,
  img: string,
}

interface DescripcionParteParam {
  parte: IDescripcionParte
}

const Parte = ({ parte }: DescripcionParteParam) => (
  <Card
    elevation={4}
    sx={{ backgroundColor: (theme: Theme) => theme.palette.extra.main, px: 4, py: 2 }}
  >
    <Stack
      direction={{ xs: 'column', sm: 'column', md: 'row' }}
      spacing={{ xs: 2, sm: 2, md: 4 }}
    >
      <Avatar
        sx={{
          backgroundColor: (theme: Theme) => theme.palette.tertiary.main,
          border: 'solid',
          height: '70px',
          width: '70px',
          alignSelf: 'center',
        }}
      >
        {parte.num}
      </Avatar>
      <Box sx={{ alignSelf: 'center' }}>
        <Typography variant="h5" py={1}>
          <b>{parte.title}</b>
        </Typography>
        <Typography>
          {parte.descripcion}
        </Typography>
      </Box>
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 100, md: 200 },
          maxWidth: { xs: 100, md: 200 },
          borderRadius: '20px',
          border: 'solid',
          borderColor: 'white',
          alignSelf: 'center',
        }}
        alt="Ilustración de la actividad"
        src={parte.img}
      />
    </Stack>
  </Card>
);

const DescripcionActividadView = () => {
  const params = useParams();
  const { nunidad, nactividad } = params;

  if (typeof nunidad === 'undefined') return <NotFoundView />;
  if (typeof nactividad === 'undefined') return <NotFoundView />;

  const isFav = () => {
    let favs = localStorage.getItem('favs');
    if (favs === null) favs = '[]';
    const favsArray : String[] = JSON.parse(favs);
    return favsArray.includes(nactividad);
  };

  const descripcion = _.find(actividadesDetails, { nunidad, nactividad });
  if (typeof descripcion === 'undefined') return <NotFoundView />;
  const startfav = isFav();
  const [process, setProcess] = useState({
    icon: (startfav ? <BookmarkAddedIcon /> : <BookmarkAddIcon />),
    label: (startfav ? 'En favoritos' : 'Añadir a favoritos'),
  });

  const toggleFav = () => {
    let favs = localStorage.getItem('favs');
    if (favs === null) favs = '[]';
    const favsArray : String[] = JSON.parse(favs);

    const idx = favsArray.findIndex((o) => o === nactividad);
    if (idx === -1) favsArray.push(nactividad);
    else favsArray.splice(idx, 1);

    localStorage.setItem('favs', JSON.stringify(favsArray));
  };

  const handleClick = () => {
    setProcess({ icon: <RotateLeftIcon />, label: (isFav() ? 'Eliminando...' : 'Guardando...') });
    toggleFav();
    const fav = isFav();
    setTimeout(() => {
      setProcess({
        icon: (fav ? <BookmarkAddedIcon /> : <BookmarkAddIcon />),
        label: (fav ? 'En favoritos' : 'Añadir en favoritos'),
      });
    }, 1200);
  };

  return (
    <Stack direction="column" spacing={2} sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: (theme: Theme) => theme.palette.quaternary.main, px: 4, py: 5 }}>
        <Stack direction="row" spacing={4}>
          <Box>
            <Typography variant="h4" sx={{ color: (theme: Theme) => theme.palette.primary.contrastText, py: 5 }}>
              {descripcion.titulo}
            </Typography>
            <Typography sx={{ color: (theme: Theme) => theme.palette.primary.contrastText }}>
              {descripcion.descripcion}
            </Typography>
          </Box>
          <Box
            component="img"
            sx={{
              maxHeight: { xs: 80, md: 250, xl: 350 },
              maxWidth: { xs: 80, md: 250, xl: 350 },
              borderRadius: '20px',
              border: 'solid',
              borderColor: 'white',
              alignSelf: 'center',
            }}
            alt="Ilustración de la actividad"
            src={descripcion.portada}
          />
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={process.icon}
          onClick={handleClick}
        >
          {process.label}
        </Button>
        <Button
          component={NavLink}
          to={descripcion.pathAsignar}
          color="secondary"
          variant="contained"
          sx={{ margin: 2 }}
        >
          <Typography
            variant="button"
            sx={{
              color: (theme: Theme) => theme.palette.primary.contrastText,
            }}
          >
            Asignar
          </Typography>
        </Button>
      </Box>
      <Stack direction="column" spacing={4} sx={{ px: 4 }}>
        <Parte parte={{
          num: '1', title: 'Cuento introductorio', descripcion: descripcion.cuento1, img: descripcion.img1,
        }}
        />
        <Parte parte={{
          num: '2', title: 'Desafío introductorio', descripcion: descripcion.desafio1, img: descripcion.img2,
        }}
        />
        <Parte parte={{
          num: '3', title: 'Cuento interactivo', descripcion: descripcion.cuento2, img: descripcion.img3,
        }}
        />
        <Parte parte={{
          num: '4', title: 'Desafío creativo', descripcion: descripcion.desafio2, img: descripcion.img4,
        }}
        />
        <Parte parte={{
          num: '5', title: 'Quiz de evaluación', descripcion: descripcion.quiz, img: descripcion.img5,
        }}
        />
      </Stack>
    </Stack>
  );
};

export default DescripcionActividadView;

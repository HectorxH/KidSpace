import {
  Box, Stack, Typography, Theme, Button, Card, Avatar,
} from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import NotFoundView from './NotFoundView';
import actividadesDetails from '../mock/actividadesDetails';
import { useAuth } from '../hooks/useAuth';

interface IDescripcionParte {
  num: number,
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

interface IFavoritasRes {
  data: {
    favoritas: [{nunidad: number, nactividad: number}]
  }
}

const DescripcionActividadView = () => {
  const params = useParams();
  const { user, logout } = useAuth();

  if (typeof params.nunidad === 'undefined') return <NotFoundView />;
  if (typeof params.nactividad === 'undefined') return <NotFoundView />;

  const nunidad = Number(params.nunidad);
  const nactividad = Number(params.nactividad);

  const isFav = async () => {
    try {
      const res: IFavoritasRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Profesor/favoritas`);
      const { favoritas } = res.data;
      return _.findIndex(
        favoritas,
        (o) => o.nunidad === nunidad && o.nactividad === nactividad,
      ) > -1;
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
      return false;
    }
  };

  const descripcion = _.find(actividadesDetails, { nunidad, nactividad });
  if (typeof descripcion === 'undefined') return <NotFoundView />;
  const [favorita, setFavorita] = useState<string>('cargando');

  const getFavoritaInfo = (info: string) => {
    let icon;
    let label;
    if (info === 'cargando') {
      icon = <RotateLeftIcon />;
      label = 'Cargando...';
    } else if (info === 'favorita') {
      icon = <BookmarkAddedIcon />;
      label = 'En favoritos';
    } else if (info === 'no favorita') {
      icon = <BookmarkAddIcon />;
      label = 'Añadir a favoritos';
    } else if (info === 'eliminando') {
      icon = <RotateLeftIcon />;
      label = 'Eliminando...';
    } else if (info === 'guardando') {
      icon = <RotateLeftIcon />;
      label = 'Guardando...';
    }
    return { icon, label };
  };

  useEffect(() => {
    const setFavoritaState = async () => {
      try {
        const fav = await isFav();
        setFavorita(fav ? 'favorita' : 'no favorita');
      } catch (e) {
        console.log(e);
      }
    };
    if (favorita === 'cargando') {
      setFavoritaState();
    }
  }, []);

  const changeFav = async (fav: boolean) => {
    try {
      const req = { nunidad, nactividad, del: fav };
      const res: IFavoritasRes = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Profesor/favoritas`, req);
      return _.findIndex(
        res.data.favoritas,
        (o) => o.nunidad === nunidad && o.nactividad === nactividad,
      ) > -1;
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
        logout();
      }
      return false;
    }
  };

  const handleClick = async () => {
    let fav = await isFav();
    setFavorita(fav ? 'eliminando' : 'guardando');
    fav = await changeFav(fav);
    setTimeout(() => {
      setFavorita(fav ? 'favorita' : 'no favorita');
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
      {user && (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={getFavoritaInfo(favorita).icon}
          onClick={handleClick}
        >
          {getFavoritaInfo(favorita).label}
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
      )}
      <Stack direction="column" spacing={4} sx={{ px: 4 }}>
        <Parte parte={{
          num: 1, title: 'Cuento introductorio', descripcion: descripcion.cuento1, img: descripcion.img1,
        }}
        />
        <Parte parte={{
          num: 2, title: 'Desafío introductorio', descripcion: descripcion.desafio1, img: descripcion.img2,
        }}
        />
        <Parte parte={{
          num: 3, title: 'Cuento interactivo', descripcion: descripcion.cuento2, img: descripcion.img3,
        }}
        />
        <Parte parte={{
          num: 4, title: 'Desafío creativo', descripcion: descripcion.desafio2, img: descripcion.img4,
        }}
        />
        <Parte parte={{
          num: 5, title: 'Quiz de evaluación', descripcion: descripcion.quiz, img: descripcion.img5,
        }}
        />
      </Stack>
    </Stack>
  );
};

export default DescripcionActividadView;

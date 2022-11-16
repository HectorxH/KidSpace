import React, { useState } from 'react';
import {
  AppBar, Button, Stack, Theme, Typography,
  Toolbar, Box, MenuItem,
  Menu, Container, IconButton, Card,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { faGamepad, faFaceSmile, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player/youtube';
import paquetes from '../mock/paquetes';
import features from '../mock/features';

const imgLogo = require('../assets/logo-horizontal.png');
const imgLanding = require('../assets/landing.png');

const pages = ['Iniciar Sesión', 'Registro'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FFF',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box
            component="img"
            src={imgLogo}
            alt="logo"
            sx={{
              height: 70,
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                mx: 2,
                backgroundColor: '#FFF',
                textTransform: 'none',
                borderRadius: 5,
                display: 'block',
                minWidth: 150,
                alignSelf: 'center',
              }}
              href="login"
            >
              <Typography sx={{ textAlign: 'center' }}>
                Iniciar Sesión
              </Typography>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                borderRadius: 5,
                color: (theme: Theme) => theme.palette.primary.contrastText,
                textTransform: 'none',
                minWidth: 150,
                alignSelf: 'center',
                display: 'block',
                '&:hover': {
                  backgroundColor: '#ffbe82',
                  color: '#FFFFFF',
                },
              }}
              href="registro"
            >
              <Typography sx={{
                color: '#FFF',
                textAlign: 'center',
              }}
              >
                Registrarme
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const LandingView = () => {
  const [winWidth] = useState<number>(window.innerWidth);
  return (
    <>
      <ResponsiveAppBar />
      <Stack sx={{ py: 6 }}>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap' }}
        >
          <Stack spacing={3} sx={{ width: winWidth < 400 ? 1 : '40vw', margin: winWidth < 400 ? 5 : 10 }}>
            <Typography variant="h4" sx={{ color: '#000' }}>
              <b>Aplicación que enseña sobre las profesiones.
                Derribando inequidades y sesgos que determinan
                las proyecciones de los niños y las niñas.
              </b>
            </Typography>
            <Typography variant="h6" sx={{ color: '#000' }}>
              La aplicación está pensada para complementar las
              clases de Tecnología de 6to básico,
              donde por primera vez se habla sobre las profesiones.
            </Typography>
            <Button
              sx={{
                backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                borderRadius: 4,
                color: '#FFF',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#ffbe82',
                  color: '#FFFFFF',
                },
                maxWidth: 150,
              }}
              href="registro"
            >
              <Typography sx={{
                color: '#FFF',
              }}
              >
                Comenzar
              </Typography>
            </Button>
          </Stack>
          <Stack sx={{ width: winWidth < 400 ? 1 : '40vw' }}>
            <Box
              component="img"
              src={imgLanding}
              alt="logo"
              sx={{
                alignSelf: 'center',
                width: 1,
              }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ alignSelf: 'center', color: '#000', margin: 1 }}>
            <b>¿Qué ofrece Kidspace?</b>
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ margin: 5, justifyContent: 'center' }}>
          <ReactPlayer url="https://www.youtube.com/watch?v=GcYi6GShso0" />
        </Stack>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {features.map((feature, id) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={id}>
              <Card
                sx={{
                  padding: 3, borderRadius: 5, alignItems: 'center', minWidth: 230, width: 300, margin: 1, background: feature.background,
                }}
              >
                <Stack
                  sx={{
                    height: 70,
                    width: 70,
                    borderRadius: 100,
                    background: feature.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FontAwesomeIcon
                    icon={[faGamepad, faVrCardboard, faFaceSmile][id]}
                    style={{
                      color: '#FFFFFF',
                      height: 30,
                    }}
                  />
                </Stack>
                <Typography
                  align="center"
                  sx={{
                    color: '#000', margin: 1, alignSelf: 'center', fontSize: 18,
                  }}
                >
                  <b>{feature.title}</b>
                </Typography>
                <Typography align="center" sx={{ color: '#000', alignSelf: 'center' }}>
                  {feature.desc}
                </Typography>
              </Card>

            </div>
          ))}
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center', margin: 5,
          }}
        >
          <Stack sx={{
            maxWidth: 500, alignItems: 'center',
          }}
          >
            <Typography align="center" variant="h6" sx={{ color: '#000', margin: 1 }}>
              <b>Elige un plan</b>
            </Typography>
            <Typography sx={{ color: '#000' }} align="center">
              Encuentra la mejor suscripción acorde de las
              necesidadesde tu institución educacional.
              Obten acceso a la plataforma web y sistema de
              estadìsticas y generaciòn de reportes.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >

          {paquetes.map((paquete) => {
            if (paquete.id === 3) {
              return null;
            }
            return (
              <Card
                key={paquete.id}
                sx={{
                  padding: 3, borderRadius: 5, alignItems: 'center', minWidth: 230, width: 300, margin: 1,
                }}
              >
                <Box
                  component="img"
                  src={paquete.img}
                  alt="logo"
                  sx={{
                    height: 150,
                  }}
                />
                <Stack direction="row" sx={{ alignItems: 'center' }}>
                  <Typography sx={{ color: '#000', margin: 1 }}>
                    <b>KIDSPACE</b>
                  </Typography>
                  <Typography variant="h5" sx={{ color: paquete.color, margin: 1 }}>
                    <b>{paquete.title}</b>
                  </Typography>
                </Stack>
                <Typography align="center" variant="h5" sx={{ color: '#000', alignSelf: 'center' }}>
                  <b>{paquete.price}</b>
                </Typography>
                <Typography sx={{ color: '#000', alignSelf: 'center', margin: 1 }}>
                  {paquete.cantidad}
                </Typography>
                <Button
                  href="registro"
                  // onClick={() => {
                  //   window.open(paquete.url, '_self');
                  // }}
                  sx={{
                    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                    borderRadius: 4,
                    color: '#FFF',
                    textTransform: 'none',
                    width: 150,
                    margin: 1,
                    '&:hover': {
                      backgroundColor: '#ffbe82',
                      color: '#FFFFFF',
                    },
                  }}
                >
                  <Typography sx={{
                    color: '#FFF',
                  }}
                  >
                    Comenzar
                  </Typography>
                </Button>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </ >
  );
};
export default LandingView;

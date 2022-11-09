/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  AppBar, Button, Stack, Theme, Typography, Toolbar, Box, Card, SvgIcon,
} from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faFaceSmile, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player/youtube';
import PupilosTable from '../components/PupilosTable';
import { useAuth } from '../hooks/useAuth';
import { IEstudiantes } from '../types/estudiantes';
import CargaView from './LoadingView';
import NotFoundView from './NotFoundView';
import App from '../App';
import paquetes from '../mock/paquetes';
import features from '../mock/features';

const imgLogo = require('../assets/logo-horizontal.png');
const imgLanding = require('../assets/landing.png');

const LandingView = () => {
  const [estudiantes, setEstudiantes] = useState<IEstudiantes>();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#FFF',
        }}
      >
        <Stack direction="row" sx={{ width: 1 }}>
          <Toolbar sx={{ justifyContent: 'flex-start' }}>
            <Box
              component="img"
              src={imgLogo}
              alt="logo"
              sx={{
                height: 64,
              }}
            />
          </Toolbar>
          <Toolbar sx={{ justifyContent: 'flex-end' }}>

            <Button sx={{
              backgroundColor: '#FFF', borderRadius: 5, margin: 2, textTransform: 'none', alignSelf: 'center',
            }}
            >
              <Typography>
                Iniciar Sesión
              </Typography>
            </Button>
            <Button
              sx={{
                backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                borderRadius: 5,
                color: '#FFF',
                textTransform: 'none',
                minWidth: 150,
                alignSelf: 'center',
              }}
            >
              <Typography sx={{
                color: '#FFF',
              }}
              >
                Registrarme
              </Typography>
            </Button>
          </Toolbar>
        </Stack>
      </AppBar>
      <Stack sx={{ px: 10, py: 6 }}>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap' }}
        >
          <Stack spacing={3} sx={{ width: 'calc(50%)', minWidth: 400 }}>
            <Typography variant="h4" sx={{ color: '#000' }}>
              <b>Aplicación que enseña sobre las profesiones.
                Derribando inequidades y sesgos que determinan
                las proyecciones de los niños y las niñas.
              </b>
            </Typography>
            <Typography sx={{ color: '#000' }}>
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
                maxWidth: 150,
              }}
            >
              <Typography sx={{
                color: '#FFF',
              }}
              >
                Comenzar
              </Typography>
            </Button>
          </Stack>
          <Stack sx={{ width: 0.5, minWidth: 400 }}>
            <Box
              component="img"
              src={imgLanding}
              alt="logo"
              sx={{
                alignSelf: 'center',
                height: 400,
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
            <Card sx={{
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
                {id === 0
                  ? (
                    <FontAwesomeIcon
                      icon={faGamepad}
                      style={{
                        color: '#FFFFFF',
                        height: 30,
                      }}
                    />
                  ) : id === 1 ? (
                    <FontAwesomeIcon
                      icon={faVrCardboard}
                      style={{
                        color: '#FFFFFF',
                        height: 30,
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faFaceSmile}
                      style={{
                        color: '#FFFFFF',
                        height: 30,
                      }}
                    />
                  )}
              </Stack>
              <Typography sx={{
                color: '#000', margin: 1, alignSelf: 'center', fontSize: 18,
              }}
              >
                <b>{feature.title}</b>
              </Typography>
              <Typography align="center" sx={{ color: '#000', alignSelf: 'center' }}>
                {feature.desc}
              </Typography>
            </Card>
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
            <Typography variant="h6" sx={{ color: '#000', margin: 1 }}>
              <b>Elige un plan</b>
            </Typography>
            <Typography sx={{ color: '#000' }} align="center">
              Encuenta la mejor suscripción acorde de las
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

          {paquetes.map((paquete, id) => (
            <Card sx={{
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
              <Typography variant="h5" sx={{ color: '#000', alignSelf: 'center' }}>
                <b>{paquete.price}</b>
              </Typography>
              <Typography sx={{ color: '#000', alignSelf: 'center', margin: 1 }}>
                {paquete.cantidad}
              </Typography>
              <Button
                sx={{
                  backgroundColor: (theme: Theme) => theme.palette.secondary.main,
                  borderRadius: 4,
                  color: '#FFF',
                  textTransform: 'none',
                  width: 150,
                  margin: 1,
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
          ))}
        </Stack>
      </Stack>
    </ >
  );
};
export default LandingView;

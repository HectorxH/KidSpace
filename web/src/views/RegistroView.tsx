import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Typography,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-horizontal.png';

const RegistroView = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          nombres, apellidos, username, password, tipo: 'representante',
        },
      );
      console.log(res);
      setCorrect(true);
      setError(false);
      setTimeout(() => navigate('/login'), 1500);
    } catch (e) {
      setCorrect(false);
      setError(true);
      console.log(e);
    }
  };

  const handleNombresChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApellidos(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', backgroundColor: '#5c9dec' }}
    >
      <Paper
        sx={{
          px: 5, pb: 5, pt: 2, width: '40vw', my: 5,
        }}
        elevation={3}
      >
        <form onSubmit={handleClick}>
          <Stack spacing={4} sx={{ justifyContent: 'space-between' }}>
            <Stack alignItems="center">
              <img src={logo} alt="Logo Kidspace" width="75%" />
              <Typography variant="h5">Registrar</Typography>
            </Stack>
            <Stack spacing={2}>
              <TextField required label="Nombres" onChange={handleNombresChange} />
              <TextField required label="Apellidos" onChange={handleApellidosChange} />
              <TextField required label="Nombre de usuario" onChange={handleUsernameChange} />
              <TextField required type="password" label="Contraseña" onChange={handlePasswordChange} />
            </Stack>
            {correct && (
              <Alert severity="success">
                Usuario registrado
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                Datos invalidos
              </Alert>
            )}
            <Stack spacing={1}>
              <Button variant="contained" type="submit">Registrar</Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
              >Iniciar sesion
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default RegistroView;

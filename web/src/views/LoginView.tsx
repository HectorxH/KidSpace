import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IUser } from '../types/user';
import logo from '../assets/logo-horizontal.png';

const LoginView = () => {
  const params = useParams();
  const { planId } = params;
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [tipo, setTipo] = useState('profesor');
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post<any, {data: IUser}>(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { username, password, tipo },
      );
      if (planId) {
        login(res.data, Number(planId));
      }
      login(res.data);
      setCorrect(true);
      setError(false);
    } catch (e) {
      setCorrect(false);
      setError(true);
      console.log(e);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTipoChange = (event: SelectChangeEvent<string>) => {
    setTipo(event.target.value);
  };

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', backgroundColor: '#5c9dec' }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          sx={{
            textAlign: 'center',
            m: 2,
            p: 2,
          }}
          elevation={3}
        >
          <form onSubmit={handleClick}>
            <Stack spacing={4} sx={{ justifyContent: 'space-between' }}>
              <Stack alignItems="center">
                <img src={logo} alt="Logo Kidspace" width="60%" />
                <Typography variant="h5">Iniciar sesion</Typography>
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="select-label">Tipo de cuenta</InputLabel>
                <Select required labelId="select-label" id="select" label="Tipo de cuenta" value={tipo} onChange={handleTipoChange} sx={{ textAlign: 'start' }}>
                  <MenuItem value="profesor"><Typography>Profesor</Typography></MenuItem>
                  <MenuItem value="apoderado"><Typography>Apoderado</Typography></MenuItem>
                  <MenuItem value="representante"><Typography>Representante</Typography></MenuItem>
                </Select>
              </FormControl>
              <Stack spacing={2}>
                <TextField required label="Nombre de Usuario" onChange={handleUsernameChange} />
                <TextField required type="password" label="Contraseña" onChange={handlePasswordChange} />
              </Stack>
              {correct && (
              <Alert severity="success">
                Sesión Iniciada
              </Alert>
              )}
              {error && (
              <Alert severity="error">
                Usuario o Contraseña Incorrecta
              </Alert>
              )}
              <Stack spacing={1}>
                <Button type="submit" variant="contained">Iniciar sesion</Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (planId) navigate(`/registro/${planId}`);
                    else navigate('/registro');
                  }}
                >Registrar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginView;

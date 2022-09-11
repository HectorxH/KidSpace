import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';

const RegistroView = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          nombres, apellidos, username, password, tipo: 'profesor',
        },
      );
      console.log(res);
      setCorrect(true);
      setError(false);
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
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <TextField label="Nombres" onChange={handleNombresChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Apellidos" onChange={handleApellidosChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre de usuario" onChange={handleUsernameChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Contraseña" type="password" onChange={handlePasswordChange} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleClick}> Registrar </Button>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default RegistroView;
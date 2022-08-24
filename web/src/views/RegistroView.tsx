import React, { useState } from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Alert,
} from '@mui/material';

const RegistroView = () => {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = (event) => {
    let cuentas = localStorage.getItem('cuentas');
    let valid = true;
    if (cuentas === null) cuentas = '[]';
    const cuentasArray = JSON.parse(cuentas);
    for (let i = 0; i < cuentasArray.length; i += 1) {
      const cuenta = cuentasArray[i];
      if (cuenta.username === username) {
        valid = false;
      }
    }

    if (valid) {
      setCorrect(true);
      setError(false);
      cuentasArray.push({ username, password });
      localStorage.setItem('cuentas', JSON.stringify(cuentasArray));
    } else {
      setError(true);
      setCorrect(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
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
            <TextField label="Username" onChange={handleUsernameChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" onChange={handlePasswordChange} />
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

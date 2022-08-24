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

const LoginView = () => {
  const [checked, setChecked] = useState(true);
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleClick = () => {
    let cuentas = localStorage.getItem('cuentas');
    let valid = false;
    if (cuentas === null) cuentas = '[]';
    const cuentasArray = JSON.parse(cuentas);
    for (let i = 0; i < cuentasArray.length; i += 1) {
      const cuenta = cuentasArray[i];
      if (cuenta.username === username && cuenta.password === password) {
        valid = true;
      }
    }
    if (valid) {
      setCorrect(true);
      setError(false);
    } else {
      setError(true);
      setCorrect(false);
    }
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
            <TextField label="Username" onChange={handleUsernameChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" onChange={handlePasswordChange} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )}
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleClick}> Login </Button>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginView;

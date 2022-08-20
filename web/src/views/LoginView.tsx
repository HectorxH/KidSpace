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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClick = (event) => {
    if (username === 'admin' && password === 'admin') {
      setCorrect(true);
      setError(false);
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

import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Typography,
  Stack,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/logo-horizontal.png';

const RegistroView = () => {
  const params = useParams();
  const { planId } = params;
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [plan, setPlan] = useState(`${planId}`);
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
      if (plan) {
        setTimeout(() => navigate(`/login/${plan}`), 1500);
      } else {
        setTimeout(() => navigate('/login'), 1500);
      }
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

  const handlePlanChange = (event: SelectChangeEvent<string>) => {
    setPlan(event.target.value);
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
              <FormControl fullWidth>
                <InputLabel id="select-label">Tipo de cuenta</InputLabel>
                <Select required labelId="select-label" id="select" label="Tipo de cuenta" value={plan} onChange={handlePlanChange}>
                  <MenuItem value={0}><Typography>Basic</Typography></MenuItem>
                  <MenuItem value={1}><Typography>Pro</Typography></MenuItem>
                  <MenuItem value={2}><Typography>Pro+</Typography></MenuItem>
                </Select>
              </FormControl>
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
                onClick={() => {
                  if (plan) navigate(`/login/${plan}`);
                  else navigate('/login');
                }}
              >Iniciar sesion
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );

  // return (
  //   <div style={{ padding: 30 }}>
  //     <Paper>
  //       <Grid
  //         container
  //         spacing={3}
  //         direction="column"
  //         alignItems="center"
  //         justifyContent="center"
  //       >
  //         <Grid item xs={12}>
  //           <TextField label="Nombres" onChange={handleNombresChange} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <TextField label="Apellidos" onChange={handleApellidosChange} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <TextField label="Nombre de usuario" onChange={handleUsernameChange} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <TextField label="Contraseña" type="password" onChange={handlePasswordChange} />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Button fullWidth onClick={handleClick}> Registrar </Button>
  //         </Grid>
  //         <Grid item xs={12}>
  //           {correct && (
  //             <Alert severity="success">
  //               Usuario registrado
  //             </Alert>
  //           )}
  //           {error && (
  //             <Alert severity="error">
  //               Datos invalidos
  //             </Alert>
  //           )}
  //         </Grid>
  //       </Grid>
  //     </Paper>
  //   </div>
  // );
};

export default RegistroView;

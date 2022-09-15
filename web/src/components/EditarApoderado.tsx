/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
import {
  Button, TextField, Card, CardContent,
  Divider, Stack, Typography,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import axios from 'axios';
import { IApoderado } from '../types/apoderados';

interface EdtiarApoderadoParams {
  initialApoderado: IApoderado,
  updateApoderados: Function,
  deleteApoderados: Function
}

const EditarApoderado = ({ initialApoderado, updateApoderados, deleteApoderados }:
  EdtiarApoderadoParams) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [defaultApoderado, setDefaultApoderado] = useState(initialApoderado);
  const [apoderado, setApoderado] = useState(initialApoderado);
  const [editing, setEditing] = useState(apoderado.new);
  const [openDialog, setOpenDialog] = useState(false);

  const changeApoderadoEditing = () => {
    setEditing(!editing);
  };

  const handleCancelarClick = () => {
    setApoderado(defaultApoderado);
    changeApoderadoEditing();
  };

  const handleUpdate = () => {
    updateApoderados(apoderado);
    changeApoderadoEditing();
  };

  const handleNombresChange = (event: any) => {
    if (apoderado) {
      setApoderado({
        ...apoderado,
        user: { ...apoderado.user, nombres: event.target.value },
      });
    }
  };

  const handleApellidosChange = (event: any) => {
    if (apoderado) {
      setApoderado({
        ...apoderado,
        user: { ...apoderado.user, apellidos: event.target.value },
      });
    }
  };

  const handleCorreoChange = (event: any) => {
    if (apoderado) {
      setApoderado({
        ...apoderado,
        user: { ...apoderado.user, email: event.target.value },
      });
    }
  };

  const handleClickActive = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminar = () => {
    deleteApoderados(apoderado._id);
    handleCloseDialog();
  };

  const sendCredentials = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Apoderado/${apoderado._id}/sendCredentials`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              Datos del apoderado:
            </Typography>
            {!editing
            && (
              <Button startIcon={<EditIcon />} onClick={changeApoderadoEditing}>
                Editar
              </Button>
            )}
          </Stack>
          <Divider />
          <Stack
            spacing={3}
            direction="column"
            pt={4}
            pb={2}
          >
            <Stack maxWidth={500} spacing={3} py={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Nombres
                </Typography>
                <TextField size="small" disabled={!editing} value={apoderado.user.nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Apellidos
                </Typography>
                <TextField size="small" disabled={!editing} value={apoderado.user.apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Correo
                </Typography>
                <TextField size="small" disabled={!editing} value={apoderado.user.email} onChange={handleCorreoChange} sx={{ borderRadius: 10 }} />
              </Stack>
            </Stack>
            {editing && (
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Button sx={{ color: '#EA6A6A' }} onClick={handleClickActive} startIcon={<DeleteIcon />}>Eliminar</Button>
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Confirme la acción
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        ¿Desea eliminar a {apoderado.user.nombres} {apoderado.user.apellidos}?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button sx={{ backgroundColor: '#EA6A6A' }} variant="contained" onClick={handleEliminar}>Eliminar</Button>
                      <Button variant="contained" onClick={handleCloseDialog} sx={{ backgroundColor: '#F1F3F8' }}>
                        <Typography
                          variant="button"
                          sx={{ color: '#929292' }}
                        >
                          Cancelar
                        </Typography>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
                <Stack direction="row" alignItems="end">
                  <Button onClick={handleCancelarClick} variant="contained" color="inherit" sx={{ marginRight: 2 }}> Cancelar </Button>
                  <Button onClick={handleUpdate} variant="contained" color="quaternary">
                    <Typography variant="button" color="white">
                      {apoderado.new ? 'Crear' : 'Guardar'}
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
          {!editing && (
            <Stack direction="row" px={3}>
              <Button
                startIcon={<ForwardToInboxIcon />}
                onClick={sendCredentials}
              >
                Enviar credenciales
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default EditarApoderado;

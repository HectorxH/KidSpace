/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
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
import { IApoderado } from '../types/apoderados';

interface EdtiarApoderadoParams {
  apoderado: IApoderado,
  handleUpdateApoderado: Function,
  handleEliminarApoderado: Function
}

const EditarApoderado = ({ apoderado, handleUpdateApoderado, handleEliminarApoderado }:
  EdtiarApoderadoParams) => {
  const [initialSave, setInitialSave] = useState(apoderado.isNew);
  const [editing, setEditing] = useState(apoderado.isNew);
  const [nombres, setNombres] = useState(apoderado.nombres);
  const [apellidos, setApellidos] = useState(apoderado.apellidos);
  const [correo, setCorreo] = useState(apoderado.correo);
  const [openDialog, setOpenDialog] = useState(false);

  const changeApoderadoEditing = () => {
    setEditing(!editing);
  };

  const handleCancelarClick = () => {
    if (initialSave) {
      handleEliminarApoderado(apoderado.napoderado);
    } else {
      setNombres(apoderado.nombres);
      setApellidos(apoderado.apellidos);
      setCorreo(apoderado.correo);
      changeApoderadoEditing();
    }
  };

  const handleUpdate = () => {
    setInitialSave(false);
    changeApoderadoEditing();
    const newApoderado = {
      napoderado: apoderado.napoderado,
      nombres,
      apellidos,
      correo,
      isNew: false,
    };
    handleUpdateApoderado(newApoderado);
  };

  const handleNombresChange = (event: any) => {
    setNombres(event.target.value);
  };

  const handleApellidosChange = (event: any) => {
    setApellidos(event.target.value);
  };

  const handleCorreoChange = (event: any) => {
    setCorreo(event.target.value);
  };

  const handleClickActive = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminar = () => {
    handleEliminarApoderado(apoderado.napoderado);
    handleCloseDialog();
  };

  return (
    <Stack>
      <Card elevation={4} sx={{ borderRadius: '20px', marginTop: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              Datos del apoderado:
            </Typography>
            <Button startIcon={<EditIcon />} onClick={changeApoderadoEditing}>
              Editar
            </Button>
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
                <TextField size="small" disabled={!editing} value={nombres} onChange={handleNombresChange} sx={{ borderRadius: 10 }} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Apellidos
                </Typography>
                <TextField size="small" disabled={!editing} value={apellidos} onChange={handleApellidosChange} sx={{ borderRadius: 10 }} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2" px={4}>
                  Correo electrónico
                </Typography>
                <TextField size="small" disabled={!editing} value={correo} onChange={handleCorreoChange} sx={{ borderRadius: 10 }} />
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
                        ¿Desea eliminar a {nombres} {apellidos}?
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
                      Guardar
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default EditarApoderado;

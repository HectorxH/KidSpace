/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  Stack, Box,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
// import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import actividadesDocentes from '../mock/actividadesDocentes';
// import { useAuth } from '../hooks/useAuth';

interface IRow {
  _id: number,
  estado: string,
  nombre: string,
  pregunta1: string,
  pregunta2: string,
}

interface ITableParams {
  rows: IRow[],
  correctas: string[],
}

const ResultadosQuizTable = (
  { rows, correctas }: ITableParams,
) => {
  const { logout } = useAuth();
  const cols: GridColDef[] = [
    {
      field: 'nombre',
      flex: 1,
      headerName: 'Nombre',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      editable: true,
      renderCell: ((params) => (
        <div>
          <Typography sx={{ fontSize: '14px', color: params.row.estado === 'Completada' ? '#A1C96A' : '#EA6A6A' }}>
            {params.row.estado}
          </Typography>
        </div>
      )),
    },
    {
      field: 'pregunta1',
      headerName: 'Pregunta 1',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          {params.row.pregunta1 === correctas[0] ? (<CheckIcon sx={{ color: '#A1C96A' }} />) : (<ClearIcon sx={{ color: '#EA6A6A' }} />) } {params.row.pregunta1}
        </Stack>
      ),
    },
    {
      field: 'pregunta2',
      headerName: 'Pregunta 2',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          {params.row.pregunta2 === correctas[1] ? (<CheckIcon sx={{ color: '#A1C96A' }} />) : (<ClearIcon sx={{ color: '#EA6A6A' }} />) } {params.row.pregunta2}
        </Stack>
      ),
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {(rows.length === 0) ? <SinActividades mainmsg="Sin participantes." submsg="Cuande hayan participantes, estos aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 50}
            autoHeight
            hideFooter
            columns={cols}
            rows={Object.values(rows)}
            getRowId={(row: any) => row._id}
            disableSelectionOnClick
            sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
          />
        )}
    </Box>
  );
};

export default ResultadosQuizTable;

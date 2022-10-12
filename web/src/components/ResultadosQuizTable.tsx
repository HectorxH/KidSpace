/* eslint-disable no-underscore-dangle */
import {
  Stack, Box,
  Typography,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SinActividades from './SinActividades';

interface IResultado {
  nombre: string;
  fecha: string;
  respuesta1: string;
  respuesta2:string;
}

interface IResultados {
  [key: string]: IResultado;
}

interface ITableParams {
  rows: IResultados,
  correctas: string[],
  estudiantes: string[]
}

const ResultadosQuizTable = (
  { rows, correctas, estudiantes }: ITableParams,
) => {
  console.log(rows, correctas, estudiantes);
  const cols: GridColDef[] = [
    {
      field: 'nombre',
      flex: 1,
      headerName: 'Nombre',
      renderCell: ({ row }) => row,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <div>
          <Typography sx={{ fontSize: '14px', color: rows[params.row] ? '#A1C96A' : '#EA6A6A' }}>
            {rows[params.row] ? 'Completada' : 'Sin completar'}
          </Typography>
        </div>
      ),
    },
    {
      field: 'pregunta1',
      headerName: 'Pregunta 1',
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          {rows[row] && rows[row].respuesta1 === correctas[0] ? (<CheckIcon sx={{ color: '#A1C96A' }} />) : (<ClearIcon sx={{ color: '#EA6A6A' }} />)}
          {rows[row] ? rows[row].respuesta1 : '-'}
        </Stack>
      ),
    },
    {
      field: 'pregunta2',
      headerName: 'Pregunta 2',
      flex: 1,
      renderCell: ({ row }) => (
        <Stack direction="row" sx={{ justifyContent: 'center' }}>
          {rows[row] && rows[row].respuesta2 === correctas[0] ? (<CheckIcon sx={{ color: '#A1C96A' }} />) : (<ClearIcon sx={{ color: '#EA6A6A' }} />)}
          {rows[row] ? rows[row].respuesta2 : '-'}
        </Stack>
      ),
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {(Object.keys(rows).length === 0) ? <SinActividades mainmsg="Sin participantes." submsg="Cuande hayan participantes, estos aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 'auto'}
            autoHeight
            hideFooter
            columns={cols}
            rows={estudiantes}
            getRowId={(row) => row}
            disableSelectionOnClick
            sx={{ borderRadius: 5, paddingLeft: 3 }}
          />
        )}
    </Box>
  );
};

export default ResultadosQuizTable;

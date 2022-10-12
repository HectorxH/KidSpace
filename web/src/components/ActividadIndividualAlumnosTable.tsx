/* eslint-disable no-underscore-dangle */
import {
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';
import SinActividades from './SinActividades';

interface IResultado {
  nombre: string;
  fecha: string;
  duracion: string;
}

interface IResultados {
  [key: string]: IResultado
}

interface ITableParams {
  rows: IResultados,
  estudiantes: string[]
}

const ActividadIndividualAlumnosTable = (
  { rows, estudiantes }: ITableParams,
) => {
  console.log(rows);
  const cols: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: ({ row }) => row,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      renderCell: (({ row }) => (
        <div>
          <Typography sx={{ fontSize: '15px', color: rows[row] ? '#A1C96A' : '#EA6A6A' }}>
            {rows[row] ? 'Completada' : 'Sin completar'}
          </Typography>
        </div>
      )),
    },
    {
      field: 'duracion',
      headerName: 'Tiempo',
      flex: 1,
      renderCell: ({ row }) => _.round(Number((rows[row] || { duracion: '-' }).duracion)),
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {(estudiantes.length === 0) ? <SinActividades mainmsg="Sin participantes." submsg="Cuande hayan participantes, estos aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 50}
            autoHeight
            hideFooter
            columns={cols}
            rows={estudiantes}
            getRowId={(row) => row}
            disableSelectionOnClick
            sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
          />
        )}
    </Box>
  );
};

export default ActividadIndividualAlumnosTable;

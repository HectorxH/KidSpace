/* eslint-disable no-underscore-dangle */
import {
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SinActividades from './SinActividades';

interface IRow {
  _id: number,
  nombre: string,
  estado: string,
  tiempo: string,
}

interface ITableParams {
  rows: IRow[],
}

const ActividadIndividualAlumnosTable = (
  { rows }: ITableParams,
) => {
  const cols: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      renderCell: ((params) => (
        <div>
          <Typography sx={{ fontSize: '15px', color: params.row.estado === 'Completada' ? '#A1C96A' : '#EA6A6A' }}>
            {params.row.estado}
          </Typography>
        </div>
      )),
    },
    {
      field: 'tiempo',
      headerName: 'Tiempo',
      flex: 1,
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

export default ActividadIndividualAlumnosTable;

/* eslint-disable no-underscore-dangle */
import {
  Box,
} from '@mui/material';
import React from 'react';
import moment from 'moment-timezone';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SinActividades from '../../components/SinActividades';

interface ICursosTable {
  _id: string;
  nombre: string;
  cantidad: number;
  fecha: Date;
}

interface ITableParams {
  rows: ICursosTable[],
}

const CursosIntitucionTable = (
  { rows }: ITableParams,
) => {
  console.log(rows);
  const cols: GridColDef[] = [
    {
      field: 'curso',
      headerName: 'Curso',
      width: 400,
      renderCell: ({ row }) => row.nombre,
    },
    {
      field: 'estudiantes',
      headerName: 'Estudiantes',
      width: 200,
      renderCell: ({ row }) => row.cantidad,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      width: 200,
      renderCell: (({ row }) => (
        <div>
          {moment(row.fecha).format('DD/MM/YYYY')}
        </div>
      )),
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {(rows.length === 0) ? <SinActividades mainmsg="Sin actividades." submsg="Cuande se hayan realizado actividades, estas aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 50}
            autoHeight
            columns={cols}
            rows={Object.values(rows)}
            getRowId={(row: any) => row._id}
            disableSelectionOnClick
            hideFooter
            sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
          />
        )}
    </Box>
  );
};

export default CursosIntitucionTable;

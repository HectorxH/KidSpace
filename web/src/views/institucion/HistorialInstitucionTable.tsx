/* eslint-disable no-underscore-dangle */
import {
  Box,
} from '@mui/material';
import React from 'react';
import moment from 'moment-timezone';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SinActividades from '../../components/SinActividades';

interface IHistorial {
  _id: string,
  actividad: string,
  curso: string,
  fecha: Date,
}

interface ITableParams {
  rows: IHistorial[],
}

const HistorialIntitucionTable = (
  { rows }: ITableParams,
) => {
  console.log(rows);
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Actividad',
      width: 400,
    },
    {
      field: 'curso',
      headerName: 'Curso',
      width: 200,
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

export default HistorialIntitucionTable;

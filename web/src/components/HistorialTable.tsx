/* eslint-disable no-underscore-dangle */
import {
  Box,
} from '@mui/material';
import React from 'react';
import moment from 'moment-timezone';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SinActividades from './SinActividades';
import { IActividadLog } from '../types/actividadLog';

interface ITableParams {
  rows: IActividadLog[],
}

const HistorialTable = (
  { rows }: ITableParams,
) => {
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Actividad',
      width: 400,
    },
    {
      field: 'tipo',
      headerName: 'Tipo de Actividad',
      width: 200,
      renderCell: ({ row }) => {
        if (row.tipo === 'clase') {
          return 'Docente';
        }
        // if (row.tipo === 'individual') {
        return 'Individual';
      },
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
            sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
          />
        )}
    </Box>
  );
};

export default HistorialTable;

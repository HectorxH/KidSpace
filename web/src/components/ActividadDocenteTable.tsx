/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box, TableHead,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
// import { useAuth } from '../hooks/useAuth';

const imgStudent = require('../assets/quiz.png');

interface IRow {
  _id: number,
  estado: string,
  actividad: string,
  porcentaje: number
}

interface RowParams {
  row: IRow,
}

interface ICursoTableParams {
  rows: IRow[],
  // updateEstudiantes: Function
}

const ActividadDocenteTable = (
  { rows }: ICursoTableParams,
) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleVerStats = (i:string) => {
    navigate(`/cursos/63352374912a82092e1799f9/estadisticas/actividadDocente/${i}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Actividad',
      flex: 1,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 150,
      editable: true,
      renderCell: ((params) => (
        <div>
          <Typography sx={{ color: params.row.estado === 'Completada' ? '#A1C96A' : '#EA6A6A' }}>
            {params.row.estado}
          </Typography>
        </div>
      )),
    },
    {
      field: 'porcentaje',
      headerName: '% del curso que completó la actividad',
      flex: 1,
    },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e:any) => {
          handleVerStats(params.row._id);
        };
        return (
          <div>
            <Button
              variant="contained"
              color="quaternary"
              sx={{ m: 1 }}
              onClick={() => onClick(params)}
            >
              <Typography
                variant="button"
                color={(theme: Theme) => theme.palette.primary.contrastText}
              >
                Ver estadísticas
              </Typography>
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {(rows.length === 0) ? <SinActividades mainmsg="Sin participantes." submsg="Cuande hayan participantes, estos aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 'auto'}
            autoHeight
            hideFooter
            columns={cols}
            rows={Object.values(rows)}
            getRowId={(row: any) => row._id}
            disableSelectionOnClick
            sx={{ borderRadius: 5 }}
          />
        )}
    </Box>
  );
};

export default ActividadDocenteTable;

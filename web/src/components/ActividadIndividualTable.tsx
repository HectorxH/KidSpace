/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box, TableHead,
  Typography,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
// import { useAuth } from '../hooks/useAuth';

interface IRow {
  _id: number,
  actividad: string,
  porcentaje: number
}

interface RowParams {
  row: IRow,
}

interface ITableParams {
  rows: IRow[],
  // updateEstudiantes: Function
}

const ActividadIndividualTable = (
  { rows }: ITableParams,
) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [curso, setCurso] = useState('633791565117c47b4c1399db');
  const handleVerStats = (i:string) => {
    navigate(`/cursos/${curso}/estadisticas/actividadIndividual/${i}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'porcentaje',
      headerName: '% del curso',
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.row.porcentaje} %
        </div>
      ),
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
              onClick={() => onClick(params)}
              sx={{ m: 1 }}
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

export default ActividadIndividualTable;

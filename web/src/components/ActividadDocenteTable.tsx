/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box, TableHead,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
import { ICurso } from '../types/cursos';
// import { useAuth } from '../hooks/useAuth';

const imgStudent = require('../assets/quiz.png');

const actividades = [
  'Diagramas',
  'Soluciones tecnologicas',
  'Materiales',
  'Reciclaje',
  'Diseño',
];

interface IRow {
  _id: number,
  estado: string,
  actividad: string,
  porcentaje: number
}

interface IActividadesCurso {
  [key: string]: number
}

interface ITableParams {
  rowsData: IActividadesCurso,
  cursoId: string
}

const ActividadDocenteTable = (
  { rowsData, cursoId }: ITableParams,
) => {
  const navigate = useNavigate();
  const handleVerStats = (i:string) => {
    navigate(`/cursos/${cursoId}/estadisticas/actividadDocente/${i}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Actividad',
      flex: 1,
      renderCell: ((params) => (params.row)),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      flex: 1,
      renderCell: ((params) => (
        <div>
          <Typography sx={{ fontSize: '15px', color: rowsData[params.row] ? '#A1C96A' : '#EA6A6A' }}>
            {rowsData[params.row] ? 'Completada' : 'Sin Completar' }
          </Typography>
        </div>
      )),
    },
    {
      field: 'porcentaje',
      headerName: '% del curso',
      flex: 1,
      renderCell: (params) => (
        <div>
          {_.round((Number(rowsData[params.row]) || 0) * 100, 1)} %
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
          handleVerStats(params.row);
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
      <DataGrid
        density="comfortable"
        getRowHeight={() => 'auto'}
        autoHeight
        hideFooter
        columns={cols}
        rows={actividades}
        getRowId={(row: any) => row}
        disableSelectionOnClick
        sx={{ borderRadius: 5 }}
      />
    </Box>
  );
};

export default ActividadDocenteTable;

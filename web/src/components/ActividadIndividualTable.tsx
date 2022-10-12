/* eslint-disable no-underscore-dangle */
import {
  Button, Theme,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';

const actividades = [
  'Informática y algoritmos en nuestra vida',
  '¿Qué es un computador?',
  'Tierra, Luna y Sol',
  '¿Qué vemos en el cielo nocturno?',
  'Interpretando etiquetas de los alimentos',
  'Analizando nuestra dieta',
  'Teoría de colores',
  'Diseño gráfico en nuestro alrededor',
];

interface IActividades {
  [key: string]: number
}

interface ITableParams {
  rowsData: IActividades
}

const ActividadIndividualTable = (
  { rowsData }: ITableParams,
) => {
  const navigate = useNavigate();
  const handleVerStats = (i:string) => {
    navigate(`actividadIndividual/${encodeURIComponent(i)}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => params.row,
    },
    {
      field: 'porcentaje',
      headerName: '% del curso',
      flex: 1,
      renderCell: (params) => (
        <div>
          {_.round(100 * (Number(rowsData[params.row] || 0)), 1)} %
        </div>
      ),
    },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="quaternary"
            onClick={() => handleVerStats(params.row)}
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
      ),
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
        sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
      />
    </Box>
  );
};

export default ActividadIndividualTable;

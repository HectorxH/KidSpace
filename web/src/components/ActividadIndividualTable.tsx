/* eslint-disable no-underscore-dangle */
import {
  Button, Theme,
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

interface IInstitucion {
  institucion: boolean
}

interface ITableParams {
  rowsData: IActividades
  institucion: IInstitucion
}

const ActividadIndividualTable = (
  { rowsData, institucion }: ITableParams,
) => {
  let hideColumn = false;
  if (institucion) {
    hideColumn = true;
  }
  const navigate = useNavigate();
  const handleVerStats = (i:string) => {
    navigate(`actividadIndividual/${encodeURIComponent(i)}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Nombre',
      minWidth: 400,
      flex: 1,
      renderCell: (params) => params.row,
    },
    {
      field: 'porcentaje',
      headerName: '% del curso',
      minWidth: 200,
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
      minWidth: 200,
      flex: 1,
      sortable: false,
      hide: hideColumn,
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
    <DataGrid
      density="comfortable"
      getRowHeight={() => 60}
      autoHeight
      hideFooter
      columns={cols}
      rows={actividades}
      getRowId={(row: any) => row}
      disableSelectionOnClick
      sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
    />
  );
};

export default ActividadIndividualTable;

/* eslint-disable no-underscore-dangle */
import {
  Button, Theme, Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import _ from 'lodash';

const actividades = [
  'Diagramas',
  // 'Soluciones tecnologicas',
  'Materiales',
  // 'Reciclaje',
  'Diseños',
];
interface IActividades {
  [key: string]: number
}

interface ITableParams {
  rowsData: IActividades,
}

const ActividadDocenteTable = (
  { rowsData }: ITableParams,
) => {
  const navigate = useNavigate();
  const handleVerStats = (i:string) => {
    navigate(`actividadDocente/${encodeURIComponent(i)}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'actividad',
      headerName: 'Actividad',
      width: 200,
      renderCell: (({ row }) => row),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 200,
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
      width: 200,
      renderCell: ({ row }) => (
        <div>
          {_.round((Number(rowsData[row]) || 0) * 100, 1)} %
        </div>
      ),
    },
    {
      field: 'accion',
      headerName: 'Acción',
      width: 200,
      sortable: false,
      renderCell: ({ row }) => (
        <div>
          <Button
            variant="contained"
            color="quaternary"
            sx={{ m: 1 }}
            onClick={() => handleVerStats(row)}
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
      getRowHeight={() => 'auto'}
      autoHeight
      hideFooter
      columns={cols}
      rows={actividades}
      getRowId={(row) => row}
      disableSelectionOnClick
      sx={{
        borderRadius: 5, paddingLeft: 3, paddingRight: 3,
      }}
    />
  );
};

export default ActividadDocenteTable;

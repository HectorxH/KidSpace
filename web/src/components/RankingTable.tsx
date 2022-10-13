/* eslint-disable no-underscore-dangle */
import {
  Button, Theme,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import SinActividades from './SinActividades';
import { IEstudiante } from '../types/estudiantes';

interface IRow {
    estudiante: IEstudiante,
    cantidad: number
}

interface ITableParams {
  rowsData: IRow[],
  // updateEstudiantes: Function
}

const RankingTable = (
  { rowsData }: ITableParams,
) => {
  rowsData.sort((a, b) => b.cantidad - a.cantidad);
  const rows = _.map(rowsData, (data, idx) => ({ ...data, lugar: idx + 1 }));

  const navigate = useNavigate();
  const handleVerStats = (i:string) => {
    navigate(`estadisticasEstudiante/${i}`);
  };
  const cols: GridColDef[] = [
    {
      field: 'lugar',
      headerName: 'Lugar',
      flex: 1,
      renderCell: ((params) => (
        <div>
          <FontAwesomeIcon
            icon={faCrown}
            style={{
              color: ['#F2C144', '#C1C1C1', '#DF8366'][params.row.lugar - 1] || '#FFFFFF',
              opacity: params.row.lugar > 3 ? 0 : 1,
            }}
          /> {params.row.lugar}
        </div>
      )),
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params) => `${params.row.estudiante.user.nombres} ${params.row.estudiante.user.apellidos}`,
    },
    {
      field: 'cantidad',
      headerName: 'Actividades completadas',
      flex: 1,
    },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="quaternary"
            onClick={() => handleVerStats(params.row.estudiante._id)}
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
      {(rows.length === 0) ? <SinActividades mainmsg="Sin participantes." submsg="Cuande hayan participantes, estos aparecerán aquí." />
        : (
          <DataGrid
            density="comfortable"
            getRowHeight={() => 'auto'}
            autoHeight
            hideFooter
            columns={cols}
            rows={Object.values(rows)}
            getRowId={(row: any) => row.estudiante._id}
            disableSelectionOnClick
            sx={{ borderRadius: 5, paddingLeft: 3, paddingRight: 3 }}
          />
        )}
    </Box>
  );
};

export default RankingTable;

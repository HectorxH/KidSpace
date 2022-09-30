/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import {
  TableContainer, Button, Table, TableBody, Theme,
  TableCell, TableRow, Stack, Card, Box, TableHead,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import SinActividades from './SinActividades';
import { IEstudiante, IEstudiantes } from '../types/estudiantes';
// import { useAuth } from '../hooks/useAuth';

const imgStudent = require('../assets/quiz.png');

interface IRow {
  _id: number,
  lugar: number,
  nombre: string,
  actividades: number
}

interface ICursoTableParams {
  rows: IRow[],
  // updateEstudiantes: Function
}

interface IParams {
  rows: [number, string, number],
}

const RankingTable = (
  { rows }: ICursoTableParams,
) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleVerStats = (id:number) => {
    navigate(`/${id}/estadisticasEstudiante`);
  };
  const cols: GridColDef[] = [
    {
      field: 'lugar',
      headerName: 'Lugar',
      width: 150,
      editable: true,
      renderCell: ((params) => (
        <div>
          <FontAwesomeIcon
            icon={faCrown}
            style={{
              color: params.row.lugar === 1
                ? '#F2C144'
                : params.row.lugar === 2
                  ? '#C1C1C1'
                  : params.row.lugar === 3
                    ? '#DF8366'
                    : '#FFF',
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
    },
    {
      field: 'actividades',
      headerName: 'Actividades completadas',
      flex: 1,
    },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e:any) => {
          handleVerStats(params.row.id);
        };
        return (
          <div>
            <Button
              variant="contained"
              color="quaternary"
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
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        density="comfortable"
        autoHeight
        columns={cols}
        rows={Object.values(rows)}
        getRowId={(row: any) => row._id}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{ borderRadius: 5 }}
      />
    </Box>
  //   {(rows.length === 0)
  //     ? <SinActividades mainmsg="Sin participantes." submsg="Cuande añada participantes, estos aparecerán aquí." />
  //     : ''}
  // </TableContainer>
  );
};

export default RankingTable;

import {
  Card, CardActionArea, CardContent, CardMedia, Grid, Stack, Typography,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { NavLink } from 'react-router-dom';
import actividadesDetails from '../mock/actividadesDetails';
import unidadesDetails from '../mock/unidadesDetails';
import { IActividadDetail } from '../types/actividad';
import { IFavorita } from '../types/favoritas';
import { IUnidadDetail } from '../types/unidad';

interface FavoritasParams {
  favoritas: {nunidad: number, nactividad: number}[]
}

interface FavoritaParams {
  row: IFavorita
}

const Favorita = ({ row } : FavoritaParams) => (
  <Card>
    <CardActionArea
      component={NavLink}
      to={row.path}
    >
      <Grid
        container
        columns={10}
      >
        <Grid item xs={3}>
          <CardMedia
            component="img"
            image={row.portada}
            alt={`Portada actividad ${row.titulo}`}
            width="100%"
            height="100%"
          />
        </Grid>
        <Grid item>
          <CardContent>
            <Stack spacing={3}>
              <Typography>
                {row.titulo}
              </Typography>
              <Typography>
                {row.unidad.titulo}
              </Typography>
            </Stack>
          </CardContent>
        </Grid>
      </Grid>
    </CardActionArea>
  </Card>
);

const Favoritas = ({ favoritas } : FavoritasParams) => {
  const actividadesFavoritas : IActividadDetail[] = _.compact(favoritas.map(
    ({ nunidad, nactividad }) => actividadesDetails.find(_.matches({ nunidad, nactividad })),
  ));

  const unidadesFavoritas : IUnidadDetail[] = _.compact(favoritas.map(
    ({ nunidad }) => _.find(unidadesDetails, { nunidad }),
  ));

  const rows : IFavorita[] = actividadesFavoritas.map(
    (actividad, idx) => ({ ...actividad, unidad: unidadesFavoritas[idx] }),
  );

  return (
    <Grid
      container
      spacing={2}
      columns={{
        xs: 1, sm: 1, md: 2, lg: 3,
      }}
      sx={{ p: 2 }}
    >
      {rows.map((row) => (
        <Grid item key={row.nactividad} xs={1}>
          <Favorita row={row} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favoritas;

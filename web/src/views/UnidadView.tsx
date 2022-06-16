import React from 'react';
import { useParams } from 'react-router-dom';
import NotFoundView from './NotFoundView';
import unidadesDetails from '../mock/unidadesDetails';

const UnidadView = () => {
  const params = useParams();
  const { numunidad } = params;

  if (typeof numunidad === 'undefined') return (<NotFoundView />);
  const nunidad = parseInt(numunidad, 10);

  const unidad = unidadesDetails[nunidad];

  return (<div />);
};

export default UnidadView;

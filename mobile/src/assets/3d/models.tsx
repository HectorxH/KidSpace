import {ImageSourcePropType} from 'react-native';
const stories: {
  [key: string]: {
    [key: string]: {
      model: ImageSourcePropType;
      resources: ImageSourcePropType[];
    };
  };
} = {
  diagramas: {
    barras: {
      model: require('./diagrama/barras/barras1.glb'),
      resources: [],
    },
    cajita: {
      model: require('./diagrama/cajita/cajita.glb'),
      resources: [],
    },
    caja_girasol: {
      model: require('./diagrama/caja_girasol/cajas_girasoles.glb'),
      resources: [],
    },
    caja_iris: {
      model: require('./diagrama/caja_iris/cajas_irises.glb'),
      resources: [],
    },
    caja_margarita: {
      model: require('./diagrama/caja_margarita/cajas_margaritas.glb'),
      resources: [],
    },
  },
};

export default stories;

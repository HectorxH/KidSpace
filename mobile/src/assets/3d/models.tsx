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
  },
};

export default stories;

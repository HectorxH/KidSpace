import {Model, Resource} from '../../types/model';

const stories: {
  [key: string]: {[key: string]: {model: Model; resources: Resource[]}};
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

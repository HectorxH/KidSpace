import {ImageSourcePropType} from 'react-native';

const images: {[key: string]: {[key: string]: ImageSourcePropType}} = {
  portadaAct1: {
    uri: require('../portadaAct1.jpg'),
  },
  portadaAct2: {
    uri: require('../portadaAct2.jpg'),
  },
  portadaAct3: {
    uri: require('../portadaAct3.jpg'),
  },
  actNoDisponible: {
    uri: require('../actNoDisponible.png'),
  },
  moneda: {
    uri: require('../moneda.png'),
  },
};

export {images};

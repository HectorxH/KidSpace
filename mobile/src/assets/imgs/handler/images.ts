import {ImageSourcePropType} from 'react-native';

const images: {[key: string]: {[key: string]: ImageSourcePropType}} = {
  portadaAct1: {
    uri: require('../diagramas.jpg'),
  },
  portadaAct2: {
    uri: require('../materiales.jpg'),
  },
  portadaAct3: {
    uri: require('../diseños.jpg'),
  },
  portadaAct4: {
    uri: require('../soluciones.jpg'),
  },
  portadaAct5: {
    uri: require('../reciclaje.jpg'),
  },
  actNoDisponible: {
    uri: require('../actNoDisponible.png'),
  },
  moneda: {
    uri: require('../moneda.png'),
  },
};

export {images};

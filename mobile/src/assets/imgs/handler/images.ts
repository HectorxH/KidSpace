import {ImageSourcePropType} from 'react-native';

const images: {[key: string]: {[key: string]: ImageSourcePropType}} = {
  portadaAct1: {
    uri: require('../diagramas.png'),
  },
  portadaAct2: {
    uri: require('../materiales.png'),
  },
  portadaAct3: {
    uri: require('../diseños.png'),
  },
  portadaAct4: {
    uri: require('../soluciones.png'),
  },
  portadaAct5: {
    uri: require('../reciclaje.png'),
  },
  actNoDisponible: {
    uri: require('../actNoDisponible.png'),
  },
  moneda: {
    uri: require('../moneda.png'),
  },
};

export {images};

import {ImageSourcePropType} from 'react-native';

const imagesTienda: {[key: string]: {[key: string]: ImageSourcePropType}} = {
  portada_accesorios: {
    uri: require('../accesorios.png'),
  },
  portada_fondos: {
    uri: require('../fondos.png'),
  },
  portada_ropa: {
    uri: require('../ropa.png'),
  },
  background: {
    uri: require('../background.png'),
  },
  mesa: {
    uri: require('../mesa.png'),
  },
};

export {imagesTienda};

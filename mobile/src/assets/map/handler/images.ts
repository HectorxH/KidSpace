import {ImageSourcePropType} from 'react-native';

const images: {[key: string]: {[key: string]: ImageSourcePropType}} = {
  astronomia: {
    uri: require('../astronomia.png'),
  },
  cielo: {
    uri: require('../cielo_con_ruta.png'),
  },
  diseno: {
    uri: require('../diseno.png'),
  },
  edificios: {
    uri: require('../edificios.png'),
  },
  informatica: {
    uri: require('../informatica.png'),
  },
  mapa: {
    uri: require('../mapa_completo.png'),
  },
  mineria: {
    uri: require('../mineria.png'),
  },
  nutricion: {
    uri: require('../nutricion.png'),
  },
  ruta: {
    uri: require('../ruta.png'),
  },
  solo_cielo: {
    uri: require('../solo_cielo.png'),
  },
};

export {images};

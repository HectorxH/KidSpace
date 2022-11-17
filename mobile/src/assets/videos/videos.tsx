import {ImageSourcePropType} from 'react-native';
const videos: {
  items: {[key: string]: ImageSourcePropType};
  videos360: {[key: string]: ImageSourcePropType};
} = {
  items: {
    test: require('./test.mp4'),
    vidrio: require('./vidrio.mp4'),
    plastico: require('./plastico.mp4'),
    harina: require('./harina.mp4'),
    camara: require('./camara.mp4'),
    plancha: require('./plancha.mp4'),
    telefono: require('./telefono.mp4'),
  },
  videos360: {
    videoTest: require('../360/reciclaje/video360.mp4'),
  },
};

export default videos;

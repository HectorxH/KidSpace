import {ImageSourcePropType} from 'react-native';
const videos: {
  items: {[key: string]: ImageSourcePropType};
} = {
  items: {
    test: require('./test.mp4'),
    vidrio: require('./vidrio.mp4'),
    plastico: require('./plastico.mp4'),
    harina: require('./harina.mp4'),
  },
};

export default videos;

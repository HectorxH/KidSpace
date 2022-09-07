import {ImageSourcePropType} from 'react-native';

const images: {[key: string]: {[key: string]: ImageSourcePropType}} = {
  logo: {
    uri: require('../logo.png'),
  },
};

export {images};

import {ImageSourcePropType} from 'react-native';
const videos: {
  items: {[key: string]: ImageSourcePropType};
} = {
  items: {
    test: require('./test.mp4'),
  },
};

export default videos;
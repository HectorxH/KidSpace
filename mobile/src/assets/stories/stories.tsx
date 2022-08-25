import {Story} from '../../types/story';

const stories: {[key: string]: {[key: string]: Story}} = {
  diagramas: {
    introductory: require('./introductory_1.json'),
    interactive: require('./interactive_1.json'),
  },
  diseños: {
    introductory: require('./introductory_2.json'),
    interactive: require('./interactive_2.json'),
  },
};

export default stories;

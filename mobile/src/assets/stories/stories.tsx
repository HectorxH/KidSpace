import {Story} from '../../types/story';

const stories: {[key: string]: {[key: string]: Story}} = {
  diagramas: {
    CuentoIntroductorio: require('./introductory_1.json'),
    CuentoInteractivo: require('./interactive_1.json'),
  },
  diseños: {
    CuentoIntroductorio: require('./introductory_2.json'),
    CuentoInteractivo: require('./interactive_2.json'),
  },
};

export default stories;

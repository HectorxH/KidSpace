import {ActividadDetail} from '../../types/activity';
const activities: {
  [key: string]: {[key: string]: ActividadDetail};
} = {
  diagramas: {
    introductory: require('./introductory_1.json'),
    interactive: require('./interactive_1.json'),
  },
};

export default activities;

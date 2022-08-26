import {ActividadDetail} from '../../types/activity';
const activities: {
  [key: string]: {[key: string]: ActividadDetail};
} = {
  diagramas: {
    DesafioIntroductorio: require('./introductory_1.json'),
    DesafioCreativo: require('./interactive_1.json'),
    introductory: require('./introductory_1_old.json'),
    interactive: require('./interactive_1_old.json'),
  },
};

export default activities;

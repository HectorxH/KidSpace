import {Actividad} from '../../types/activity';
const activities: {[key: string]: Actividad} = {
  diagramas: require('./diagramas.json'),
  diseños: require('./diseños.json'),
  nutricion1: require('./nutricion1.json'),
};

export default activities;

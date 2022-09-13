import {Actividad} from '../../types/activity';
const activities: {[key: string]: Actividad} = {
  diagramas: require('./diagramas.json'),
  diseños: require('./diseños.json'),
  diseño1: require('./diseño1.json'),
  diseño2: require('./diseño2.json'),
  nutricion1: require('./nutricion1.json'),
  nutricion2: require('./nutricion2.json'),
  debug: require('./tests.json'),
};

export default activities;

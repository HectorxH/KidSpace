import {Actividad} from '../../types/activity';
const activities: {[key: string]: Actividad} = {
  debug: require('./debug.json'),
  diagramas: require('./debug.json'),
  // diagramas: require('./diagramas.json'),
  materiales: require('./materiales.json'),
  diseños: require('./diseños.json'),
  diseño1: require('./diseño1.json'),
  diseño2: require('./diseño2.json'),
  nutricion1: require('./nutricion1.json'),
  nutricion2: require('./nutricion2.json'),
  informatica1: require('./informatica1.json'),
  informatica2: require('./informatica2.json'),
  // informatica2: require('./debug.json'),
};

export default activities;

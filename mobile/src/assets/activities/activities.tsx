import {Actividad} from '../../types/activity';
const activities: {[key: string]: Actividad} = {
  debug: require('./debug.json'),
  //diagramas: require('./debug.json'),
  diagramas: require('./diagramas.json'),
  materiales: require('./materiales.json'),
  diseños: require('./diseños.json'),
  tecnologicas: require('./tecnologicas.json'),
  reciclajes: require('./reciclaje.json'),
  reciclajesOriginal: require('./reciclajeOriginal.json'),

  diseño1: require('./diseño1.json'),
  diseño2: require('./diseño2.json'),
  nutricion1: require('./nutricion1.json'),
  nutricion2: require('./nutricion2.json'),
  informatica1: require('./informatica1.json'),
  informatica2: require('./informatica2.json'),
  // informatica1: require('./tecnologicas.json'),
  // informatica2: require('./reciclaje.json'),
  astronomia1: require('./astronomia1.json'),
  astronomia2: require('./astronomia2.json'),
  // astronomia2: require('./reciclaje.json'),
  // astronomia2: require('./tecnologicas.json'),
  // astronomia2: require('./diagramas.json'),
  // astronomia2: require('./materiales.json'),
  // astronomia2: require('./debug.json'),
};

export default activities;

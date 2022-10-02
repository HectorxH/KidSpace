const info1 : string = require('../assets/webApoderados/info1.png');
const info2 : string = require('../assets/webApoderados/info2.png');
const diseño1 : string = require('../assets/webApoderados/diseño1.png');
const diseño2 : string = require('../assets/webApoderados/diseño2.png');
const nutri1 : string = require('../assets/webApoderados/nutri1.png');
const nutri2 : string = require('../assets/webApoderados/nutri2.png');
const astro1 : string = require('../assets/webApoderados/astro1.png');
const astro2 : string = require('../assets/webApoderados/astro2.png');

export default [
  {
    id: 0,
    img: info1,
    title: 'Informática y algoritmos en nuestra vida',
    carrera: 'Informática',
    estado: 'Completada',
    repeticiones: 0,
    steam: [1, 1, 0, 0, 0],
  },
  {
    id: 1,
    img: info2,
    title: '¿Qué es un computador?',
    carrera: 'Informática',
    estado: 'Sin completar',
    repeticiones: 0,
    steam: [0, 1, 1, 0, 0],
  },
  {
    id: 2,
    img: astro1,
    title: 'Tierra, Luna y Sol',
    carrera: 'Astronomía',
    estado: 'Completada',
    repeticiones: 0,
    steam: [1, 0, 0, 0, 1],
  },
  {
    id: 3,
    img: astro2,
    title: '¿Qué vemos en el cielo nocturno?',
    carrera: 'Astronomía',
    estado: 'Sin completar',
    repeticiones: 0,
    steam: [1, 0, 1, 0, 1],
  },
  {
    id: 4,
    img: nutri1,
    title: 'Interpretando etiquetas de los alimentos',
    carrera: 'Nutrición',
    estado: 'Completada',
    repeticiones: 0,
    steam: [1, 0, 0, 0, 1],
  },
  {
    id: 5,
    img: nutri2,
    title: 'Analizando nuestra dieta',
    carrera: 'Nutrición',
    estado: 'Completada',
    repeticiones: 1,
    steam: [1, 0, 0, 0, 1],
  },
  {
    id: 6,
    img: diseño1,
    title: 'Teoría de colores',
    carrera: 'Diseño',
    estado: 'Sin completar',
    repeticiones: 0,
    steam: [1, 0, 0, 1, 0],
  },
  {
    id: 7,
    img: diseño2,
    title: 'Diseño gráfico en nuestro alrededor',
    carrera: 'Diseño',
    estado: 'Completada',
    repeticiones: 0,
    steam: [0, 0, 1, 1, 0],
  },
];

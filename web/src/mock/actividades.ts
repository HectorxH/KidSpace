const unidad1ImgDiagramas : string = require('../assets/webApoderados/diagramas.png');
const unidad2ImgSolucionesTecnologicas : string = require('../assets/webApoderados/materiales.png');
const unidad3ImgMateriales : string = require('../assets/webApoderados/materiales.png');
const unidad2ImgReciclaje : string = require('../assets/webApoderados/reciclaje.png');
const unidad3ImgDiseños : string = require('../assets/webApoderados/diseños.png');

export default [
  {
    id: 0,
    img: unidad1ImgDiagramas,
    title: 'Unidad 1: Diagramas',
    estado: 'Completada',
    steam: [0, '#B878EA', 0, 0, '#A1C96A'],
  },
  {
    id: 1,
    img: unidad2ImgSolucionesTecnologicas,
    title: 'Unidad 2: Soluciones Tecnológicas',
    estado: 'Sin completar',
    steam: [0, '#B878EA', '#FF8A00', 0, 0],
  },
  {
    id: 2,
    img: unidad3ImgMateriales,
    title: 'Unidad 3: Materiales',
    estado: 'Completada',
    steam: ['#5C9DEC', 0, '#FF8A00', 0, 0],
  },
  {
    id: 3,
    img: unidad2ImgReciclaje,
    title: 'Unidad 2: Reciclaje',
    estado: 'Sin completar',
    steam: ['#5C9DEC', 0, '#FF8A00', '#F3C550', 0],
  },
  {
    id: 4,
    img: unidad3ImgDiseños,
    title: 'Unidad 3: Diseños',
    estado: 'Completada',
    steam: [0, 0, '#FF8A00', '#F3C550', 0],
  },
];

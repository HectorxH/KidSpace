const unidad1ImgDiagramas : string = require('../assets/webApoderados/diagramas.png');
const unidad2ImgSolucionesTecnologicas : string = require('../assets/webApoderados/solucionesTecnologicas.png');
const unidad3ImgMateriales : string = require('../assets/webApoderados/materiales.png');
const unidad2ImgReciclaje : string = require('../assets/webApoderados/reciclaje.png');
const unidad3ImgDiseños : string = require('../assets/webApoderados/diseños.png');

export default [
  {
    id: 0,
    img: unidad1ImgDiagramas,
    unidad: 'Unidad 1',
    actividad: 'Diagramas',
    estado: 'Completada',
    steam: [0, '#B878EA', 0, 0, '#A1C96A'],
    preguntas: [
      {
        enunciado: 'El software Excel permite crear tablas y ______',
        alternativas: ['imágenes', 'gráficos', 'celdas'],
        respuestaCorrecta: 'gráficos',
        data: [2, 12, 5],
      },
      {
        enunciado: 'Para elaborar un gráfico, debemos usar valores guardados en ______',
        alternativas: ['una lista', 'una celda', 'una tabla'],
        respuestaCorrecta: 'una tabla',
        data: [2, 12, 5],
      },
    ],
  },
  {
    id: 1,
    img: unidad2ImgSolucionesTecnologicas,
    unidad: 'Unidad 2',
    actividad: 'Soluciones Tecnológicas',
    estado: 'Sin completar',
    steam: [0, '#B878EA', '#FF8A00', 0, 0],
    preguntas: [
      {
        enunciado: 'Placeholder',
        alternativas: ['Placeholder', 'Placeholder', 'Placeholder'],
        respuestaCorrecta: 'Placeholder',
        data: [2, 12, 5],
      },
      {
        enunciado: 'Placeholder',
        alternativas: ['Placeholder', 'Placeholder', 'Placeholder'],
        respuestaCorrecta: 'Placeholder',
        data: [2, 12, 5],
      },
    ],
  },
  {
    id: 2,
    img: unidad3ImgMateriales,
    unidad: 'Unidad 3',
    actividad: 'Materiales',
    estado: 'Completada',
    steam: ['#5C9DEC', 0, '#FF8A00', 0, 0],
    preguntas: [
      {
        enunciado: 'Los minerales se obtienen en su gran mayoria en la zona _____ de Chile.',
        alternativas: ['centro', 'norte', 'austral'],
        respuestaCorrecta: 'centro',
        data: [2, 12, 5],
      },
      {
        enunciado: 'Después de procesar la materia prima, obtenemos el _____.',
        alternativas: ['lote', 'producto', 'material'],
        respuestaCorrecta: 'lote',
        data: [2, 12, 5],
      },
    ],
  },
  {
    id: 3,
    img: unidad2ImgReciclaje,
    unidad: 'Unidad 2',
    actividad: 'Reciclaje',
    estado: 'Sin completar',
    steam: ['#5C9DEC', 0, '#FF8A00', '#F3C550', 0],
    preguntas: [
      {
        enunciado: 'Placeholder',
        alternativas: ['Placeholder', 'Placeholder', 'Placeholder'],
        respuestaCorrecta: 'Placeholder',
        data: [2, 12, 5],
      },
      {
        enunciado: 'Placeholder',
        alternativas: ['Placeholder', 'Placeholder', 'Placeholder'],
        respuestaCorrecta: 'Placeholder',
        data: [2, 12, 5],
      },
    ],
  },
  {
    id: 4,
    img: unidad3ImgDiseños,
    unidad: 'Unidad 3',
    actividad: 'Diseños',
    estado: 'Completada',
    steam: [0, 0, '#FF8A00', '#F3C550', 0],
    preguntas: [
      {
        enunciado: 'El diseño siempre debe seguir la ______',
        alternativas: ['ideas', 'función', 'creatividad'],
        respuestaCorrecta: 'función',
        data: [2, 12, 5],
      },
      {
        enunciado: '¿Cual de las siguientes características de un objeto se percibe con el tacto?',
        alternativas: ['color', 'tamaño', 'textura'],
        respuestaCorrecta: 'textura',
        data: [2, 12, 5],
      },
    ],
  },
];

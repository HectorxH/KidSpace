const portadaAct1Global: string = require('../assets/diagramas_global.png');
const portadaAct1Cuento2 : string = require('../assets/diagramas_cuento_creativo.png');
const portadaAct1Cuento1 : string = require('../assets/diagramas_cuento_intro.png');
const portadaAct1Desafio2 : string = require('../assets/diagramas_desafio_creativo.png');
const portadaAct1Desafio1 : string = require('../assets/diagramas_desafio_intro.png');

const portadaAct2Global: string = require('../assets/materiales_global.png');
const portadaAct2Cuento2 : string = require('../assets/materiales_cuento_inter.png');
const portadaAct2Cuento1 : string = require('../assets/materiales_cuento_intro.png');
const portadaAct2Desafio2 : string = require('../assets/materiales_desafio_creativo.png');
const portadaAct2Desafio1 : string = require('../assets/materiales_desafio_intro.png');

const portadaAct3Global: string = require('../assets/diseños_global.png');
const portadaAct3Cuento2 : string = require('../assets/diseños_cuento_inter.png');
const portadaAct3Cuento1 : string = require('../assets/diseños_cuento_intro.png');
const portadaAct3Desafio2 : string = require('../assets/diseños_desafio_creativo.png');
const portadaAct3Desafio1 : string = require('../assets/diseños_desafio_inter.png');

const quiz : string = require('../assets/quiz.png');

export default [
  {
    id: 1,
    nunidad: 1,
    nactividad: 1,
    titulo: 'Actividad: Diagramas',
    nombreActividad: 'diagramas',
    descripcion: 'En esta actividad, vas a conocer cómo Diego, un florista, analiza las ventas en su tienda. Aprenderás a organizar y comunicar los resultados estadísticos para distintos propósitos, mediante el análisis  de los diagramas y la elaboración de estos, usando las hojas de cálculo para crear tablas de doble entrada y para diseñar gráficos de barra simple, gráficos de línea y gráficos circulares.',
    portada: portadaAct1Global,
    cuento1: 'En este cuento, los y las estudiantes conocerán a Diego, un florista, que trabaja diseñando y vendiendo arreglos florales. Se dará un contexto en el cual Diego debe crear un gráfico de barras, y para que este le sirva en su trabajo.',
    desafio1: 'En este desafío, los y las estudiantes podrán interactuar con un gráfico de barras que representa las ventas de dos tipos de flores, en un entorno de realidad aumentada. Usando el menú, se podrá acceder a las preguntas asociadas al gráfico, que buscan revisar el entendimiento de cada alumno y alumna sobre cómo leer un gráfico, y cómo sacar conclusiones estadísticas de este.',
    cuento2: 'En este cuento corto, los y las estudiantes continuarán contextualizando el uso de los gráficos y tablas. Para esto, se realizará un relato sobre el trabajo que Diego tuvo que realizar para su análisis de ventas, centrándose en el uso de hojas de cálculo. En cada paso, el o la estudiante tendrá que responder una pregunta, ayudando o dando consejos a Diego, para avanzar la historia. Se busca revisar el entendimiento básico sobre el software, tipos de datos y uso de porcentajes.',
    desafio2: 'En este desafío, los y las estudiantes tendrán la oportunidad de ayudar a Diego en la bodega de su tienda, trabajando con las cajas de flores. Una vez analizada la cantidad de cajas de cada tipo de flor, los y las estudiantes podrán acceder a una hoja de cálculo para rellenar los valores encontrados, además de calcular los porcentajes de cada tipo de flor en la bodega. Finalmente, en base a la información ingresada, se podrá visualizar dos tipos de gráficos - un gráfico de barra y un gráfico circular.',
    quiz: 'En el quiz final los estudiantes podrán responder las preguntas asociadas a la materia de la actividad. Las respuestas serán utilizadas para proporcionar una evaluación de entendimiento para el o la docente.',
    img1: portadaAct1Cuento1,
    img2: portadaAct1Desafio1,
    img3: portadaAct1Cuento2,
    img4: portadaAct1Desafio2,
    img5: quiz,
    path: '/actividades/unidad/1/actividad/1',
    pathAsignar: '/actividades/unidad/1/actividad/1/asignar/',
  },
  {
    id: 2,
    nunidad: 2,
    nactividad: 2,
    titulo: 'Actividad: Materiales',
    nombreActividad: 'materiales',
    descripcion: 'En esta actividad vas a conocer a Victoria, quien día a día trabaja en una fábrica de manufactura. Junto con Victoria vas a teletransportarte a diversas regiones de Chile para aprender sobre las materias primas que se obtienen en cada una. Además, vas a aprender sobre las diferencias entre materia prima, material y producto tecnológico, jugando con las tarjetas físicas.',
    portada: portadaAct2Global,
    cuento1: 'En este cuento, los y las estudiantes conocerán a Victoria, que ejerce su labor en la manufactura. En el cuento se revisarán los conceptos claves sobre la materia prima, y los lugares donde esta se puede obtener, enfocándose más en la geografía de Chile para profundizar el contenido.',
    desafio1: 'En este desafío, los y las estudiantes podrán colocar distintos portales, que corresponden a las zonas Norte, Centro, Sur y Austral de Chile. Estos portales son interactivos y se puede tanto entrar, como salir de estos. Al entrar en un portal, cada estudiante se encontrará en una vista 360 de una región específica. En este desafío se espera desarrollar las capacidades de observación de alumnos y alumnas, aplicando los conceptos vistos en el cuento anterior.',
    cuento2: 'En este cuento, los y las estudiantes  continuarán adentrándose en el mundo de la manufactura. A través de un conjunto de preguntas simples, se revisarán tales conceptos como producción a escala local e industrial, como también se estudiará la diferencia entre la materia, el material y el producto tecnológico.',
    desafio2: 'En este desafío, los y las estudiantes tendrán la oportunidad de jugar con objetos físicos para avanzar dentro de la aplicación. El profesor o la profesora debe entregar tarjetas físicas impresas, y los y las estudiantes tendrán la misión de escanear la tarjeta correcta según la pregunta que aparezca en la pantalla. La idea de este desafío es encontrar los pares correctos entre materia prima y material. En caso de que se haga escaneo de una tarjeta correcta, cada estudiante podrá ver un video corto sobre la materia y el material del nivel, también en el entorno de realidad virtual.',
    quiz: 'En el quiz final los estudiantes podrán responder las preguntas asociadas a la materia de la actividad. Las respuestas serán utilizadas para proporcionar una evaluación de entendimiento para el o la docente.',
    img1: portadaAct2Cuento1,
    img2: portadaAct2Desafio1,
    img3: portadaAct2Cuento2,
    img4: portadaAct2Desafio2,
    img5: quiz,
    path: '/actividades/unidad/2/actividad/2',
    pathAsignar: '/actividades/unidad/2/actividad/2/asignar/',
  },
  {
    id: 3,
    nunidad: 3,
    nactividad: 3,
    titulo: 'Actividad: Diseños',
    nombreActividad: 'diseños',
    descripcion: 'En esta actividad vas a conocer a Luca que trabaja en el área de diseño de productos. Junto con Luca vas a aprender sobre las distintas características que poseen los objetos, como las texturas o los colores. Además, conocerás un concepto clave - el diseño siempre sigue la función - y aprenderás qué es lo que esto significa a la hora de crear un producto que será utilizado por otras personas.',
    portada: portadaAct3Global,
    cuento1: 'En este cuento, los y las estudiantes conocerán a Luca, un diseñador de productos. En el cuento se revisarán los conceptos claves sobre los colores y la psicología de emociones, como también se hablará sobre las distintas texturas que puede tener un objeto.',
    desafio1: 'En este desafío, los y las estudiantes podrán interactuar con 5 distintos objetos en el entorno de la realidad aumentada. El desafío consiste en aplicar y desarrollar las capacidades de análisis basado en la observación de un objeto. Usando el menú, se podrá acceder a las preguntas asociadas a los objetos vistos, que buscan revisar el entendimiento de cada alumno y alumna sobre los conceptos de texturas y colores.',
    cuento2: 'En este cuento, los y las estudiantes  continuarán adentrándose en el mundo del diseño. A través de preguntas simples, se explicarán los conceptos de facilidad de uso e importancia de proporciones y formas a la hora de crear un diseño. La finalidad de este cuento es ilustrar la idea de que el diseño debe seguir la función.',
    desafio2: 'En este desafío, los y las estudiantes tendrán la oportunidad de ayudar a Luca en su trabajo, que consiste en analizar y mejorar los diseños de productos. Una vez que cada alumno y alumna observe los objetos en el entorno de realidad virtual, podrán responder las preguntas asociados a estos usando el cuaderno de observaciones de Luca. Cuando se respondan correctamente las preguntas, el cuaderno de Luca mostrará una entrada con diseño original mejorado, explicando los errores de este. Se busca reforzar los conceptos, vistos en los cuEn el quiz final los estudiantes podrán responder las preguntas asociadas a la materia de la actividad. Las respuestas serán utilizadas para proporcionar una evaluación de entendimiento para el o la docente.',
    quiz: 'En el quiz final los estudiantes podrán responder las preguntas asociadas a la materia de la actividad. Las respuestas serán utilizadas para proporcionar una evaluación de entendimiento para el o la docente.',
    img1: portadaAct3Cuento1,
    img2: portadaAct3Desafio1,
    img3: portadaAct3Cuento2,
    img4: portadaAct3Desafio2,
    img5: quiz,
    path: '/actividades/unidad/3/actividad/3',
    pathAsignar: '/actividades/unidad/3/actividad/3/asignar/',
  },
];

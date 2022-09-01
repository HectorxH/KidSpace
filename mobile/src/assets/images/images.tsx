import {ImageSourcePropType} from 'react-native';

const images: {
  background: {[key: string]: ImageSourcePropType};
  items: {[key: string]: ImageSourcePropType};
  character: {[character: string]: {[mood: string]: ImageSourcePropType}};
  bubbles: {[key: string]: ImageSourcePropType};
  icons: {
    [model: string]: {
      circular?: ImageSourcePropType;
      square: ImageSourcePropType;
    };
  };
} = {
  items: {
    // characters
    DiegoSmile: require('./character/diego/diego_smile.png'),
    DiegoHappy: require('./character/diego/diego_happy.png'),
    DiegoTroubled: require('./character/diego/diego_troubled.png'),
    DiegoBouquet: require('./character/diego/diego_happy.png'),

    LucaAngry: require('./character/luca/luca_angry.png'),
    LucaHappy: require('./character/luca/luca_happy.png'),
    LucaSmile: require('./character/luca/luca_smile.png'),

    SofiaHappy: require('./character/sofia/sofia_happy.png'),
    SofiaQuestion: require('./character/sofia/sofia_question.png'),
    SofiaSmile: require('./character/sofia/sofia_smile.png'),

    normal: require('./character/menhera/menhera_normal.png'),
    cry: require('./character/menhera/menhera_cry.png'),

    // extras
    chart: require('./extras/chart.png'),
    paper: require('./extras/paper.png'),

    grafico_barras: require('./extras/grafico_barras.png'),
    grafico_circular: require('./extras/grafico_circular.png'),

    colorEmpotions: require('./extras/color-empotions.png'),
    colorwheel: require('./extras/colorwheel.png'),
    textureExample: require('./extras/texture-example.png'),
    regaderaMalDiseñada: require('./extras/regaderaMalDiseñada.png'),
    regaderaComparacion: require('./extras/regaderaComparacion.png'),
    fork: require('./extras/fork.png'),
    taza: require('./extras/taza.jpg'),
    silla_chueca: require('./extras/silla_chueca.jpg'),
    taza_fail: require('./extras/taza_fail.jpg'),

    extra_nutricion: require('./extras/extra_nutricion.png'),
    extra_sellos: require('./extras/extra_sellos.png'),

    extra_imc: require('./extras/extra_imc.png'),
    extra_imc2: require('./extras/extra_imc2.png'),
    extra_weight: require('./extras/extra_weight.png'),
    etiqueta_choco: require('./extras/etiqueta-choco.png'),
    etiqueta_jugo: require('./extras/etiqueta-jugo.png'),

    // bubbles
    flower: require('./bubbles/flower.png'),
    bouquet: require('./bubbles/bouquet.png'),
    idea: require('./bubbles/idea.png'),
    money: require('./bubbles/money.png'),
    question_mark: require('./bubbles/question_mark.png'),
    calendar: require('./bubbles/calendar.png'),
    flowers: require('./bubbles/flowers.png'),
    fraction: require('./bubbles/fraction.png'),
    questions: require('./bubbles/questions.png'),

    bubbleDesign: require('./bubbles/bubble-design.png'),
    bubbleHands: require('./bubbles/bubble-hands.png'),
    bubbleColors: require('./bubbles/bubble-colors.png'),

    bubbleNutricion: require('./bubbles/bubble-nutricion.png'),
    bubbleHealth: require('./bubbles/bb_health.png'),
    bubblePerson: require('./bubbles/bb_person.png'),
    bubbleWeight: require('./bubbles/bb_weight.png'),
  },

  background: {
    flowershop: require('./background/flowershop.png'),
    bodega: require('./background/bodega.png'),
    lucaOffice: require('./background/luca-office.png'),
    bg_nutricion1: require('./background/bg_nutricion1.png'),
    bg_nutricion2: require('./background/bg_nutricion2.png'),
  },

  icons: {
    barras: {
      circular: require('./icons/barras/circular.png'),
      square: require('./icons/barras/square.png'),
    },
    caja_girasol: {
      square: require('./icons/caja_girasol/square.png'),
    },
    caja_iris: {
      square: require('./icons/caja_iris/square.png'),
    },
    caja_margarita: {
      square: require('./icons/caja_margarita/square.png'),
    },
  },
  // old, borrar despues de mover
  character: {
    Diego: {
      happy: require('./character/diego/diego_happy.png'),
      troubled: require('./character/diego/diego_troubled.png'),
      smile: require('./character/diego/diego_smile.png'),
      bouquet: require('./character/diego/diego_happy.png'),
      chart: require('./extras/chart.png'),
    },
    Menhera: {
      normal: require('./character/menhera/menhera_normal.png'),
      cry: require('./character/menhera/menhera_cry.png'),
    },
    extras: {
      chart: require('./extras/chart_old.png'),
      paper: require('./extras/paper.png'),
      grafico_barras: require('./extras/grafico_barras.png'),
      grafico_circular: require('./extras/grafico_circular.png'),
    },
  },
  bubbles: {
    flower: require('./bubbles/flower.png'),
    bouquet: require('./bubbles/bouquet.png'),
    idea: require('./bubbles/idea.png'),
    money: require('./bubbles/money.png'),
    question_mark: require('./bubbles/question_mark.png'),
    calendar: require('./bubbles/calendar.png'),
    flowers: require('./bubbles/flowers.png'),
    fraction: require('./bubbles/fraction.png'),
    questions: require('./bubbles/questions.png'),
  },
};

export default images;

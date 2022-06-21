import {ImageSourcePropType} from 'react-native';

const images: {
  bubbles: {[key: string]: ImageSourcePropType};
  background: {[key: string]: ImageSourcePropType};
  character: {[character: string]: {[mood: string]: ImageSourcePropType}};
  icons: {
    [model: string]: {
      circular?: ImageSourcePropType;
      square?: ImageSourcePropType;
    };
  };
} = {
  character: {
    Diego: {
      happy: require('./character/diego/diego_happy.png'),
      troubled: require('./character/diego/diego_troubled.png'),
      smile: require('./character/diego/diego_happy.png'),
      bouquet: require('./character/diego/diego_happy.png'),
      chart: require('./character/diego/diego_chart.png'),
    },
    Menhera: {
      normal: require('./character/menhera/menhera_normal.png'),
      cry: require('./character/menhera/menhera_cry.png'),
    },
    extras: {
      chart: require('./character/extras/chart.png'),
      paper: require('./character/extras/paper.png'),
      grafico_barras: require('./character/extras/grafico_barras.png'),
      grafico_circular: require('./character/extras/grafico_circular.png'),
    },
  },
  background: {
    flowershop: require('./background/flowershop.png'),
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
  icons: {
    barras: {
      circular: require('./icons/barras/circular.png'),
      square: require('./icons/barras/square.png'),
    },
    cajita: {
      square: require('./icons/cajita/square.png'),
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
};

export default images;

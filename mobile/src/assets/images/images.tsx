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

    NoahHappy: require('./character/noah/noah-happy.png'),
    NoahQuestion: require('./character/noah/noah-question.png'),
    NoahSmile: require('./character/noah/noah-smile.png'),

    CarlosSmile: require('./character/carlos/carlos-smile.png'),
    CarlosHappy: require('./character/carlos/carlos-happy.png'),
    CarlosQuestion: require('./character/carlos/carlos-question.png'),

    LaylaQuestion: require('./character/layla/layla-question.png'),
    LaylaHappy: require('./character/layla/layla-happy.png'),
    LaylaSmile: require('./character/layla/layla-smile.png'),

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
    notebook_paper: require('./extras/notebook_paper.png'),
    silla_chueca: require('./extras/silla_chueca.png'),
    newsilla: require('./extras/newsilla.png'),
    taza_fail: require('./extras/taza_fail.png'),

    diseño1_color1: require('./extras/diseño1_color1.png'),
    diseño1_color2: require('./extras/diseño1_color2.png'),
    diseño1_cuadro1: require('./extras/diseño1_cuadro1.png'),
    diseño1_cuadro2: require('./extras/diseño1_cuadro2.png'),
    diseño1_paleta: require('./extras/diseño1_paleta.png'),
    diseño1_rueda1: require('./extras/diseño1_rueda.png'),
    diseño1_rueda2: require('./extras/diseño1_rueda2.png'),
    diseño1_rueda3: require('./extras/diseño1_rueda3.png'),
    diseño1_rueda4: require('./extras/diseño1_rueda4.png'),
    helado_naranjo: require('./extras/helado_naranjo.png'),
    libro_verdeazul: require('./extras/libro_verdeazul.png'),
    bolsa_rosa: require('./extras/bolsa_rosa.png'),
    diseño1_colores_primarios1: require('./extras/diseño1_colores_primarios1.png'),
    diseño1_colores_primarios2: require('./extras/diseño1_colores_primarios2.png'),
    diseño1_colores_suma1: require('./extras/diseño1_colores_suma1.png'),
    diseño1_colores_suma2: require('./extras/diseño1_colores_suma2.png'),
    diseño1_colores_suma3: require('./extras/diseño1_colores_suma3.png'),
    diseño1_colores_suma4: require('./extras/diseño1_colores_suma4.png'),
    temperas: require('./extras/temperas.png'),
    ryb: require('./extras/ryb.png'),
    caja1: require('./extras/caja1.png'),
    caja2: require('./extras/caja2.png'),
    caja3: require('./extras/caja3.png'),

    tempera_roja: require('./extras/tempera_roja.png'),
    tempera_negra: require('./extras/tempera_negra.png'),
    tempera_blanca: require('./extras/tempera_blanca.png'),
    tempera_amarilla: require('./extras/tempera_amarilla.png'),
    tempera_azul: require('./extras/tempera_azul.png'),

    lombriz1: require('./extras/lombriz1.png'),
    lombriz2: require('./extras/lombriz2.png'),
    lombriz3: require('./extras/lombriz3.png'),
    lombriz4: require('./extras/lombriz4.png'),
    lombriz5: require('./extras/lombriz5.png'),

    extra_nutricion: require('./extras/extra_nutricion.png'),
    extra_sellos: require('./extras/extra_sellos.png'),

    extra_imc: require('./extras/extra_imc.png'),
    extra_imc2: require('./extras/extra_imc2.png'),
    extra_weight: require('./extras/extra_weight.png'),
    etiqueta_choco: require('./extras/etiqueta-choco.png'),
    etiqueta_jugo: require('./extras/etiqueta-jugo.png'),
    etiqueta_muffin: require('./extras/etiqueta-muffin.png'),
    azucar1: require('./extras/azucar1.png'),
    azucar2: require('./extras/azucar2.png'),
    cocaAzucar: require('./extras/coca-azucar.png'),

    p1: require('./extras/p1.png'),
    p2: require('./extras/p2.png'),
    p3: require('./extras/p3.png'),
    p4: require('./extras/p4.png'),
    p5: require('./extras/p5.png'),

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
    bubbleExclamation: require('./bubbles/bubble_exclamation.png'),

    bubbleNutricion: require('./bubbles/bubble-nutricion.png'),
    bubbleHealth: require('./bubbles/bb_health.png'),
    bubblePerson: require('./bubbles/bb_person.png'),
    bubbleWeight: require('./bubbles/bb_weight.png'),

    bubbleLike: require('./bubbles/bubble-like.png'),
  },

  background: {
    flowershop: require('./background/flowershop.png'),
    bodega: require('./background/bodega.png'),
    lucaOffice: require('./background/luca-office.png'),
    bg_nutricion1: require('./background/bg_nutricion1.png'),
    bg_nutricion2: require('./background/bg_nutricion2.png'),
    bg_nutricion3: require('./background/bg_nutricion3.png'),
    bg_diseño1: require('./background/diseño1_introductorio.png'),
    bg_diseño2: require('./background/bg_diseño2.png'),
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
    phone: {
      square: require('./icons/phone/phone.png'),
    },
    pelota: {
      square: require('./icons/pelota/pelota.png'),
    },
    peluche: {
      square: require('./icons/peluche/peluche.png'),
    },
    pluma: {
      square: require('./icons/pluma/pluma.png'),
    },
    taza: {
      square: require('./icons/taza/taza.png'),
    },
    silla: {
      square: require('./icons/silla/silla.png'),
    },
    mug: {
      square: require('./icons/mug/mug.png'),
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

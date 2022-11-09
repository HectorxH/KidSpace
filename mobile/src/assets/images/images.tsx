import {ImageSourcePropType} from 'react-native';

const images: {
  background: {[key: string]: ImageSourcePropType};
  items: {[key: string]: ImageSourcePropType};
  icons: {
    [model: string]: {
      circular?: ImageSourcePropType;
      square: ImageSourcePropType;
    };
  };
  images360: {[key: string]: ImageSourcePropType};
  trackingTargets: {[key: string]: ImageSourcePropType};
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

    VictoriaSmile: require('./character/victoria/victoria_smile.png'),
    VictoriaHappy: require('./character/victoria/victoria_happy.png'),
    VictoriaQuestion: require('./character/victoria/victoria_question.png'),

    NatySmile: require('./character/naty/naty-smile.png'),
    NatyHappy: require('./character/naty/naty-happy.png'),
    NatyQuestion: require('./character/naty/naty-question.png'),

    AbelSmile: require('./character/abel/abel-smile.png'),
    AbelHappy: require('./character/abel/abel-happy.png'),
    AbelQuestion: require('./character/abel/abel-question.png'),

    AndreHappy: require('./character/andres/andres-happy.png'),
    AndreSmile: require('./character/andres/andres-smile.png'),
    AndreSad: require('./character/andres/andres-sad.png'),

    LauraHappy: require('./character/laura/laura-happy.png'),
    LauraQuestion: require('./character/laura/laura-question.png'),
    LauraSmile: require('./character/laura/laura-smile.png'),

    AlecHappy: require('./character/alec/alec-happy.png'),
    AlecQuestion: require('./character/alec/alec-question.png'),
    AlecSmile: require('./character/alec/alec-smile.png'),

    normal: require('./character/menhera/menhera_normal.png'),
    cry: require('./character/menhera/menhera_cry.png'),
    fbk: require('./trackingTargets/fbk.jpg'),

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
    taza_ok: require('./extras/taza_ok.png'),

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
    ejemplo_contraste1: require('./extras/ejemplo_contraste1.png'),
    ejemplo_contraste2: require('./extras/ejemplo_contraste2.png'),
    chillona: require('./extras/chillona.png'),

    mat1: require('./icons/caja_torta/mat1.png'),
    mat2: require('./icons/caja_torta/mat2.png'),
    mat3: require('./icons/caja_torta/mat3.png'),
    logo1: require('./icons/caja_torta/logo1.png'),
    logo2: require('./icons/caja_torta/logo2.png'),
    et1: require('./icons/caja_torta/etiqueta1.png'),
    et2: require('./icons/caja_torta/etiqueta2.png'),

    mat1_logo1_et1: require('./icons/caja_torta/mat1-logo1.png'),
    mat1_logo1_et2: require('./icons/caja_torta/mat1-logo1.png'),
    mat1_logo1_et3: require('./icons/caja_torta/mat1-logo1.png'),

    mat1_logo2_et1: require('./icons/caja_torta/mat1-logo2.png'),
    mat1_logo2_et2: require('./icons/caja_torta/mat1-logo2.png'),
    mat1_logo2_et3: require('./icons/caja_torta/mat1-logo2.png'),

    mat2_logo1_et1: require('./icons/caja_torta/mat2-logo1.png'),
    mat2_logo1_et2: require('./icons/caja_torta/mat2-logo1.png'),
    mat2_logo1_et3: require('./icons/caja_torta/mat2-logo1.png'),

    mat2_logo2_et1: require('./icons/caja_torta/mat2-logo2.png'),
    mat2_logo2_et2: require('./icons/caja_torta/mat2-logo2.png'),
    mat2_logo2_et3: require('./icons/caja_torta/mat2-logo2.png'),

    mat3_logo1_et1: require('./icons/caja_torta/mat3-logo1.png'),
    mat3_logo1_et2: require('./icons/caja_torta/mat3-logo1.png'),
    mat3_logo1_et3: require('./icons/caja_torta/mat3-logo1.png'),

    mat3_logo2_et1: require('./icons/caja_torta/mat3-logo2.png'),
    mat3_logo2_et2: require('./icons/caja_torta/mat3-logo2.png'),
    mat3_logo2_et3: require('./icons/caja_torta/mat3-logo2.png'),

    tempera_negra: require('./extras/tempera_negra.png'),
    tempera_blanca: require('./extras/tempera_blanca.png'),
    tempera_roja: require('./extras/tempera_roja.png'),
    tempera_azul: require('./extras/tempera_azul.png'),
    tempera_amarilla: require('./extras/tempera_amarilla.png'),

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
    persona1: require('./extras/persona1.png'),
    persona2: require('./extras/persona2.png'),
    persona3: require('./extras/persona3.png'),

    p1: require('./extras/p1.png'),
    p2: require('./extras/p2.png'),
    p3: require('./extras/p3.png'),
    p4: require('./extras/p4.png'),
    p5: require('./extras/p5.png'),

    materias_primas_1: require('./extras/materiales/materias_primas_1.png'),
    materias_primas_2: require('./extras/materiales/materias_primas_2.png'),
    materias_primas_3: require('./extras/materiales/materias_primas_3.png'),
    norte_chile: require('./extras/materiales/norte_chile.png'),
    norte_sur: require('./extras/materiales/norte_sur.png'),
    ojo_man: require('./extras/materiales/ojo_man.png'),
    unnecessary_cheering: require('./extras/materiales/unnecessary_cheering.png'),
    forestnt_1: require('./extras/materiales/forestnt_1.png'),
    forestnt_2: require('./extras/materiales/forestnt_2.png'),
    materiales_1: require('./extras/materiales/materiales_1.png'),
    materiales_2: require('./extras/materiales/materiales_2.png'),
    materiales_3: require('./extras/materiales/materiales_3.png'),
    leche_de_vaca: require('./extras/materiales/leche_de_vaca.png'),
    cobre: require('./extras/materiales/cobre.png'),
    hortalizas: require('./extras/materiales/hortalizas.png'),
    madera: require('./extras/materiales/madera.png'),
    chile: require('./extras/materiales/chile.png'),

    // informatica1
    informatica_1_1: require('./extras/informatica1/34.png'),
    informatica_1_2: require('./extras/informatica1/33.png'),
    informatica_1_3: require('./extras/informatica1/32.png'),
    informatica_1_4: require('./extras/informatica1/30.png'),
    informatica_1_5: require('./extras/informatica1/31.png'),
    informatica_1_6: require('./extras/informatica1/29.png'),
    informatica_1_7: require('./extras/informatica1/28.png'),
    informatica_1_8: require('./extras/informatica1/27.png'),
    informatica_1_9: require('./extras/informatica1/26.png'),
    informatica_1_10: require('./extras/informatica1/25.png'),
    informatica_1_11: require('./extras/informatica1/24.png'),
    informatica_1_12: require('./extras/informatica1/58.png'),
    informatica_1_13: require('./extras/informatica1/59.png'),
    informatica_1_14: require('./extras/informatica1/60.png'),
    informatica_1_15: require('./extras/informatica1/61.png'),
    informatica_1_16: require('./extras/informatica1/62.png'),
    informatica_1_17: require('./extras/informatica1/63.png'),
    informatica_1_18: require('./extras/informatica1/64.png'),
    informatica_1_19: require('./extras/informatica1/65.png'),
    informatica_1_20: require('./extras/informatica1/66.png'),
    informatica_1_21: require('./extras/informatica1/67.png'),
    informatica_1_22: require('./extras/informatica1/68.png'),
    informatica_1_23: require('./extras/informatica1/69.png'),
    informatica_1_24: require('./extras/informatica1/70.png'),
    informatica_1_25: require('./extras/informatica1/71.png'),
    informatica_1_26: require('./extras/informatica1/72.png'),

    //informatica2
    informatica_2_1: require('./extras/informatica2/19.png'),
    informatica_2_2: require('./extras/informatica2/18.png'),
    informatica_2_3: require('./extras/informatica2/17.png'),
    informatica_2_4: require('./extras/informatica2/16.png'),
    informatica_2_5: require('./extras/informatica2/56.png'),
    informatica_2_6: require('./extras/informatica2/54.png'),
    informatica_2_7: require('./extras/informatica2/53.png'),
    informatica_2_8: require('./extras/informatica2/52.png'),
    informatica_2_9: require('./extras/informatica2/51.png'),
    informatica_2_10: require('./extras/informatica2/50.png'),
    informatica_2_11: require('./extras/informatica2/49.png'),
    informatica_2_12: require('./extras/informatica2/48.png'),
    informatica_2_13: require('./extras/informatica2/47.png'),

    // Astronomia1
    astronomia_1_1: require('./extras/astronomia1/46.png'),
    astronomia_1_2: require('./extras/astronomia1/62.png'),
    astronomia_1_3: require('./extras/astronomia1/61.png'),
    astronomia_1_4: require('./extras/astronomia1/64.png'),
    astronomia_1_5: require('./extras/astronomia1/60.png'),
    astronomia_1_6: require('./extras/astronomia1/59.png'),
    astronomia_1_7: require('./extras/astronomia1/65.png'),
    astronomia_1_8: require('./extras/astronomia1/55.png'),
    astronomia_1_9: require('./extras/astronomia1/58.png'),
    astronomia_1_10: require('./extras/astronomia1/56.png'),
    astronomia_1_11: require('./extras/astronomia1/57.png'),
    astronomia_1_12: require('./extras/astronomia1/53.png'),
    astronomia_1_13: require('./extras/astronomia1/52.png'),
    astronomia_1_14: require('./extras/astronomia1/48.png'),
    astronomia_1_15: require('./extras/astronomia1/51.png'),
    astronomia_1_16: require('./extras/astronomia1/50.png'),
    astronomia_1_17: require('./extras/astronomia1/49.png'),
    astronomia_1_18: require('./extras/astronomia1/47.png'),
    creciente: require('./extras/astronomia1/creciente.png'),
    nueva: require('./extras/astronomia1/nueva.png'),
    llena: require('./extras/astronomia1/llena.png'),
    menguante: require('./extras/astronomia1/menguante.png'),
    solarTotal: require('./extras/astronomia1/solar-total.jpg'),
    lunaRoja: require('./extras/astronomia1/lunaroja.jpg'),
    sombraLunar: require('./extras/astronomia1/sombralunar.png'),

    // Astronomia2
    astronomia_2_1: require('./extras/astronomia2/1.png'),
    astronomia_2_2: require('./extras/astronomia2/2.png'),
    astronomia_2_3: require('./extras/astronomia2/3.png'),
    astronomia_2_4: require('./extras/astronomia2/4.png'),
    astronomia_2_5: require('./extras/astronomia2/5.png'),
    astronomia_2_6: require('./extras/astronomia2/6.png'),
    astronomia_2_7: require('./extras/astronomia2/7.png'),
    astronomia_2_8: require('./extras/astronomia2/8.png'),
    astronomia_2_9: require('./extras/astronomia2/9.png'),
    astronomia_2_10: require('./extras/astronomia2/10.png'),
    astronomia_2_11: require('./extras/astronomia2/11.png'),
    astronomia_2_12: require('./extras/astronomia2/12.png'),
    astronomia_2_13: require('./extras/astronomia2/13.png'),
    astronomia_2_14: require('./extras/astronomia2/14.png'),
    astronomia_2_15: require('./extras/astronomia2/15.png'),
    astronomia_2_16: require('./extras/astronomia2/16.png'),
    astronomia_2_17: require('./extras/astronomia2/17.png'),
    astronomia_2_18: require('./extras/astronomia2/18.png'),
    Betelguese: require('./extras/astronomia2/betelguese.png'),
    Rigel: require('./extras/astronomia2/rigel.png'),
    Sirius: require('./extras/astronomia2/sirius.png'),
    Sol: require('./extras/astronomia2/sol.png'),

    // Soluciones tecnologicas
    tecnologicas_1: require('./extras/tecnologicas/1.png'),
    tecnologicas_2: require('./extras/tecnologicas/2.png'),
    tecnologicas_3: require('./extras/tecnologicas/3.png'),
    tecnologicas_4: require('./extras/tecnologicas/4.png'),
    tecnologicas_5: require('./extras/tecnologicas/5.png'),
    tecnologicas_6: require('./extras/tecnologicas/6.png'),
    tecnologicas_7: require('./extras/tecnologicas/7.png'),
    tecnologicas_8: require('./extras/tecnologicas/8.png'),

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

    bubbleOk: require('./bubbles/bb_ok.png'),
    bubblePhoneParts: require('./bubbles/bb_phone_parts.png'),
    bubbleFeliz: require('./bubbles/bubblefeliz.png'),
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
    bg_materiales: require('./background/bg_materiales.png'),
    bg_informatica1: require('./background/bg_informatica1.png'),
    bg_informatica2: require('./background/bg_informatica2.png'),
    bg_astronomia1: require('./background/bg_astronomia1.png'),
    bg_astronomia2: require('./background/bg_astronomia2.png'),
    bg_tecnologicas: require('./background/bg_tecnologicas.png'),
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
    galletas: {
      square: require('./icons/galletas/galletas.png'),
    },
    cereal: {
      square: require('./icons/cereal/cereal.png'),
    },
    soda: {
      square: require('./icons/soda/soda.png'),
    },
    caja_torta: {
      square: require('./icons/caja_torta/caja_torta.png'),
    },
    portal_window_frame: {
      square: require('./icons/portal_window_frame/square.png'),
    },
    grafica: {
      square: require('./icons/grafica/grafica.png'),
    },
    grafica_aux: {
      square: require('./icons/grafica/grafica.png'),
    },
    ssd: {
      square: require('./icons/ssd/ssd.png'),
    },
    ssd_aux: {
      square: require('./icons/ssd/ssd.png'),
    },
    teclado: {
      square: require('./icons/teclado/teclado.png'),
    },
    teclado_aux: {
      square: require('./icons/teclado/teclado.png'),
    },
    norte: {
      square: require('./icons/portales/norte.png'),
    },
    sur: {
      square: require('./icons/portales/sur.png'),
    },
    centro: {
      square: require('./icons/portales/centro.png'),
    },
    austral: {
      square: require('./icons/portales/austral.png'),
    },
    estrella: {
      square: require('./icons/estrella/estrella.jpg'),
    },
    mesa: {
      square: require('./icons/mesa/mesa.jpg'),
    },
    martillo: {
      square: require('./icons/martillo/martillo.jpg'),
    },
    skate: {
      square: require('./icons/skate/skate.jpg'),
    },
  },

  images360: {
    antofagasta: require('../360/materiales/antofagasta.jpg'),
    lagos: require('../360/materiales/lagos.jpg'),
    rancagua: require('../360/materiales/rancagua.jpg'),
    valdivia: require('../360/materiales/valdivia.jpg'),
  },

  trackingTargets: {
    menhera: require('./trackingTargets/menhera.png'),
    fbk: require('./trackingTargets/fbk.jpg'),
    pipe1: require('./trackingTargets/pipe1.png'),
    pipe2: require('./trackingTargets/pipe2.png'),
    harina: require('./trackingTargets/harina.png'),
    hilo: require('./trackingTargets/hilo.png'),
    mermelada: require('./trackingTargets/mermelada.png'),
    papel: require('./trackingTargets/papel.png'),
    plastico: require('./trackingTargets/plastico.png'),
    vidrio: require('./trackingTargets/vidrio2.png'),
  },
};

export default images;

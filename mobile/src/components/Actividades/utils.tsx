import {FlexAlignType, StyleSheet, useWindowDimensions} from 'react-native';
import {
  IImagesSettings,
  ITextBoxSettings,
  ITextSettings,
} from '../../types/activity';
import {RSize} from '../../utils/responsive';

// lo intente, pero no funciono por temas de la cantidad de hooks en cada render
// a veces es diferente y crashea todo, reak klo
export const GetFontScale = (size: string | number) => {
  const {fontScale} = useWindowDimensions();
  console.log('fontScale', fontScale);
  if (typeof size === 'number') {
    return size / fontScale;
  } else {
    switch (size) {
      case 'xxl':
        return 26 / fontScale;
      case 'xl':
        return 25 / fontScale;
      case 'l':
        return 24 / fontScale;
      case 'm':
        return 23 / fontScale;
      case 'm':
        return 22 / fontScale;
      case 's':
        return 21 / fontScale;
      case 'xs':
        return 20 / fontScale;
      case 'xxs':
        return 19 / fontScale;
      case 'xxxs':
        return 18 / fontScale;
      case 'xxxxs':
        return 17 / fontScale;
      case 'xxxxxs':
        return 16 / fontScale;
      case 'xxxxxxs':
        return 15 / fontScale;
    }
  }

  return RSize(0.05, 'h');
};

export const GetFontSizes = (componentName: string) => {
  switch (componentName) {
    case 'texts':
      return GetFontScale('l');
    case 'answers':
      return GetFontScale('xxs');
    case 'answers':
      return GetFontScale('xxs');
  }

  return GetFontScale('m');
};

export function getSteam(actividad: string) {
  switch (actividad) {
    case 'diagramas':
      return [0, 1, 0, 0, 1];
    case 'tecnologia':
      return [0, 1, 1, 0, 0];
    case 'materiales':
      return [1, 0, 1, 0, 0];
    case 'reciclaje':
      return [1, 0, 1, 1, 0];
    case 'diseños':
      return [0, 0, 1, 1, 0];
    case 'informatica1':
      return [1, 1, 1, 0, 0];
    case 'informatica2':
      return [0, 1, 1, 0, 0];
    case 'astronomia1':
      return [1, 0, 0, 0, 1];
    case 'astronomia2':
      return [1, 0, 1, 0, 1];
    case 'nutricion1':
      return [1, 0, 0, 0, 1];
    case 'nutricion2':
      return [1, 0, 0, 0, 1];
    case 'diseño1':
      return [1, 0, 0, 1, 0];
    case 'diseño2':
      return [0, 0, 1, 1, 0];
  }
  return [0, 0, 0, 0, 0];
}

export function getNombreActividad(actividad: string) {
  switch (actividad) {
    case 'diagramas':
      return 'Diagramas';
    case 'tecnologia':
      return 'Soluciones tecnológicas';
    case 'materiales':
      return 'Materiales';
    case 'reciclaje':
      return 'Reciclaje';
    case 'diseños':
      return 'Diseños';
    case 'informatica1':
      return 'Informática y algoritmos en nuestra vida';
    case 'informatica2':
      return '¿Qué es un computador?';
    case 'astronomia1':
      return 'Tierra, Luna y Sol';
    case 'astronomia2':
      return '¿Qué vemos en el cielo nocturno?';
    case 'nutricion1':
      return 'Interpretando etiquetas de los alimentos';
    case 'nutricion2':
      return 'Analizando nuestra dieta';
    case 'diseño1':
      return 'Teoría de colores';
    case 'diseño2':
      return 'Diseño gráfico en nuestro alrededor';
  }
  return 'nn';
}

export function getTipoActividad(actividad: string) {
  const actividadesClase: string[] = [
    'diagramas',
    'tecnologia',
    'materiales',
    'reciclaje',
    'diseños',
  ];
  if (actividadesClase.includes(actividad)) {
    return 'clase';
  }
  return 'individual';
}

export function getNombreUnidad(actividad: string) {
  const unidad1: string[] = ['diagramas'];
  const unidad2: string[] = ['tecnologia', 'reciclaje'];
  const unidad3: string[] = ['materiales', 'diseños'];

  if (unidad1.includes(actividad)) {
    return 'Unidad 1';
  }
  if (unidad2.includes(actividad)) {
    return 'Unidad 2';
  }
  if (unidad3.includes(actividad)) {
    return 'Unidad 3';
  }

  return 'nn';
}

export function checkAnswers(
  requirements: number[],
  userAnswers: number[][][],
  userAnswersDropdown: number[][][],
  userAnswersQuiz: number[][],
  userDragAnswer: string[][][],
  rightDragAnswer: string[][][],
  userInputAnswers: number[][],
  rightInputsAnswers: number[][],
  selectedMaterial: string[][][],
) {
  // return true;

  var respuestasCorrectas =
    requirements
      .map(n =>
        userAnswers[n]
          .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        userAnswersDropdown[n]
          .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n => userAnswersQuiz[n].reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        userDragAnswer[n].map((draggableItems, draggableNumber) =>
          draggableItems
            .map((userAnswer, anserNumber) =>
              userAnswer === rightDragAnswer[n][draggableNumber][anserNumber]
                ? [1]
                : [0],
            )
            .reduce((x, y) => Number(x) + Number(y), 0),
        ),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        userInputAnswers[n]
          .map((userAnswer, idx) =>
            userAnswer === rightInputsAnswers[n][idx] ? [1] : [0],
          )
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        selectedMaterial[n]
          .map(userAnswer =>
            userAnswer
              .map(v =>
                (v !== 'default' ? [1] : [0]).reduce(
                  (x, y) => Number(x) + Number(y),
                  0,
                ),
              )
              .reduce((x, y) => Number(x) + Number(y), 0),
          )
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0);

  var cantidadRespuestas =
    requirements
      .map(n =>
        userAnswers[n]
          .map(b => b.length)
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        userAnswersDropdown[n]
          .map(b => b.length)
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n => userAnswersQuiz[n].length)
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n => rightDragAnswer[n].map(draggableItems => draggableItems.length))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n => rightInputsAnswers[n].length)
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        selectedMaterial[n]
          .map(userAnswer => userAnswer.length)
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0);

  return respuestasCorrectas === cantidadRespuestas;
}

export function checkDragAnswers(
  requirements: number[],
  userDragAnswer: string[][][],
  rightDragAnswer: string[][][],
) {
  // return true;

  var respuestasCorrectas = requirements
    .map(n =>
      userDragAnswer[n].map((draggableItems, draggableNumber) =>
        draggableItems
          .map((userAnswer, anserNumber) =>
            userAnswer === rightDragAnswer[n][draggableNumber][anserNumber]
              ? [1]
              : [0],
          )
          .reduce((x, y) => Number(x) + Number(y), 0),
      ),
    )
    .reduce((x, y) => Number(x) + Number(y), 0);

  var cantidadRespuestas = requirements
    .map(n => rightDragAnswer[n].map(draggableItems => draggableItems.length))
    .reduce((x, y) => Number(x) + Number(y), 0);

  return respuestasCorrectas === cantidadRespuestas;
}

interface BaseTextProps {
  elevation: number;
  fontSize: number;
  fontFamily: string;
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify';
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}
export function GetTextStyle(
  baseTextStyle: BaseTextProps,
  textStyle: ITextSettings | undefined,
) {
  const newTextStyle = typeof textStyle !== 'undefined' ? textStyle : {};
  const textStyles = StyleSheet.create({
    settings: {
      ...baseTextStyle,
      ...{
        textAlign:
          typeof newTextStyle.textAlign !== 'undefined'
            ? newTextStyle.textAlign
            : baseTextStyle.textAlign,
        elevation:
          typeof newTextStyle.elevation !== 'undefined'
            ? newTextStyle.elevation
            : baseTextStyle.elevation,
        fontSize:
          typeof newTextStyle.fontSize !== 'undefined'
            ? newTextStyle.fontSize
            : baseTextStyle.fontSize,
        fontFamily:
          typeof newTextStyle.fontFamily !== 'undefined'
            ? newTextStyle.fontFamily
            : baseTextStyle.fontFamily,
        fontWeight:
          typeof newTextStyle.fontWeight !== 'undefined'
            ? newTextStyle.fontWeight
            : baseTextStyle.fontWeight,
      },
    },
    textColor: {
      color:
        typeof newTextStyle !== 'undefined' ? newTextStyle.color : undefined,
    },
  });

  return textStyles;
}

interface BaseTextBoxProps {
  width: string;
  height: string;
  backgroundColor: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  paddingVertical: number;
  paddingHorizontal: number;
}
export function getTextBoxStyle(
  baseTextBoxStyle: BaseTextBoxProps,
  boxStyle: ITextBoxSettings | undefined,
) {
  const newTextBoxStyle = typeof boxStyle !== 'undefined' ? boxStyle : {};
  const boxStyles = StyleSheet.create({
    settings: {
      ...baseTextBoxStyle,
      ...{
        backgroundColor:
          typeof newTextBoxStyle.backgroundColor !== 'undefined'
            ? newTextBoxStyle.backgroundColor
            : baseTextBoxStyle.backgroundColor,
        borderRadius:
          typeof newTextBoxStyle.borderRadius !== 'undefined'
            ? RSize(newTextBoxStyle.borderRadius, 'h')
            : baseTextBoxStyle.borderRadius,
        borderWidth:
          typeof newTextBoxStyle.borderWidth !== 'undefined'
            ? RSize(newTextBoxStyle.borderWidth, 'h')
            : baseTextBoxStyle.borderWidth,
        borderColor:
          typeof newTextBoxStyle.borderColor !== 'undefined'
            ? newTextBoxStyle.borderColor
            : baseTextBoxStyle.borderColor,
        paddingVertical:
          typeof newTextBoxStyle.paddingVertical !== 'undefined'
            ? RSize(newTextBoxStyle.paddingVertical, 'h')
            : baseTextBoxStyle.paddingVertical,
        paddingHorizontal:
          typeof newTextBoxStyle.paddingHorizontal !== 'undefined'
            ? RSize(newTextBoxStyle.paddingHorizontal, 'h')
            : baseTextBoxStyle.paddingHorizontal,
        elevation:
          typeof newTextBoxStyle.elevation !== 'undefined'
            ? newTextBoxStyle.elevation
            : 0,
      },
    },
  });

  return boxStyles;
}

interface BaseImageProps {
  height: string;
  width: string;
  alignSelf: FlexAlignType | 'auto' | undefined;
  opacity: number;
}
export function getImageStyle(
  baseImageStyle: BaseImageProps,
  imageStyle: IImagesSettings | undefined,
) {
  const newImageStyle = typeof imageStyle !== 'undefined' ? imageStyle : {};
  const imageStyles = StyleSheet.create({
    settings: {
      ...baseImageStyle,
      ...{
        height:
          typeof newImageStyle.height !== 'undefined'
            ? newImageStyle.height
            : baseImageStyle.height,
        width:
          typeof newImageStyle.width !== 'undefined'
            ? newImageStyle.width
            : baseImageStyle.width,
        alignSelf:
          typeof newImageStyle.alignSelf !== 'undefined'
            ? newImageStyle.alignSelf
            : baseImageStyle.alignSelf,
        opacity:
          typeof newImageStyle.opacity !== 'undefined'
            ? newImageStyle.opacity
            : baseImageStyle.opacity,
        transform:
          typeof newImageStyle.transform !== 'undefined'
            ? newImageStyle.transform
            : [],
      },
    },
  });

  return imageStyles;
}

export function getColor(colors: string) {
  let color = '#FFFFFF';
  switch (colors) {
    case '#0098D5#000000':
    case '#000000#0098D5':
      color = '#216079';
      break;
    case '#0098D5#FFFFFF':
    case '#FFFFFF#0098D5':
      color = '#9EF3FF';
      break;
    case '#0098D5#FF1616':
    case '#FF1616#0098D5':
      color = '#A31B95';
      break;
    case '#0098D5#FFE700':
    case '#FFE700#0098D5':
      color = '#31C852';
      break;
    case '#0098D5#0098D5':
      color = '#0098D5';
      break;
    case '#FFFFFF#000000':
    case '#000000#FFFFFF':
      color = '#DADADA';
      break;
    case '#FFFFFF#FFFFFF':
      color = 'white';
      break;
    case '#FFFFFF#FF1616':
    case '#FF1616#FFFFFF':
      color = '#FFAFAD';
      break;
    case '#FFFFFF#FFE700':
    case '#FFE700#FFFFFF':
      color = '#FFF6A4';
      break;

    case '#000000#000000':
      color = 'black';
      break;
    case '#000000#FF1616':
    case '#FF1616#000000':
      color = '#63313C';
      break;
    case '#000000#FFE700':
    case '#FFE700#000000':
      color = '#736C27';
      break;

    case '#FF1616#FF1616':
      color = '#FF1616';
      break;
    case '#FF1616#FFE700':
    case '#FFE700#FF1616':
      color = '#ED801C';
      break;

    case '#FFE700#FFE700':
      color = '#FFE700';
      break;
  }
  return color;
}

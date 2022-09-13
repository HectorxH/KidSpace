import {FlexAlignType, StyleSheet} from 'react-native';
import {
  IAlternativasSettings,
  IImagesSettings,
  ITextBoxSettings,
  ITextSettings,
} from '../../types/activity';
import {RSize} from '../../utils/responsive';

export function checkAnswers(
  userAnswers: number[][][],
  userAnswersDropdown: number[][][],
  userAnswersQuiz: number[][],
  requirements: number[],
  userDragAnswer: string[],
  rightDragAnswer: string[],
) {
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
      .map(n => (userDragAnswer[n] === rightDragAnswer[n] ? [1] : [0]))
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
    requirements.length;

  console.log(respuestasCorrectas, cantidadRespuestas);
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
export function getTextStyle(
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
            ? RSize(newTextStyle.fontSize, 'h')
            : baseTextStyle.fontSize,
        fontFamily:
          typeof newTextStyle.fontFamily !== 'undefined'
            ? newTextStyle.fontFamily
            : baseTextStyle.fontFamily,
        fontWeight:
          typeof newTextStyle.fontSize !== 'undefined'
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
      },
    },
  });

  return imageStyles;
}

interface BaseAnswerProps {
  height: string;
  width: string;
  alignSelf: FlexAlignType | 'auto' | undefined;
  opacity: number;
}
export function getAnswerStyle(
  baseAnswerStyle: BaseAnswerProps,
  answerStyle: IAlternativasSettings | undefined,
) {
  const newAnswerStyle = typeof answerStyle !== 'undefined' ? answerStyle : {};
  const answerStyles = StyleSheet.create({
    settings: {
      ...baseAnswerStyle,
      ...{
        elevation:
          typeof newAnswerStyle.elevation !== 'undefined'
            ? newAnswerStyle.elevation
            : 1,
      },
    },
  });

  return answerStyles;
}

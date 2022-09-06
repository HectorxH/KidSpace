import {StyleSheet} from 'react-native';
import {ITextSettings} from '../../types/activity';
import {RSize} from '../../utils/responsive';

export function checkAnswers(
  userAnswers: number[][][],
  userAnswersDropdown: number[][][],
  userAnswersQuiz: number[][],
  requirements: number[],
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
      .reduce((x, y) => Number(x) + Number(y), 0);

  console.log(respuestasCorrectas, cantidadRespuestas);
  return respuestasCorrectas === cantidadRespuestas;
}

// var respuestasCorrectas =
// userAnswers
//   .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
//   .reduce((x, y) => Number(x) + Number(y), 0) +
// userAnswersDropdown
//   .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
//   .reduce((x, y) => Number(x) + Number(y), 0) +
// userAnswersQuiz.reduce((x, y) => Number(x) + Number(y), 0);

// var cantidadRespuestas =
// userAnswers.map(b => b.length).reduce((x, y) => Number(x) + Number(y), 0) +
// userAnswersDropdown
//   .map(b => b.length)
//   .reduce((x, y) => Number(x) + Number(y), 0) +
// userAnswersQuiz.length;

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

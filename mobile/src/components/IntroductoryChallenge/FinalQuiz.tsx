import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import FinalQuizQuestion from './FinalQuizQuestion';

const FinalQuiz = ({navigation, route}) => {
  const headerTitle = 'Quiz Final';
  const pregunta1 = '1. Seleccione la opción correcta';
  const pregunta2 = '2. Seleccione la opción correcta';
  const enunciado1 = 'El software Excel permite crear tablas y ______';
  const enunciado2 =
    'Para elaborar un gráfico, debemos usar valores guardados en ______';
  const alternativas1 = ['imágenes', 'gráficos', 'celdas'];
  const alternativas2 = ['una lista', 'una celda', 'una tabla'];

  const rightAnswer1 = 'gráficos';
  const rightAnswer2 = 'una tabla';

  const [answersCount, setAnswersCount] = useState(0);

  const [topAnswer, setTopAnswer] = useState(0);
  const [bottomAnswer, setBottomAnswer] = useState(0);

  function Terminar() {
    navigation?.push('MainMap');
  }
  return (
    <View style={styles.verticalContainer}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      <View style={styles.horizontalContainer}>
        <View style={styles.body}>
          <View style={styles.preguntas}>
            <FinalQuizQuestion
              pregunta={pregunta1}
              enunciado={enunciado1}
              alternativas={alternativas1}
              rightAnswer={rightAnswer1}
              answersCount={[answersCount, setAnswersCount]}
              answer={[topAnswer, setTopAnswer]}
            />
            <FinalQuizQuestion
              pregunta={pregunta2}
              enunciado={enunciado2}
              alternativas={alternativas2}
              rightAnswer={rightAnswer2}
              answersCount={[answersCount, setAnswersCount]}
              answer={[bottomAnswer, setBottomAnswer]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color="#A1C96A"
              style={styles.buttonStyle}
              onPress={() => Terminar()}>
              <Text style={styles.textStyle}>Terminar</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    height: '100%',
    flexDirection: 'column',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: RSize(0.05),
  },
  header: {
    padding: RSize(0.002),
    justifyContent: 'center',
    backgroundColor: '#EE93C6',
    elevation: RSize(0.01),
  },
  body: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontSize: RSize(0.035),
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    color: 'white',
  },
  preguntas: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    borderRadius: RSize(0.02),
    justifyContent: 'center',
    paddingHorizontal: RSize(0.04),
  },
  textStyle: {
    fontSize: RSize(0.03),
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
});

export default FinalQuiz;

import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {Button} from 'react-native-paper';
import FinalQuizQuestion from './FinalQuizQuestion';

const FinalQuiz = () => {
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

  return (
    <View style={styles.verticalContainer}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      <View style={styles.horizontalContainer}>
        <View style={styles.pad} />
        <View style={styles.body}>
          <View style={styles.preguntas}>
            <FinalQuizQuestion
              pregunta={pregunta1}
              enunciado={enunciado1}
              alternativas={alternativas1}
              rightAnswer={rightAnswer1}
              answersCount={answersCount}
              setAnswersCount={setAnswersCount}
              setAnswer={setTopAnswer}
              answer={topAnswer}
            />
          </View>
          <View style={styles.preguntas}>
            <FinalQuizQuestion
              pregunta={pregunta2}
              enunciado={enunciado2}
              alternativas={alternativas2}
              rightAnswer={rightAnswer2}
              answersCount={answersCount}
              setAnswersCount={setAnswersCount}
              setAnswer={setBottomAnswer}
              answer={bottomAnswer}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.pad} />
            <Button
              mode="contained"
              color="#A1C96A"
              style={styles.buttonStyle}
              onPress={() => {}}>
              <Text style={styles.textStyle}>Terminar</Text>
            </Button>
            <View style={styles.pad} />
          </View>
          <View style={styles.pad} />
        </View>
        <View style={styles.pad} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  horizontalContainer: {
    flex: 7,
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EE93C6',
  },
  body: {
    flex: 12,
    flexDirection: 'column',
  },
  pad: {
    flex: 1,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'Poppins',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  preguntas: {
    flex: 5,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  buttonStyle: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    height: '100%',
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins',
  },
});

export default FinalQuiz;

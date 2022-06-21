import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {Button} from 'react-native-paper';

const FinalQuizQuestion = props => {
  const pregunta = props.pregunta;
  const enunciado = props.enunciado;
  const alternativas = props.alternativas;

  const rightAnswer = props.answer;

  const [answerStyles, setAnswerStyles] = useState({
    0: styles.answerButton,
    1: styles.answerButton,
    2: styles.answerButton,
  });

  const [answerTextStyles, setAnswerTextStyles] = useState({
    0: styles.answerText,
    1: styles.answerText,
    2: styles.answerText,
  });
  // function checkAnswer(answer: any, index: number) {
  //   if (answer === rightAnswer) {
  //     setAnswerStyles({
  //       0: index === 0 ? styles.rightAnswerButton : answerStyles[0],
  //       1: index === 1 ? styles.rightAnswerButton : answerStyles[1],
  //       2: index === 2 ? styles.rightAnswerButton : answerStyles[2],
  //     });
  //     if (answerFlag === 0){
  //       setAnswersCount(answersCount + 1);
  //     }
  //     setAnswer(1);
  //   } else {
  //     setAnswerStyles({
  //       0: index === 0 ? styles.wrongAnswerButton : answerStyles[0],
  //       1: index === 1 ? styles.wrongAnswerButton : answerStyles[1],
  //       2: index === 2 ? styles.wrongAnswerButton : answerStyles[2],
  //     });
  //   }
  // }
  return (
    <View style={styles.body}>
      <View style={styles.pad} />
      <View style={styles.pregunta}>
        <Text style={styles.preguntaText}>{pregunta}</Text>
      </View>
      <View style={styles.descripcion}>
        <Text style={styles.descripcionText}>{enunciado}</Text>
      </View>
      <View style={styles.alternativas}>
        <View />
      </View>
      <View style={styles.pad} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  pad: {
    flex: 1,
  },
  pregunta: {
    flex: 1,
  },
  descripcion: {
    flex: 1,
  },
  alternativas: {
    flex: 2,
  },
  buttonContainer: {
    flex: 2,
  },
  preguntaText: {
    color: '#063D69',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    justifyContent: 'center',
  },
  descripcionText: {
    color: '#063D69',
    fontSize: 24,
    fontFamily: 'Poppins',
    justifyContent: 'center',
  },
  answerButton: {
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#5C9DEC',
  },
  answerText: {
    height: '100%',
    color: '#063D69',
    textTransform: 'none',
  },
});

export default FinalQuizQuestion;

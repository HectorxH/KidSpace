import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Answers from './FinalQuizAnswers';

const FinalQuizQuestion = props => {
  const pregunta = props.pregunta;
  const enunciado = props.enunciado;
  const alternativas = props.alternativas;
  const answersCount = props.answersCount;
  const setAnswersCount = props.setAnswersCount;
  const rightAnswer = props.rightAnswer;
  const setAnswer = props.setAnswer;
  const answer = props.answer;

  return (
    <View style={styles.body}>
      {/* <View style={styles.pad} /> */}
      <View style={styles.pregunta}>
        <Text style={styles.preguntaText}>{pregunta}</Text>
      </View>
      <View style={styles.descripcion}>
        <Text style={styles.descripcionText}>{enunciado}</Text>
      </View>
      <View style={styles.alternativas}>
        <Answers
          messageAnswers={alternativas}
          rightAnswer={rightAnswer}
          answersCount={answersCount}
          setAnswersCount={setAnswersCount}
          setAnswer={setAnswer}
          answer={answer}
          orientation="row"
        />
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
    justifyContent: 'center',
  },
  descripcion: {
    flex: 2,
    justifyContent: 'center',
  },
  alternativas: {
    flex: 2,
    justifyContent: 'center',
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

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';
import Answers from './FinalQuizAnswers';

interface FinalQuizQuestionProps {
  pregunta: string;
  enunciado: string;
  alternativas: string[];
  answersCount: [number, ReactStateSetter<number>];
  rightAnswer: string;
  answer: [number, ReactStateSetter<number>];
}

const FinalQuizQuestion = (props: FinalQuizQuestionProps) => {
  const pregunta = props.pregunta;
  const enunciado = props.enunciado;
  const alternativas = props.alternativas;
  const [answersCount, setAnswersCount] = props.answersCount;
  const rightAnswer = props.rightAnswer;
  const [answer, setAnswer] = props.answer;

  return (
    <View style={styles.body}>
      <Text style={styles.preguntaText}>{pregunta}</Text>
      <Text style={styles.descripcionText}>{enunciado}</Text>
      <Answers
        messageAnswers={alternativas}
        rightAnswer={rightAnswer}
        answersCount={[answersCount, setAnswersCount]}
        answer={[answer, setAnswer]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  preguntaText: {
    color: '#063D69',
    fontSize: RSize(0.038, 'h'),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
  },
  descripcionText: {
    color: '#063D69',
    fontSize: RSize(0.035, 'h'),
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
  },
});

export default FinalQuizQuestion;

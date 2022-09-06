import React from 'react';
import {View, StyleSheet} from 'react-native';
import Answers from './Answers';
import {ReactStateSetter} from '../../types/others';
import {IAlternativas, IQuiz} from '../../types/activity';
import QuizAnswers from './QuizAnswers';

interface AlternativasProps {
  questions: IAlternativas[] | never[];
  quiz: IQuiz[] | never[];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];
  pageNumber: number;
}

const Alternativas = (props: AlternativasProps) => {
  if (props.questions.length === 0 && props.quiz.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {props.questions.length !== 0 &&
        props.questions.map((question: IAlternativas, index) => {
          return (
            <View style={styles.overlay} key={index.toString()}>
              <Answers
                question={question}
                userAnswers={props.userAnswers}
                pickedAnswers={props.pickedAnswers}
                pageNumber={props.pageNumber}
                answerNumber={index}
              />
            </View>
          );
        })}
      {props.quiz.length !== 0 &&
        props.quiz.map((question: IQuiz, index) => {
          return (
            <View style={styles.overlay} key={index.toString()}>
              <QuizAnswers
                question={question}
                userAnswersQuiz={props.userAnswersQuiz}
                pickedAnswersQuiz={props.pickedAnswersQuiz}
                pageNumber={props.pageNumber}
                answerNumber={index}
              />
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
});

export default Alternativas;

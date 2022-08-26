import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import Answers from './Answers';

interface QuestionsProps {
  questions:
    | [
        {
          tipo: string;
          rightChoice: string;
          choices: [];
          rightAnswer: [string];
          answers: [{text: string; start: number[]; end: number[]}];
        },
      ]
    | [];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pageNumber: number;
}

const Questions = (props: QuestionsProps) => {
  if (props.questions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {props.questions.map(
        (
          question: {
            tipo: string;
            rightChoice: string;
            choices: [];
            rightAnswer: [string];
            answers: [{text: string; start: number[]; end: number[]}];
          },
          index,
        ) => {
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
        },
      )}
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

export default Questions;

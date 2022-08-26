import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';
import Layout from '../Utils/Layout';

interface AnswersProps {
  question: {
    tipo: string;
    rightChoice: string;
    choices: [];
    rightAnswer: [string];
    answers: [{text: string; start: number[]; end: number[]}];
  };
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pageNumber: number;
  answerNumber: number;
}

const Answers = (props: AnswersProps) => {
  const [userAnswers, setUserAnswers] = props.userAnswers;
  const [pickedAnswers, setPickedAnswers] = props.pickedAnswers;

  const messageAnswers = props.question.answers;
  const rightAnswer = props.question.rightAnswer;
  const pageNumber = props.pageNumber;
  const answerNumber = props.answerNumber;

  const answerButtonColor = ['white', '#F96A61', '#A1C96A'];
  const answerButtonStyles = [
    styles.answerButton,
    styles.wrongAnswerButton,
    styles.rightAnswerButton,
  ];
  const answerTextStyles = [
    styles.answerText,
    styles.wrongAnswerText,
    styles.rightAnswerText,
  ];
  function checkAnswer(answer: string, index: number) {
    let newUserAnswers = [...userAnswers];
    let newPickedAnswers = [...pickedAnswers];
    if (rightAnswer.includes(answer)) {
      let answerIndex = rightAnswer.indexOf(answer);
      newPickedAnswers[pageNumber][answerNumber][index] = 2;
      newUserAnswers[pageNumber][answerNumber][answerIndex] = 1;
      setUserAnswers(newUserAnswers);
    } else {
      newPickedAnswers[pageNumber][answerNumber][index] = 1;
    }
    setPickedAnswers(newPickedAnswers);
  }

  return (
    <View style={styles.container}>
      {messageAnswers.map(
        (item: {text: string; start: number[]; end: number[]}, index) => {
          return (
            <View style={styles.overlay} key={index.toString()}>
              <Layout
                object={item}
                ObjectView={
                  <Button
                    mode="contained"
                    style={
                      answerButtonStyles[
                        pickedAnswers[pageNumber][answerNumber][index]
                      ]
                    }
                    color={
                      answerButtonColor[
                        pickedAnswers[pageNumber][answerNumber][index]
                      ]
                    }
                    onPress={() => checkAnswer(item.text, index)}>
                    <Text
                      style={
                        answerTextStyles[
                          pickedAnswers[pageNumber][answerNumber][index]
                        ]
                      }>
                      {item.text}
                    </Text>
                  </Button>
                }
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
  answerButton: {
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
  },
  wrongAnswerButton: {
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
  },
  rightAnswerButton: {
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
  },
  answerText: {
    color: '#063D69',
    textTransform: 'none',
    fontSize: RSize(0.035, 'h'),
  },
  wrongAnswerText: {
    color: '#ffffff',
    fontSize: RSize(0.035, 'h'),
    textTransform: 'none',
  },
  rightAnswerText: {
    color: '#ffffff',
    fontSize: RSize(0.035, 'h'),
    textTransform: 'none',
  },
});

export default Answers;

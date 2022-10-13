import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import Layout from '../Utils/Layout';
import {ReactStateSetter} from '../../types/others';
import {IQuiz} from '../../types/activity';
import {IAnswers} from '../../types/activity';

interface QuizAnswersProps {
  question: IQuiz;
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];
  pageNumber: number;
  answerNumber: number;
}

const QuizAnswers = (props: QuizAnswersProps) => {
  const {fontScale} = useWindowDimensions();
  const [userAnswers, setUserAnswers] = props.userAnswersQuiz;
  const [pickedAnswers, setPickedAnswers] = props.pickedAnswersQuiz;

  const messageAnswers = props.question.answers;
  const pageNumber = props.pageNumber;
  const answerNumber = props.answerNumber;

  const answerButtonColor = ['white', '#5C9DEC'];
  const answerButtonStyles = [styles.answerButton, styles.selectedAnswerButton];
  const answerTextStyles = [styles.answerText, styles.selectedAnswerText];

  function checkAnswer(index: number) {
    let newUserAnswers = [...userAnswers];
    let newPickedAnswers = [...pickedAnswers];
    for (
      let i = 0;
      i < newPickedAnswers[pageNumber][answerNumber].length;
      i++
    ) {
      newPickedAnswers[pageNumber][answerNumber][i] = 0;
    }

    newPickedAnswers[pageNumber][answerNumber][index] = 1;
    newUserAnswers[pageNumber][answerNumber] = 1;

    setUserAnswers(newUserAnswers);
    setPickedAnswers(newPickedAnswers);
    console.log(newPickedAnswers[pageNumber][answerNumber]);
  }

  return (
    <View style={styles.container}>
      {messageAnswers.map((item: IAnswers, index) => {
        let answerTextSylye =
          answerTextStyles[pickedAnswers[pageNumber][answerNumber][index]];
        return (
          <View style={styles.overlay} key={index.toString()}>
            <Layout
              position={item.position}
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
                  onPress={() => checkAnswer(index)}>
                  <Text
                    style={[
                      answerTextSylye,
                      {fontSize: answerTextSylye.fontSize / fontScale},
                    ]}>
                    {item.text}
                  </Text>
                </Button>
              }
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
  answerButton: {
    borderRadius: RSize(1, 'h'),
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
    elevation: 7,
  },
  selectedAnswerButton: {
    borderRadius: RSize(1, 'h'),
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
    elevation: 7,
  },
  answerText: {
    color: '#063D69',
    textTransform: 'none',
    fontSize: 15,
  },
  selectedAnswerText: {
    color: '#ffffff',
    fontSize: 15,
    textTransform: 'none',
  },
});

export default QuizAnswers;

import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

interface QuestionsProps {
  questions:
    | [
        {
          rightAnswer: string;
          answers: [{text: string; start: Int32Array; end: Int32Array}];
        },
      ]
    | 'none';
  canMove: [number, ReactStateSetter<number>];
}

const Questions = (props: QuestionsProps) => {
  if (props.questions === 'none') {
    return null;
  }

  const [, setCanMove] = props.canMove;
  // const messageAnswers = props.messageAnswers;
  // const rightAnswer = props.rightAnswer;

  // const [answerStyles, setAnswerStyles] = useState({
  //   0: styles.answerButton,
  //   1: styles.answerButton,
  //   2: styles.answerButton,
  // });

  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map((number) => number * 2);
  const [answerStyles, setAnswerStyles] = useState(
    props.questions.map((rightAnswer: string, answers: [{text: string, start: Int32Array; end: Int32Array}], index: number) => {
        return (
          <Text
            style={index % 2 === 1 ? styles.oddText : styles.evenText}
            key={word}>
            {word}
          </Text>
        );
      })}
  );

  const [answerTextStyles, setAnswerTextStyles] = useState({
    0: styles.answerText,
    1: styles.answerText,
    2: styles.answerText,
  });

  function checkAnswer(answer: any, index: number) {
    if (answer === rightAnswer) {
      setAnswerStyles({
        0: index === 0 ? styles.rightAnswerButton : answerStyles[0],
        1: index === 1 ? styles.rightAnswerButton : answerStyles[1],
        2: index === 2 ? styles.rightAnswerButton : answerStyles[2],
      });
      setCanMove(1);
    } else {
      setAnswerStyles({
        0: index === 0 ? styles.wrongAnswerButton : answerStyles[0],
        1: index === 1 ? styles.wrongAnswerButton : answerStyles[1],
        2: index === 2 ? styles.wrongAnswerButton : answerStyles[2],
      });
    }
    updateAnswerText(answer, index);
  }

  function updateAnswerText(answer: any, index: number) {
    if (answer === rightAnswer) {
      setAnswerTextStyles({
        0: index === 0 ? styles.rightAnswerText : answerTextStyles[0],
        1: index === 1 ? styles.rightAnswerText : answerTextStyles[1],
        2: index === 2 ? styles.rightAnswerText : answerTextStyles[2],
      });
    } else {
      setAnswerTextStyles({
        0: index === 0 ? styles.wrongAnswerText : answerTextStyles[0],
        1: index === 1 ? styles.wrongAnswerText : answerTextStyles[1],
        2: index === 2 ? styles.wrongAnswerText : answerTextStyles[2],
      });
    }
  }

  return (
    <View style={styles.horizontalContainer}>
      <View style={styles.padding} />
      <View style={styles.verticalContainer}>
        <View style={styles.topPadding} />
        <View style={styles.answerBox}>
          {messageAnswers.map((answer: string, index: number) => {
            const style = answerStyles[index as 0 | 1 | 2];
            return (
              <View style={styles.container} key={index + 1000}>
                <View style={styles.padding} key={index + 2000} />
                <View style={styles.answerButtonBox} key={index + 3000}>
                  <Button
                    key={answer}
                    mode="contained"
                    color={
                      style === styles.rightAnswerButton
                        ? '#A1C96A'
                        : style === styles.wrongAnswerButton
                        ? '#F96A61'
                        : 'white'
                    }
                    style={style}
                    onPress={() => checkAnswer(answer, index)}>
                    <Text
                      key={index + 4000}
                      style={answerTextStyles[index as 0 | 1 | 2]}>
                      {answer}
                    </Text>
                  </Button>
                </View>
              </View>
            );
          })}
          <View style={styles.padding} />
        </View>
        <View />
      </View>
      <View style={styles.padding} />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  verticalContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  container: {
    flex: 4,
  },
  padding: {
    flex: 1,
  },
  topPadding: {
    flex: 13,
  },
  answerBox: {
    flex: 17,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  answerButtonBox: {
    justifyContent: 'center',
    flex: 3,
  },
  answerButton: {
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
  wrongAnswerButton: {
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
  },
  wrongAnswerText: {
    color: '#ffffff',
    fontSize: RSize(0.035, 'h'),
    textTransform: 'none',
  },
  rightAnswerButton: {
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
  },
  rightAnswerText: {
    color: '#ffffff',
    fontSize: RSize(0.035, 'h'),
    textTransform: 'none',
  },
});

export default Questions;

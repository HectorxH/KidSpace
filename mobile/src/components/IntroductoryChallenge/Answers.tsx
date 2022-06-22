import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

interface AnswerProps {
  messageAnswers: [string, string, string];
  rightAnswer: string;
  answersCount: [number, ReactStateSetter<number>];
  answer: [number, ReactStateSetter<number>];
}

const Answer = (props: AnswerProps) => {
  const messageAnswers = props.messageAnswers;
  const rightAnswer = props.rightAnswer;
  const [answersCount, setAnswersCount] = props.answersCount;
  const [answerFlag, setAnswer] = props.answer;

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

  function checkAnswer(answer: string, index: 0 | 1 | 2) {
    if (answer === rightAnswer) {
      setAnswerStyles({
        0: index === 0 ? styles.rightAnswerButton : answerStyles[0],
        1: index === 1 ? styles.rightAnswerButton : answerStyles[1],
        2: index === 2 ? styles.rightAnswerButton : answerStyles[2],
      });
      if (answerFlag === 0) {
        setAnswersCount(answersCount + 1);
      }
      setAnswer(1);
    } else {
      setAnswerStyles({
        0: index === 0 ? styles.wrongAnswerButton : answerStyles[0],
        1: index === 1 ? styles.wrongAnswerButton : answerStyles[1],
        2: index === 2 ? styles.wrongAnswerButton : answerStyles[2],
      });
    }
    updateAnswerText(answer, index);
  }

  function updateAnswerText(answer: string, index: 0 | 1 | 2) {
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
    <View style={styles.verticalContainer}>
      <View style={styles.topPadding} />
      <View style={styles.answerBox}>
        {messageAnswers.map((answer: string, index: number) => {
          const style = answerStyles[index as 0 | 1 | 2];
          return (
            <View
              style={styles.container}
              key={answer + (index + 1000).toString()}>
              <View
                style={styles.padding}
                key={answer + (index + 2000).toString()}
              />
              <View
                style={styles.answerButtonBox}
                key={answer + (index + 3000).toString()}>
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
                  onPress={() => checkAnswer(answer, index as 0 | 1 | 2)}>
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
      <View style={styles.bottomPadding} />
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  topPadding: {
    flex: 1,
  },
  bottomPadding: {
    flex: 1,
  },
  answerBox: {
    flex: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    padding: 4,
  },
  padding: {
    flex: 1,
  },

  answerButtonBox: {
    justifyContent: 'center',
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
    fontFamily: 'Poppins-Bold',
  },
  wrongAnswerText: {
    color: '#ffffff',
    fontSize: RSize(0.035, 'h'),
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
  rightAnswerText: {
    color: '#ffffff',
    fontSize: RSize(0.035, 'h'),
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
});

export default Answer;

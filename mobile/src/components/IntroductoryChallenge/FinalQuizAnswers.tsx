import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const Answers = props => {
  const messageAnswers = props.messageAnswers;
  const rightAnswer = props.rightAnswer;
  const answersCount = props.answersCount;
  const setAnswersCount = props.setAnswersCount;
  const setAnswer = props.setAnswer;
  const answerFlag = props.answer;

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

  function checkAnswer(answer: any, index: number) {
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
      <View style={styles.pad} />
      {messageAnswers.map((answer: any, index: number) => {
        return (
          <View
            style={styles.container}
            key={answer + (index + 1000).toString()}>
            {/* <View style={styles.pad} key={answer + (index + 2000).toString()} /> */}
            <View
              style={styles.answerButtonBox}
              key={answer + (index + 3000).toString()}>
              <Button
                key={answer}
                mode="contained"
                color={
                  answerStyles[index] === styles.rightAnswerButton
                    ? '#ccefd2'
                    : answerStyles[index] === styles.wrongAnswerButton
                    ? '#efccd2'
                    : 'white'
                }
                style={answerStyles[index]}
                onPress={() => checkAnswer(answer, index)}>
                <Text key={index + 4000} style={answerTextStyles[index]}>
                  {answer}
                </Text>
              </Button>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  pad: {
    flex: 1,
  },
  answerBox: {
    flex: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  container: {
    // padding: 4,
  },

  answerButtonBox: {
    justifyContent: 'center',
  },
  answerButton: {
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#5C9DEC',
  },
  wrongAnswerButton: {
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#b00020',
    color: '#efccd2',
  },
  rightAnswerButton: {
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#00b020',
    color: '#ccefd2',
  },
  answerText: {
    height: '100%',
    color: '#063D69',
    textTransform: 'none',
  },
  wrongAnswerText: {
    height: '100%',
    color: '#b00020',
    // fontSize: 15,
    textTransform: 'none',
  },
  rightAnswerText: {
    height: '100%',
    color: '#00b020',
    // fontSize: 15,
    textTransform: 'none',
  },
});

export default Answers;

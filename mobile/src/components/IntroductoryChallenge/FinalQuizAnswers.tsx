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
      {messageAnswers.map((answer: any, index: number) => {
        return (
          <View
            style={styles.container}
            key={answer + (index + 1000).toString()}>
            <View
              style={styles.answerButtonBox}
              key={answer + (index + 3000).toString()}>
              <View
                style={styles.pad}
                key={answer + (index + 2000).toString()}
              />
              <Button
                key={answer}
                mode="contained"
                color={
                  answerStyles[index] === styles.rightAnswerButton
                    ? '#5C9DEC'
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
    justifyContent: 'space-evenly',
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
    // flex: 2,
    width: '20%',
    justifyContent: 'space-between',
  },

  answerButtonBox: {
    justifyContent: 'center',
  },
  answerButton: {
    borderRadius: 18,
    // borderWidth: 3,
    justifyContent: 'center',
    height: '100%',
    borderColor: '#5C9DEC',
    elevation: 7,
  },
  wrongAnswerButton: {
    borderRadius: 18,
    // borderWidth: 3,
    justifyContent: 'center',
    height: '100%',
    borderColor: '#b00020',
    color: '#efccd2',
    elevation: 7,
  },
  rightAnswerButton: {
    borderRadius: 18,
    // borderWidth: 3,
    justifyContent: 'center',
    height: '100%',
    borderColor: '#00b020',
    color: '#5C9DEC',
    elevation: 7,
  },
  answerText: {
    height: '100%',
    color: '#063D69',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'none',
  },
  wrongAnswerText: {
    height: '100%',
    color: '#063D69',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'none',
  },
  rightAnswerText: {
    height: '100%',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textTransform: 'none',
  },
});

export default Answers;

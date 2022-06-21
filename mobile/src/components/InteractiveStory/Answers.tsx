import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const MessageBubble = (props: {
  messageAnswers: any;
  rightAnswer: any;
  canMove: [any, any];
}) => {
  const messageAnswers = props.messageAnswers;
  const rightAnswer = props.rightAnswer;
  const [, setCanMove] = props.canMove;

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
          {messageAnswers.map((answer: any, index: number) => {
            return (
              <View style={styles.container} key={index + 1000}>
                <View style={styles.padding} key={index + 2000} />
                <View style={styles.answerButtonBox} key={index + 3000}>
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
          <View style={styles.padding} />
        </View>
        {messageAnswers !== 'none' ? <View /> : <View />}
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
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#5C9DEC',
  },
  answerText: {
    height: '100%',
    color: '#063D69',
    // fontSize: 15,
    textTransform: 'none',
  },
  wrongAnswerButton: {
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#b00020',
    color: '#efccd2',
  },
  wrongAnswerText: {
    height: '100%',
    color: '#b00020',
    // fontSize: 15,
    textTransform: 'none',
  },
  rightAnswerButton: {
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: 'center',
    // height: '100%',
    borderColor: '#00b020',
    color: '#ccefd2',
  },
  rightAnswerText: {
    height: '100%',
    color: '#00b020',
    // fontSize: 15,
    textTransform: 'none',
  },
});

export default MessageBubble;

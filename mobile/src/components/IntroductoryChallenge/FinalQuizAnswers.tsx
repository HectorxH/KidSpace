import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

interface AnswersProps {
  messageAnswers: string[];
  rightAnswer: string;
  answersCount: [number, ReactStateSetter<number>];
  answer: [number, ReactStateSetter<number>];
}

const Answers = (props: AnswersProps) => {
  const messageAnswers = props.messageAnswers;
  // const rightAnswer = props.rightAnswer;
  const [answersCount, setAnswersCount] = props.answersCount;
  const [answerFlag, setAnswer] = props.answer;

  const [answerStyles, setAnswerStyles] = useState<any>({
    0: styles.answerButton,
    1: styles.answerButton,
    2: styles.answerButton,
  });

  const [answerTextStyles, setAnswerTextStyles] = useState<any>({
    0: styles.answerText,
    1: styles.answerText,
    2: styles.answerText,
  });

  function checkAnswer(answer: any, index: number) {
    setAnswerStyles({
      0: index === 0 ? styles.rightAnswerButton : styles.answerButton,
      1: index === 1 ? styles.rightAnswerButton : styles.answerButton,
      2: index === 2 ? styles.rightAnswerButton : styles.answerButton,
    });
    if (answerFlag === 0) {
      setAnswersCount(answersCount + 1);
    }
    setAnswer(1);
    updateAnswerText(answer, index);
  }
  function updateAnswerText(answer: any, index: number) {
    setAnswerTextStyles({
      0: index === 0 ? styles.rightAnswerText : styles.answerText,
      1: index === 1 ? styles.rightAnswerText : styles.answerText,
      2: index === 2 ? styles.rightAnswerText : styles.answerText,
    });
  }

  // old
  // function checkAnswer(answer: any, index: number) {
  //   if (answer === rightAnswer) {
  //     setAnswerStyles({
  //       0: index === 0 ? styles.rightAnswerButton : answerStyles[0],
  //       1: index === 1 ? styles.rightAnswerButton : answerStyles[1],
  //       2: index === 2 ? styles.rightAnswerButton : answerStyles[2],
  //     });
  //     if (answerFlag === 0) {
  //       setAnswersCount(answersCount + 1);
  //     }
  //     setAnswer(1);
  //   } else {
  //     setAnswerStyles({
  //       0: index === 0 ? styles.wrongAnswerButton : answerStyles[0],
  //       1: index === 1 ? styles.wrongAnswerButton : answerStyles[1],
  //       2: index === 2 ? styles.wrongAnswerButton : answerStyles[2],
  //     });
  //   }
  //   updateAnswerText(answer, index);
  // }

  // function updateAnswerText(answer: any, index: number) {
  //   if (answer === rightAnswer) {
  //     setAnswerTextStyles({
  //       0: index === 0 ? styles.rightAnswerText : answerTextStyles[0],
  //       1: index === 1 ? styles.rightAnswerText : answerTextStyles[1],
  //       2: index === 2 ? styles.rightAnswerText : answerTextStyles[2],
  //     });
  //   } else {
  //     setAnswerTextStyles({
  //       0: index === 0 ? styles.wrongAnswerText : answerTextStyles[0],
  //       1: index === 1 ? styles.wrongAnswerText : answerTextStyles[1],
  //       2: index === 2 ? styles.wrongAnswerText : answerTextStyles[2],
  //     });
  //   }
  // }

  return (
    <View style={styles.horizontalContainer}>
      {messageAnswers.map((answer: any, index: number) => {
        const style = answerStyles[index as 0 | 1 | 2];
        return (
          <View
            style={styles.container}
            key={answer + (index + 1000).toString()}>
            <Button
              key={answer}
              mode="contained"
              color={style === styles.rightAnswerButton ? '#5C9DEC' : 'white'}
              style={style}
              onPress={() => checkAnswer(answer, index)}>
              <Text
                key={index + 4000}
                style={answerTextStyles[index as 0 | 1 | 2]}>
                {answer}
              </Text>
            </Button>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    marginVertical: RSize(0.05, 'h'),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    width: '22%',
    justifyContent: 'space-between',
  },
  answerButton: {
    borderRadius: RSize(1),
    justifyContent: 'center',
    borderColor: '#5C9DEC',
    elevation: 7,
  },
  wrongAnswerButton: {
    borderRadius: RSize(1),
    justifyContent: 'center',
    borderColor: '#b00020',
    color: '#efccd2',
    elevation: 7,
  },
  rightAnswerButton: {
    borderRadius: RSize(1),
    justifyContent: 'center',
    borderColor: '#00b020',
    color: '#5C9DEC',
    elevation: 7,
  },
  answerText: {
    color: '#063D69',
    fontSize: RSize(0.04, 'h'),
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
  wrongAnswerText: {
    color: '#063D69',
    fontSize: RSize(0.04, 'h'),
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
  rightAnswerText: {
    color: 'white',
    fontSize: RSize(0.04, 'h'),
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
});

export default Answers;

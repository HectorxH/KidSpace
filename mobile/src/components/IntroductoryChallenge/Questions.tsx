import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import Answers from './Answers';

const Questions = (props) => {
  const quiz = props.quiz;
  const q1 = quiz[0].question.split('*');
  const q2 = quiz[1].question.split('*');
  const toggleQuestions = props.toggleQuestions;
  const answersCount = props.answersCount;
  const setAnswersCount = props.setAnswersCount;
  const [leftAnswer, setLeftAnswer] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(0);

  return (
    <View
      style={
        toggleQuestions === true ? styles.horizontalContainer : styles.off
      }>
      <View style={styles.sidePad} />
      <View style={styles.verticalContainer}>
        <View style={styles.topPad} />
        <View style={styles.questionBox}>
          <View style={leftAnswer === 1 ? styles.overlay : styles.off} />
          <View style={styles.questionArea}>
            <Text style={styles.baseText}>
              {q1.map((word, index) => {
                return (
                  <Text
                    style={index % 2 === 1 ? styles.oddText : styles.evenText}
                    key={word.concat(index.toString())}>
                    {word}
                  </Text>
                );
              })}
            </Text>
          </View>
          {toggleQuestions === true ? (
            <View style={styles.answersArea}>
              <Answers
                messageAnswers={quiz[0].answers}
                rightAnswer={quiz[0].rightAnswer}
                answersCount={answersCount}
                setAnswersCount={setAnswersCount}
                setAnswer={setLeftAnswer}
                answer={leftAnswer}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.bottomPad} />
      </View>
      <View style={styles.centerPad} />
      <View style={styles.verticalContainer}>
        <View style={styles.topPad} />
        <View style={styles.questionBox}>
          <View style={styles.questionArea}>
            <Text style={styles.baseText}>
              {q2.map((word, index) => {
                return (
                  <Text
                    style={index % 2 === 1 ? styles.oddText : styles.evenText}
                    key={word.concat(index.toString())}>
                    {word}
                  </Text>
                );
              })}
            </Text>
          </View>
          <View style={styles.answersArea}>
            <Answers
              messageAnswers={quiz[1].answers}
              rightAnswer={quiz[1].rightAnswer}
              answersCount={answersCount}
              setAnswersCount={setAnswersCount}
              setAnswer={setRightAnswer}
              answer={rightAnswer}
            />
          </View>
        </View>
        <View style={styles.bottomPad} />
      </View>
      <View style={styles.sidePad} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
  },
  off: {
    flex: 0,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidePad: {
    flex: 5,
  },
  centerPad: {
    flex: 1,
  },
  verticalContainer: {
    flex: 15,
    flexDirection: 'column',
  },
  topPad: {
    flex: 6,
  },
  bottomPad: {
    flex: 1,
  },
  questionBox: {
    flex: 28,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  questionArea: {
    flex: 2,
    justifyContent: 'center',
  },
  answersArea: {
    flex: 3,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  baseText: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Poppins',
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
});

export default Questions;

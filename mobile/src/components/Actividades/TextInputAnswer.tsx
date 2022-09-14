import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import {ITextFieldQuestion} from '../../types/activity';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';

interface TextInputAnswerProps {
  textFieldQuestions: ITextFieldQuestion[] | never[];
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  pageNumber: number;
}

const TextInputAnswer = (props: TextInputAnswerProps) => {
  if (props.textFieldQuestions.length === 0) {
    return null;
  }

  // function onFieldChange(newValue: number, answerNumber: number) {
  //   let userAnswers = [...props.userInputAnswers[0]];
  //   userAnswers[props.pageNumber][answerNumber] = newValue;
  //   props.userInputAnswers[1](userAnswers);
  // }

  return (
    <View style={styles.container}>
      {props.textFieldQuestions.length !== 0 &&
        props.textFieldQuestions.map((question: ITextFieldQuestion, index) => {
          return (
            <View
              style={styles.overlay}
              key={question.position.start[0] + question.position.start[1]}>
              <Layout
                position={question.position}
                ObjectView={
                  <View style={styles.inputFieldBox}>
                    <TextInput
                      style={styles.input}
                      onChangeText={newValue => {
                        let userAnswers = [...props.userInputAnswers[0]];
                        const inputInt = parseInt(newValue, 10);
                        if (inputInt) {
                          userAnswers[props.pageNumber][index] = inputInt;
                        } else {
                          userAnswers[props.pageNumber][index] = 0;
                        }
                        props.userInputAnswers[1](userAnswers);
                      }}
                      // value={props.userInputAnswers[0][props.pageNumber][
                      //   index
                      // ].toString()}
                      value={
                        props.userInputAnswers[0][props.pageNumber][index]
                          ? props.userInputAnswers[0][props.pageNumber][
                              index
                            ].toString()
                          : ''
                      }
                      placeholder="Ingrese un número"
                      keyboardType="numeric"
                    />
                  </View>
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
  inputFieldBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    height: '100%',
    width: '100%',
  },
  input: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: RSize(0.05, 'h'),
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
  },
});

export default TextInputAnswer;

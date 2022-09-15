import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RSize} from '../../utils/responsive';
import Layout from '../Utils/Layout';
import {ReactStateSetter} from '../../types/others';
import {IAlternativasDropdown} from '../../types/activity';

interface AnswersProps {
  question: IAlternativasDropdown;
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pageNumber: number;
  answerNumber: number;
}

const Answers = (props: AnswersProps) => {
  const [userAnswers, setUserAnswers] = props.userAnswersDropdown;
  const [pickedAnswers, setPickedAnswers] = props.pickedAnswersDropdown;
  const rightAnswer = props.question.rightAnswer;
  const pageNumber = props.pageNumber;
  const answerNumber = props.answerNumber;

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const data = props.question.answers.map(option => ({
    label: option,
    value: option,
  }));

  const answerIconColor = ['white', 'red', 'green'];
  const answerIconName = ['', 'times', 'check'];

  function checkAnswer(answer: string) {
    let newUserAnswers = [...userAnswers];
    let newPickedAnswers = [...pickedAnswers];

    for (
      let i = 0;
      i < newPickedAnswers[pageNumber][answerNumber].length;
      i++
    ) {
      newPickedAnswers[pageNumber][answerNumber][i] = 0;
    }

    for (let i = 0; i < newUserAnswers[pageNumber][answerNumber].length; i++) {
      newUserAnswers[pageNumber][answerNumber][i] = 0;
    }

    let answerIndex = props.question.answers.indexOf(answer);
    if (rightAnswer.includes(answer)) {
      let rightAnswerIndex = rightAnswer.indexOf(answer);
      newPickedAnswers[pageNumber][answerNumber][answerIndex] = 2;
      newUserAnswers[pageNumber][answerNumber][rightAnswerIndex] = 1;
    } else {
      newPickedAnswers[pageNumber][answerNumber][answerIndex] = 1;
    }
    setUserAnswers(newUserAnswers);
    setPickedAnswers(newPickedAnswers);
  }

  function getAnswerIndex() {
    for (let i = 0; i < pickedAnswers[pageNumber][answerNumber].length; i++) {
      if (pickedAnswers[pageNumber][answerNumber][i] !== 0) {
        return i;
      }
    }
    return -1;
  }
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Layout
          position={props.question.position}
          ObjectView={
            <View style={styles.dropdownContainer}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocus
                    ? getAnswerIndex() !== -1
                      ? props.question.answers[getAnswerIndex()]
                      : 'Selecciona'
                    : '...'
                }
                value={
                  getAnswerIndex() !== -1
                    ? props.question.answers[getAnswerIndex()]
                    : 'Selecciona'
                }
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setIsFocus(false);
                  checkAnswer(item.value);
                }}
                renderLeftIcon={() =>
                  getAnswerIndex() !== -1 ? (
                    <FontAwesome5
                      style={styles.icon}
                      color={
                        answerIconColor[
                          pickedAnswers[pageNumber][answerNumber][
                            getAnswerIndex() !== -1 ? getAnswerIndex() : 0
                          ]
                        ]
                      }
                      name={
                        answerIconName[
                          pickedAnswers[pageNumber][answerNumber][
                            getAnswerIndex() !== -1 ? getAnswerIndex() : 0
                          ]
                        ]
                      }
                      size={20}
                    />
                  ) : null
                }
              />
            </View>
          }
        />
      </View>
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
  dropdownContainer: {
    // flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    borderColor: '#5C9DEC',
  },
  dropdown: {
    paddingHorizontal: RSize(0.03, 'h'),
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Answers;

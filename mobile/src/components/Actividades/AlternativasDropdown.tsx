import React from 'react';
import {View, StyleSheet} from 'react-native';
import AnswersDropdown from './AnswersDropdown';
import {ReactStateSetter} from '../../types/others';
import {IAlternativasDropdown} from '../../types/activity';

interface AlternativasDropdownProps {
  questionsDropdown: IAlternativasDropdown[] | never[];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pageNumber: number;
}

const AlternativasDropdown = (props: AlternativasDropdownProps) => {
  if (props.questionsDropdown.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {props.questionsDropdown.map((question: IAlternativasDropdown, index) => {
        return (
          <View
            style={styles.overlay}
            key={
              question.rightAnswer[0] + question.answers[0] + index.toString()
            }>
            <AnswersDropdown
              question={question}
              userAnswersDropdown={props.userAnswersDropdown}
              pickedAnswersDropdown={props.pickedAnswersDropdown}
              pageNumber={props.pageNumber}
              answerNumber={index}
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
});

export default AlternativasDropdown;

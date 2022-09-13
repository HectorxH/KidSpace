import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IJumpButton} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
import Layout from '../Utils/Layout';
import ButtonComponent from './ButtonComponent';
import {checkAnswers} from './utils';

interface JumpButtonProps {
  jumpButtons: IJumpButton[] | never[];
  pageNumber: [number, ReactStateSetter<number>];
  nextPage(): void;
  toggleVisibility: boolean;
  userAnswers: number[][][];
  userAnswersDropdown: number[][][];
  userAnswersQuiz: number[][];
  userDragAnswer: [string[], ReactStateSetter<string[]>];
  rightDragAnswer: string[];
}

const JumpButton = (props: JumpButtonProps) => {
  if (props.jumpButtons.length === 0) {
    return null;
  }

  const jumpPage = (pgNumber: number, requirements: number[]) => {
    if (
      checkAnswers(
        props.userAnswers,
        props.userAnswersDropdown,
        props.userAnswersQuiz,
        requirements,
        props.userDragAnswer[0],
        props.rightDragAnswer,
      ) === true
    ) {
      if (pgNumber === -1) {
        props.nextPage();
      } else {
        props.pageNumber[1](pgNumber);
      }
    }
  };

  return (
    <View style={styles.container}>
      {props.jumpButtons.map((jumpButton: IJumpButton, index) => {
        return (
          <View style={styles.overlay} key={index.toString()}>
            {(jumpButton.visible || props.toggleVisibility) && (
              <Layout
                position={jumpButton.position}
                ObjectView={
                  <ButtonComponent
                    onPressFunction={() =>
                      jumpPage(jumpButton.target, jumpButton.require)
                    }
                    settings={
                      checkAnswers(
                        props.userAnswers,
                        props.userAnswersDropdown,
                        props.userAnswersQuiz,
                        jumpButton.require,
                        props.userDragAnswer[0],
                        props.rightDragAnswer,
                      ) === true
                        ? {
                            buttonIcon: jumpButton.settings.buttonIconNormal,
                            buttonColor: jumpButton.settings.buttonColorNormal,
                            buttonText: jumpButton.settings.buttonTextNormal,
                          }
                        : {
                            buttonIcon: jumpButton.settings.buttonIconAlt,
                            buttonColor: jumpButton.settings.buttonColorAlt,
                            buttonText: jumpButton.settings.buttonTextAlt,
                          }
                    }
                  />
                }
              />
            )}
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

export default JumpButton;

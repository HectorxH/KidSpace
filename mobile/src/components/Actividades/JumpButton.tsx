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

  // alternativas
  userAnswers: number[][][];

  // dropdown
  userAnswersDropdown: number[][][];

  // quiz
  userAnswersQuiz: number[][];

  // drag
  userDragAnswers: string[][][];
  rightDragAnswers: string[][][];

  // inputfield
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswers: number[][];

  // 3d texturas
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  setMaterialSelectorToggle: ReactStateSetter<number>;
  selectedPageOrder: [number, ReactStateSetter<number>];
}

const JumpButton = (props: JumpButtonProps) => {
  if (props.jumpButtons.length === 0) {
    return null;
  }

  const jumpPage = (pgNumber: number, requirements: number[]) => {
    props.selectedPageOrder[1](0);
    let defaulSelectedtMaterial = [...props.selectedMaterial[0]];
    let defaultMaterial = [...props.modelMaterial[0]];
    if (typeof defaulSelectedtMaterial[pgNumber] !== 'undefined') {
      for (let j = 0; j < defaulSelectedtMaterial[pgNumber].length; j++) {
        for (let k = 0; k < defaulSelectedtMaterial[pgNumber][j].length; k++) {
          defaulSelectedtMaterial[pgNumber][j][k] = 'default';
        }
        defaultMaterial[pgNumber][j] = 'default';
      }
    }
    props.modelMaterial[1](defaultMaterial);
    props.selectedMaterial[1](defaulSelectedtMaterial);

    if (
      checkAnswers(
        requirements,
        props.userAnswers,
        props.userAnswersDropdown,
        props.userAnswersQuiz,
        props.userDragAnswers,
        props.rightDragAnswers,
        props.userInputAnswers[0],
        props.rightInputAnswers,
        props.selectedMaterial[0],
      ) === true
    ) {
      props.setMaterialSelectorToggle(0);
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
                        jumpButton.require,
                        props.userAnswers,
                        props.userAnswersDropdown,
                        props.userAnswersQuiz,
                        props.userDragAnswers,
                        props.rightDragAnswers,
                        props.userInputAnswers[0],
                        props.rightInputAnswers,
                        props.selectedMaterial[0],
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
                    disabled={
                      checkAnswers(
                        jumpButton.require,
                        props.userAnswers,
                        props.userAnswersDropdown,
                        props.userAnswersQuiz,
                        props.userDragAnswers,
                        props.rightDragAnswers,
                        props.userInputAnswers[0],
                        props.rightInputAnswers,
                        props.selectedMaterial[0],
                      ) === false
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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IJumpCard} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
import {checkAnswers} from './utils';
import Layout from '../Utils/Layout';
import CardComponent from './CardComponent';

interface JumpCardProps {
  jumpCards: IJumpCard[] | never[];
  pageNumber: [number, ReactStateSetter<number>];
  toggleVisibility: boolean;

  // alternativas
  userAnswers: number[][][];

  // dropdown
  userAnswersDropdown: number[][][];

  // quiz
  userAnswersQuiz: number[][];

  // drag
  userDragAnswer: [string[], ReactStateSetter<string[]>];
  rightDragAnswer: string[];

  // input field
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswers: number[][];

  // 3d texturas
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  setMaterialSelectorToggle: ReactStateSetter<number>;
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
}

const JumpCard = (props: JumpCardProps) => {
  if (props.jumpCards.length === 0) {
    return null;
  }

  const jumpPage = (pgNumber: number, requirements: number[]) => {
    if (
      checkAnswers(
        requirements,
        props.userAnswers,
        props.userAnswersDropdown,
        props.userAnswersQuiz,
        props.userDragAnswer[0],
        props.rightDragAnswer,
        props.userInputAnswers[0],
        props.rightInputAnswers,
        props.selectedMaterial[0],
      ) === true
    ) {
      props.setMaterialSelectorToggle(0);
      props.pageNumber[1](pgNumber);
    }
  };

  return (
    <View style={styles.container}>
      {props.jumpCards.map((jumpCard: IJumpCard, index) => {
        return (
          <View style={styles.overlay} key={index.toString()}>
            {(jumpCard.visible || props.toggleVisibility) && (
              <Layout
                position={jumpCard.position}
                ObjectView={
                  <CardComponent
                    onPressFunction={() =>
                      jumpPage(jumpCard.target, jumpCard.require)
                    }
                    jumpCard={jumpCard}
                    disabled={
                      checkAnswers(
                        jumpCard.disableWhen,
                        props.userAnswers,
                        props.userAnswersDropdown,
                        props.userAnswersQuiz,
                        props.userDragAnswer[0],
                        props.rightDragAnswer,
                        props.userInputAnswers[0],
                        props.rightInputAnswers,
                        props.selectedMaterial[0],
                      ) === true
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

export default JumpCard;

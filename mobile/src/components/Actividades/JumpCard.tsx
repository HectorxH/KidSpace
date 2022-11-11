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
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];

  // dropdown
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];

  // quiz
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];

  // drag
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  rightDragAnswers: string[][][];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];

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
    if (pgNumber === -2) {
      return null;
    }

    if (
      checkAnswers(
        requirements,
        props.userAnswers[0],
        props.userAnswersDropdown[0],
        props.userAnswersQuiz[0],
        props.userDragAnswers[0],
        props.rightDragAnswers,
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
                      jumpCard.disableWhen.length !== 0
                        ? jumpPage(jumpCard.target, jumpCard.require)
                        : {}
                    }
                    jumpCard={jumpCard}
                    disabled={
                      jumpCard.disableWhen.length !== 0 &&
                      checkAnswers(
                        jumpCard.disableWhen,
                        props.userAnswers[0],
                        props.userAnswersDropdown[0],
                        props.userAnswersQuiz[0],
                        props.userDragAnswers[0],
                        props.rightDragAnswers,
                        props.userInputAnswers[0],
                        props.rightInputAnswers,
                        props.selectedMaterial[0],
                      ) === true
                    }
                    pageNumber={props.pageNumber[0]}
                    userAnswers={props.userAnswers}
                    userDragAnswers={props.userDragAnswers}
                    pickedDragAnswers={props.pickedDragAnswers}
                    pickedDragAnswersIndex={props.pickedDragAnswersIndex}
                    isDragItemPicked={props.isDragItemPicked}
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

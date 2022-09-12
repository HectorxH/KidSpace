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
  userAnswers: number[][][];
  userAnswersDropdown: number[][][];
  userAnswersQuiz: number[][];
}

const JumpCard = (props: JumpCardProps) => {
  if (props.jumpCards.length === 0) {
    return null;
  }

  const jumpPage = (pgNumber: number, requirements: number[]) => {
    if (
      checkAnswers(
        props.userAnswers,
        props.userAnswersDropdown,
        props.userAnswersQuiz,
        requirements,
      ) === true
    ) {
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
                        props.userAnswers,
                        props.userAnswersDropdown,
                        props.userAnswersQuiz,
                        jumpCard.disableWhen,
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

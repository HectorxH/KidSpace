import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {DesafioEstado} from '../types/activity';
import {RootStackParamList} from '../types/navigation';
import {ReactStateSetter} from '../types/others';

interface StoryNavigationProps {
  storyLength: number;
  // userAnswers: number[];
  pageNumber: [number, ReactStateSetter<number>];
  canMove: [number, ReactStateSetter<number>];
  estado?: [DesafioEstado, ReactStateSetter<DesafioEstado>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const StoryNavigation = (props: StoryNavigationProps) => {
  const {storyLength, navigation} = props;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const [, setCanMove] = props.canMove;
  const [estado, setEstado] = props.estado
    ? props.estado
    : [undefined, undefined];

  // if (
  //   props.userAnswers.reduce(function (x, y) {
  //     return Number(x) + Number(y);
  //   }, 0) !== props.userAnswers.length
  // ) {
  //   return null;
  // }

  function nextPageNumber() {
    if (pageNumber !== storyLength - 1) {
      setPageNumber(pageNumber + 1);
      setCanMove(0);
    } else {
      if (estado === 'story') {
        setEstado('desafio');
        setPageNumber(0);
      } else {
        if (estado === 'desafio') {
          navigation?.push('Desafio', {
            actividad: 'diagramas',
            tipo: 'interactive',
          });
        } else {
          navigation?.push('Desafio', {
            actividad: 'diagramas',
            tipo: 'introductory',
          });
        }
      }
    }
  }
  function prevPageNumber() {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1);
      setCanMove(0);
    }
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={prevPageNumber}>
          <View style={styles.container} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={nextPageNumber}>
          <View style={styles.container} />
        </TouchableWithoutFeedback>
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
    flexDirection: 'row',
  },
});

export default StoryNavigation;

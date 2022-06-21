import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {DesafioEstado} from '../types/activity';
import {RootStackParamList} from '../types/navigation';

interface StoryNavigationProps {
  storyLength: number;
  pageNumber: [number, React.Dispatch<React.SetStateAction<number>>];
  canMove: [number, React.Dispatch<React.SetStateAction<number>>];
  estado?: [DesafioEstado, React.Dispatch<React.SetStateAction<DesafioEstado>>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const StoryNavigation = (props: StoryNavigationProps) => {
  const {storyLength, navigation} = props;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const [, setCanMove] = props.canMove;
  const [estado, setEstado] = props.estado
    ? props.estado
    : [undefined, undefined];

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
          navigation?.push('MainMap');
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

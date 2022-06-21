import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const StoryNavigation = (props) => {
  const storyLength = props.storyLength;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const [, setCanMove] = props.canMove;
  const estado = props.estado;
  const setEstado = props.setEstado;

  function nextPageNumber() {
    if (pageNumber !== storyLength - 1) {
      setPageNumber(pageNumber + 1);
      setCanMove(0);
    } else {
      if (estado === 'story') {
        setEstado('desafio');
        setPageNumber(0);
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

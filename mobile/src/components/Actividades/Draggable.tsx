import React from 'react';
import {View, StyleSheet} from 'react-native';

interface DraggableProps {}

const Draggable = (props: DraggableProps) => {
  return <View style={styles.container} />;
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

export default Draggable;

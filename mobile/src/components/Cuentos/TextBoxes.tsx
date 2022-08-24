import React from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';

interface TextBoxProps {
  boxes: [{start: Int32Array; end: Int32Array}] | 'none';
}

const TextBoxes = ({boxes}: TextBoxProps) => {
  if (boxes === 'none') {
    return null;
  }

  return (
    <View style={styles.container}>
      {boxes.map((box: {start: Int32Array; end: Int32Array}) => {
        return (
          <View
            style={styles.overlay}
            key={
              box.start[0].toString() +
              box.start[1].toString() +
              box.end[0].toString() +
              box.end[1].toString()
            }>
            <Layout
              object={box}
              ObjectView={<View style={styles.storyBox} />}
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
  storyBox: {
    flex: 6,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 5,
    paddingVertical: RSize(0.01, 'h'),
    paddingHorizontal: RSize(0.02, 'w'),
    borderColor: 'black',
  },
});

export default TextBoxes;

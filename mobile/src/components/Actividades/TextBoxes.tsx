import React from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';
import {ITextBoxes} from '../../types/activity';

interface TextBoxProps {
  boxes: ITextBoxes[] | never[];
}

const TextBoxes = ({boxes}: TextBoxProps) => {
  if (boxes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {boxes.map((box: ITextBoxes) => {
        const boxStyles = StyleSheet.create({
          settings:
            typeof box.settings !== 'undefined'
              ? {...styles.storyBox, ...box.settings}
              : {...styles.storyBox, ...styles.storyBoxDefault},
        });
        return (
          <View
            style={styles.overlay}
            key={
              box.position.start[0].toString() +
              box.position.start[1].toString() +
              box.position.end[0].toString() +
              box.position.end[1].toString()
            }>
            <Layout
              position={box.position}
              ObjectView={<View style={boxStyles.settings} />}
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
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    // elevation: 20,
  },
  storyBoxDefault: {
    backgroundColor: 'white',
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 5,
    paddingVertical: RSize(0.01, 'h'),
    paddingHorizontal: RSize(0.02, 'w'),
    borderColor: 'black',
  },
});

export default TextBoxes;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';
import {ITextBoxes} from '../../types/activity';
// import {getTextBoxStyle} from './utils';

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
        // const boxStyles = getTextBoxStyle(styles.storyBoxDefault, box.settings);
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
              ObjectView={
                <View style={[styles.storyBoxDefault, box.settings]} />
              }
              // ObjectView={<View style={boxStyles.settings} />}
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
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 5,
    paddingVertical: RSize(0.01, 'h'),
    paddingHorizontal: RSize(0.02, 'w'),
    borderColor: 'black',
  },
});

export default TextBoxes;

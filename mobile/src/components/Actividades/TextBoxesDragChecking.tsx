import React from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';
import {ITextBoxesDragChecking} from '../../types/activity';
import {checkDragAnswers} from './utils';
// import {getTextBoxStyle} from './utils';

interface TextBoxesDragCheckingProps {
  boxes: ITextBoxesDragChecking[] | never[];
  userDragAnswers: string[][][];
  rightDragAnswers: string[][][];
}

const TextBoxesDragChecking = ({
  boxes,
  userDragAnswers,
  rightDragAnswers,
}: TextBoxesDragCheckingProps) => {
  if (boxes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {boxes.map((box: ITextBoxesDragChecking) => {
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
                <View
                  style={[
                    checkDragAnswers(
                      box.requirements,
                      userDragAnswers,
                      rightDragAnswers,
                    ) === true
                      ? styles.checkingBoxRight
                      : styles.checkingBoxDefault,
                    box.settings,
                  ]}
                />
              }
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
  checkingBoxDefault: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: '#D22323',
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 1,
  },
  checkingBoxRight: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: '#2BAB1F',
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 1,
  },
});

export default TextBoxesDragChecking;

import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {IDraggable} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {RSize} from '../../../utils/responsive';

interface ImageFeedbackProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const ImageFeedback = (props: ImageFeedbackProps) => {
  const {fontScale} = useWindowDimensions();
  const {pageNumber, dragNumber, itemNumber} = props;
  const userDragAnswers = props.userDragAnswers[0];
  const pickedDragAnswers = props.pickedDragAnswers[0];

  const feedbackStyles = [styles.base, styles.wrong, styles.right];

  const dragStyle = [
    styles.base,
    feedbackStyles[pickedDragAnswers[pageNumber][dragNumber][itemNumber]],
  ];

  return (
    <View style={styles.container}>
      {pickedDragAnswers[pageNumber][dragNumber][itemNumber] !== 0 && (
        <View style={dragStyle}>
          <Text
            style={[
              styles.textStyle,
              {fontSize: styles.textStyle.fontSize / fontScale},
            ]}>
            {userDragAnswers[pageNumber][dragNumber][itemNumber]}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
  },
  base: {
    flex: 1,
    borderRadius: RSize(0.02, 'w'),
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  wrong: {
    borderColor: '#D22323',
    borderWidth: 3,
    backgroundColor: '#EA6A6A',
  },
  right: {
    borderColor: '#2BAB1F',
    borderWidth: 3,
    backgroundColor: '#A1C96A',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    opacity: 1,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 17,
    color: '#FFFFFF',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default ImageFeedback;

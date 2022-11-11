import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';

interface ReceivingLetterProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const ReceivingLetter = (props: ReceivingLetterProps) => {
  const {fontScale} = useWindowDimensions();
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [pickedDragAnswersIndex, setPickedDragAnswersIndex] =
    props.pickedDragAnswersIndex;
  const [isDragItemPicked, setIsDragItemPicked] = props.isDragItemPicked;

  const answerRectangleStyles = [
    styles.receivingLetterBase,
    styles.receivedLetter,
    styles.receivedLetter,
  ];

  const dragStyle = [
    styles.receivingBase,
    answerRectangleStyles[
      pickedDragAnswers[pageNumber][dragNumber][itemNumber]
    ],
  ];

  function checkAnswer(payload: number) {
    resetAnswer();
    let newUserDragAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let newIsDragItemPicked = [...isDragItemPicked];

    const answer = draggable.draggableItems[payload].value;

    newUserDragAnswers[pageNumber][dragNumber][itemNumber] = answer;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;

    // Valores para cambiar visualización del drag item que llegó a este bloque
    newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = payload;
    newIsDragItemPicked[pageNumber][dragNumber][payload] = true;

    if (
      draggable.answer.includes(answer) &&
      draggable.answer.length > itemNumber &&
      draggable.answer[itemNumber] === answer
    ) {
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
    }

    setUserDragAnswers(newUserDragAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
    setIsDragItemPicked(newIsDragItemPicked);
  }

  function resetAnswer() {
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newIsDragItemPicked = [...isDragItemPicked];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let dragItemIndex =
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber];

    newUserAnswers[pageNumber][dragNumber][itemNumber] = '';
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 0;

    if (dragItemIndex !== -1) {
      newIsDragItemPicked[pageNumber][dragNumber][dragItemIndex] = false;
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = -1;
    }

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
    setIsDragItemPicked(newIsDragItemPicked);
  }

  return (
    <View style={styles.container}>
      <DraxView
        style={dragStyle}
        receivingStyle={[dragStyle, styles.receivingHover]}
        onTouchStart={() => {
          resetAnswer();
        }}
        onReceiveDragDrop={event => {
          checkAnswer(event.dragged.payload[1]);
        }}>
        <Text
          style={[
            styles.textStyle,
            {fontSize: styles.textStyle.fontSize / fontScale},
          ]}>
          {typeof draggable.receivingItems !== 'undefined' &&
          draggable.receivingItems[itemNumber].name !== ''
            ? draggable.receivingItems[itemNumber].value
            : userDragAnswers[pageNumber][dragNumber][itemNumber]}
        </Text>
      </DraxView>
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
  },
  receivingHover: {
    borderColor: 'red',
    borderWidth: 2,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'none',
    color: '#063D69',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
  receivingBase: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 9,
  },
  receivingLetterBase: {
    backgroundColor: '#D9D9D9',
  },
  receivedLetter: {
    backgroundColor: '#FFFFFF',
  },
});

export default ReceivingLetter;

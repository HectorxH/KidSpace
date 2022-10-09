import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';

interface ReceivingRectangleTextProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const ReceivingRectangleText = (props: ReceivingRectangleTextProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [pickedDragAnswersIndex, setPickedDragAnswersIndex] =
    props.pickedDragAnswersIndex;
  const [isDragItemPicked, setIsDragItemPicked] = props.isDragItemPicked;

  const answerRectangleStyles = [
    styles.receivingRectangleBase,
    styles.receivingRectangleWrong,
    styles.receivingRectangleRight,
  ];

  const dragStyle = [
    styles.receivingBase,
    styles.receivingRectangleBase,
    answerRectangleStyles[
      pickedDragAnswers[pageNumber][dragNumber][itemNumber]
    ],
  ];

  function checkAnswer(payload: number) {
    resetAnswer();
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let newIsDragItemPicked = [...isDragItemPicked];

    const answer = draggable.draggableItems[payload].value;
    newUserAnswers[pageNumber][dragNumber][itemNumber] =
      draggable.draggableItems[payload].value;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;

    // Valores para cambiar visualización del drag item que llegó a este bloque
    newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = payload;
    newIsDragItemPicked[pageNumber][dragNumber][payload] = true;

    if (
      draggable.answer.includes(answer) &&
      draggable.answer.indexOf(answer) === itemNumber
    ) {
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
    }

    setUserDragAnswers(newUserAnswers);
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
          console.log('dragged', event.dragged.payload);
          checkAnswer(event.dragged.payload[1]);
        }}>
        <Text style={styles.textStyle}>
          {userDragAnswers[pageNumber][dragNumber][itemNumber]}
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
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.04, 'h'),
    color: '#FFFFFF',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
  receivingBase: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingRectangleBase: {
    borderColor: '#878787',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  receivingRectangleWrong: {
    // borderColor: '#D22323',
    borderWidth: 0,
    // backgroundColor: '#EA6A6A',
    backgroundColor: '#5C9DEC',
  },
  receivingRectangleRight: {
    // borderColor: '#2BAB1F',
    borderWidth: 0,
    // backgroundColor: '#A1C96A',
    backgroundColor: '#5C9DEC',
  },
});

export default ReceivingRectangleText;

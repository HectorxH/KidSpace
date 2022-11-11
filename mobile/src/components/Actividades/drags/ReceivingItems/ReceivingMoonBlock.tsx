import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import MoonBlock from '../MoonBlock';

interface ReceivingMoonBlockProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
}

const ReceivingMoonBlock = (props: ReceivingMoonBlockProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [receivingValues, setReceivingValues] = props.receivingValues;
  const [isDragItemPicked, setIsDragItemPicked] = props.isDragItemPicked;
  const [pickedDragAnswersIndex, setPickedDragAnswersIndex] =
    props.pickedDragAnswersIndex;
  // console.log(userDragAnswers[pageNumber]);
  function checkAnswer(payload: number) {
    // Si el item tiene nombre -> fijo, no se modifica
    resetAnswer();

    if (draggable.receivingItems[itemNumber].name !== '') {
      return;
    }

    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingValues = [...receivingValues];
    let newIsDragItemPicked = [...isDragItemPicked];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];

    const answer = draggable.draggableItems[payload].value;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 0;

    newUserAnswers[pageNumber][dragNumber][itemNumber] =
      draggable.draggableItems[payload].value;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;
    newIsDragItemPicked[pageNumber][dragNumber][payload] = true;
    newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = payload;

    if (
      draggable.answer.includes(answer) &&
      draggable.answer.length > itemNumber &&
      draggable.answer[itemNumber] === answer
    ) {
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
    }

    if (draggable.receivingItems[itemNumber].name === '') {
      newReceivingValues[pageNumber][dragNumber][itemNumber] = answer;
    }

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingValues(newReceivingValues);
    setIsDragItemPicked(newIsDragItemPicked);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
  }

  function resetAnswer() {
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingValues = [...receivingValues];
    let newIsDragItemPicked = [...isDragItemPicked];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let dragItemIndex =
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber];

    console.log(itemNumber, itemNumber);
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 0;
    newReceivingValues[pageNumber][dragNumber][itemNumber] =
      draggable.receivingItems[itemNumber].value;
    newUserAnswers[pageNumber][dragNumber][itemNumber] =
      draggable.receivingItems[itemNumber].value;

    if (dragItemIndex !== -1) {
      newIsDragItemPicked[pageNumber][dragNumber][dragItemIndex] = false;
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = -1;
    }

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingValues(newReceivingValues);
    setIsDragItemPicked(newIsDragItemPicked);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
  }

  return (
    <View style={styles.container}>
      <DraxView
        style={styles.container}
        receivingStyle={
          draggable.receivingItems[itemNumber].value === '' &&
          ((itemNumber > 0 &&
            receivingValues[pageNumber][dragNumber][itemNumber - 1] !== '') ||
            itemNumber === 0)
            ? styles.receivingHover
            : []
        }
        onTouchStart={() => {
          resetAnswer();
        }}
        onReceiveDragDrop={event => {
          checkAnswer(event.dragged.payload[1]);
        }}>
        <MoonBlock
          item={draggable.receivingItems[itemNumber]}
          value={userDragAnswers[pageNumber][dragNumber][itemNumber]}
          backgroundColor={
            pickedDragAnswers[pageNumber][dragNumber][itemNumber] === 2
              ? '#A1C96A'
              : '#EA6A6A'
          }
          fontColor={'#ffffff'}
        />
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
    height: '160%',
  },
  receivingHover: {
    borderColor: 'red',
    // width: '100%',
    // height: '160%',
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default ReceivingMoonBlock;

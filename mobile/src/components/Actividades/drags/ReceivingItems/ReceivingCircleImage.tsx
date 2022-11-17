import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Images from '../../../../assets/images/images';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';

interface ReceivingCircleImageProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const ReceivingCircleImage = (props: ReceivingCircleImageProps) => {
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
    if (typeof draggable.draggableItems[payload].persistent === 'undefined') {
      newIsDragItemPicked[pageNumber][dragNumber][payload] = true;
    }

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
        {userDragAnswers[pageNumber][dragNumber][itemNumber] !== '' && (
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={
              Images.items[userDragAnswers[pageNumber][dragNumber][itemNumber]]
            }
          />
        )}
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 15,
    color: '#FFFFFF',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
  receivingBase: {
    // flex: 1,
    height: RSize(0.12, 'w'),
    width: RSize(0.12, 'w'),
    borderRadius: RSize(0.12, 'w') / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingRectangleBase: {
    backgroundColor: '#D9D9D9',
    borderWidth: 0,
  },
  receivingRectangleWrong: {
    borderColor: '#D22323',
    borderWidth: 3,
    backgroundColor: '#EA6A6A',
  },
  receivingRectangleRight: {
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
});

export default ReceivingCircleImage;

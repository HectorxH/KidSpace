import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import Images from '../../../../assets/images/images';

interface ReceivingImageProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const ReceivingImage = (props: ReceivingImageProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [receivingValues, setReceivingValues] = props.receivingValues;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [pickedDragAnswersIndex, setPickedDragAnswersIndex] =
    props.pickedDragAnswersIndex;
  const [isDragItemPicked, setIsDragItemPicked] = props.isDragItemPicked;

  const answerImageStyles = [
    styles.receivingImageBase,
    styles.receivingImageWrong,
    styles.receivingImageRight,
  ];

  const dragStyle = [
    styles.receivingBase,
    answerImageStyles[pickedDragAnswers[pageNumber][dragNumber][itemNumber]],
  ];

  const updateImage = (payload: number) => {
    resetAnswer();
    let newUserDragAnswers = [...userDragAnswers];
    let newReceivingValues = [...receivingValues];
    let newPickedAnswers = [...pickedDragAnswers];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let newIsDragItemPicked = [...isDragItemPicked];

    const receivedImageName = draggable.draggableItems[payload].value;

    // Valor para el bloque
    newReceivingValues[pageNumber][dragNumber][itemNumber] = receivedImageName;

    // Valor para el array de respuestas
    newUserDragAnswers[pageNumber][dragNumber][itemNumber] = receivedImageName;

    // Valor para el estilo
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;

    // Valores para cambiar visualización del drag item que llegó a este bloque
    newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = payload;
    newIsDragItemPicked[pageNumber][dragNumber][payload] = true;

    if (
      draggable.answer.includes(receivedImageName) &&
      draggable.answer.indexOf(receivedImageName) === itemNumber
    ) {
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
    }

    setUserDragAnswers(newUserDragAnswers);
    setReceivingValues(newReceivingValues);
    setPickedDragAnswers(newPickedAnswers);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
    setIsDragItemPicked(newIsDragItemPicked);
  };

  function resetAnswer() {
    let newUserAnswers = [...userDragAnswers];
    let newReceivingValues = [...receivingValues];
    let newPickedAnswers = [...pickedDragAnswers];
    let newIsDragItemPicked = [...isDragItemPicked];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let dragItemIndex =
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber];

    newUserAnswers[pageNumber][dragNumber][itemNumber] = '';
    newReceivingValues[pageNumber][dragNumber][itemNumber] = '';
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 0;

    if (dragItemIndex !== -1) {
      newIsDragItemPicked[pageNumber][dragNumber][dragItemIndex] = false;
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = -1;
    }

    setUserDragAnswers(newUserAnswers);
    setReceivingValues(newReceivingValues);
    setPickedDragAnswers(newPickedAnswers);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
    setIsDragItemPicked(newIsDragItemPicked);
  }

  return (
    <View style={styles.container}>
      <DraxView
        style={dragStyle}
        receivingStyle={[styles.receivingBase, styles.receivingHover]}
        onTouchStart={() => {
          resetAnswer();
        }}
        onReceiveDragDrop={event => {
          updateImage(event.dragged.payload[1]);
        }}>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={
            Images.items[receivingValues[pageNumber][dragNumber][itemNumber]]
          }
        />
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receivingBase: {
    height: '100%',
    width: '100%',
    borderRadius: RSize(0.015, 'h'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B5B5B5',
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
  },
  receivingImageBase: {
    height: '100%',
    width: '100%',
    borderRadius: RSize(0.015, 'h'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B5B5B5',
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
  },
  receivingImageWrong: {
    borderColor: '#D22323',
  },
  receivingImageRight: {
    borderColor: '#2BAB1F',
  },
  receivingHover: {
    borderColor: 'red',
    borderWidth: 2,
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    opacity: 1,
  },
});

export default ReceivingImage;

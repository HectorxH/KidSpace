import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import Images from '../../../../assets/images/images';

interface ReceivingBasureroProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  joseItem: [string, ReactStateSetter<string>];
  joseMessage: [string, ReactStateSetter<string>];
}

const ReceivingBasurero = (props: ReceivingBasureroProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const receivingValues = props.receivingValues[0];
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [pickedDragAnswersIndex, setPickedDragAnswersIndex] =
    props.pickedDragAnswersIndex;
  const [isDragItemPicked, setIsDragItemPicked] = props.isDragItemPicked;
  const setJoseItem = props.joseItem[1];
  const setJoseMessage = props.joseMessage[1];

  const dragStyle = [styles.receivingBase];

  const updateBasurero = (payload: number) => {
    let newUserDragAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newPickedAnswersIndex = [...pickedDragAnswersIndex];
    let newIsDragItemPicked = [...isDragItemPicked];

    const selectedBasurero = draggable.receivingItems[itemNumber].value;
    newUserDragAnswers[pageNumber][dragNumber][payload] = selectedBasurero;
    console.log(newUserDragAnswers[pageNumber][dragNumber]);

    if (
      draggable.answer.includes(selectedBasurero) &&
      draggable.answer.length > payload &&
      draggable.answer[payload] === selectedBasurero
    ) {
      newPickedAnswersIndex[pageNumber][dragNumber][itemNumber] = payload;
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
      setJoseItem('JoseHappy');
      setJoseMessage('¡Correcto!');
      // Valores para cambiar visualización del drag item que llegó a este bloque
      if (typeof draggable.draggableItems[payload].persistent === 'undefined') {
        newIsDragItemPicked[pageNumber][dragNumber][payload] = true;
      }
    } else {
      setJoseItem('JoseQuestion');
      setJoseMessage('Hmm... No creo que ese sea el basurero correcto.');
    }

    setUserDragAnswers(newUserDragAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setPickedDragAnswersIndex(newPickedAnswersIndex);
    setIsDragItemPicked(newIsDragItemPicked);
  };

  return (
    <View style={styles.container}>
      <DraxView
        style={dragStyle}
        receivingStyle={[styles.receivingBase, styles.receivingHover]}
        onReceiveDragDrop={event => {
          updateBasurero(event.dragged.payload[1]);
        }}>
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={
            Images.items[receivingValues[pageNumber][dragNumber][itemNumber]]
          }
          // source={Images.items.basureroAmarillo}
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

export default ReceivingBasurero;

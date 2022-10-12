import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import CodeBlock from '../CodeBlock';

interface ReceivingCodeBlockProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  draggable: IDraggable;
}

const ReceivingCodeBlock = (props: ReceivingCodeBlockProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [receivingValues, setReceivingValues] = props.receivingValues;

  // console.log(userDragAnswers[pageNumber]);
  function checkAnswer(payload: number) {
    // Si el item tiene nombre -> fijo, no se modifica
    if (draggable.receivingItems[itemNumber].name !== '') {
      return;
    }

    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingValues = [...receivingValues];

    // Si no hay bloques previos no asigna,
    // también actualiza el valor previo de las respuestas
    if (itemNumber > 0) {
      if (newReceivingValues[pageNumber][dragNumber][itemNumber - 1] === '') {
        return;
      } else {
        newUserAnswers[pageNumber][dragNumber][itemNumber - 1] =
          newReceivingValues[pageNumber][dragNumber][itemNumber - 1];
      }
    }

    const answer = draggable.draggableItems[payload].value;

    newUserAnswers[pageNumber][dragNumber][itemNumber] =
      draggable.draggableItems[payload].value;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;

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
  }

  function resetAnswer(receivingNumber: number) {
    if (receivingNumber >= draggable.receivingItems.length) {
      return;
    }
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingValues = [...receivingValues];

    newPickedAnswers[pageNumber][dragNumber][receivingNumber] = 0;
    newReceivingValues[pageNumber][dragNumber][receivingNumber] =
      draggable.receivingItems[receivingNumber].value;
    newUserAnswers[pageNumber][dragNumber][receivingNumber] =
      draggable.receivingItems[receivingNumber].value;

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingValues(newReceivingValues);

    resetAnswer(receivingNumber + 1);
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
          resetAnswer(itemNumber);
        }}
        onReceiveDragDrop={event => {
          checkAnswer(event.dragged.payload[1]);
        }}>
        <CodeBlock
          item={draggable.receivingItems[itemNumber]}
          value={userDragAnswers[pageNumber][dragNumber][itemNumber]}
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
    margin: RSize(0.02, 'h'),
    borderColor: 'red',
    // width: '100%',
    height: '160%',
    borderRadius: 5,
    borderWidth: 1,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
  defaultCodeBlock: {
    flex: 1,
    margin: RSize(0.02, 'h'),
    height: '100%',
    width: '65%',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // alignItems: 'center',
    borderRadius: 5,
  },
  functionCodeBlock: {
    // borderWidth: 2,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: '#FF684F',
    borderColor: '#FF514F',
  },
});

export default ReceivingCodeBlock;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import Layout from '../../../Utils/Layout';

interface ReceivingRectangleProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  draggable: IDraggable;
}

const ReceivingRectangle = (props: ReceivingRectangleProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;

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
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];

    const answer = draggable.draggableItems[payload].value;

    newUserAnswers[pageNumber][dragNumber][itemNumber] =
      draggable.draggableItems[payload].value;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;

    if (
      draggable.answer.includes(answer) &&
      draggable.answer.indexOf(answer) === itemNumber
    ) {
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
    }

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
  }

  function resetAnswer() {
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];

    newUserAnswers[pageNumber][dragNumber][itemNumber] = '';
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 0;

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
  }

  return (
    <View style={styles.container}>
      <Layout
        position={draggable.receivingItems[itemNumber].position}
        ObjectView={
          <DraxView
            style={dragStyle}
            receivingStyle={[dragStyle, styles.receivingHover]}
            onTouchStart={() => {
              resetAnswer();
            }}
            onReceiveDragDrop={event => {
              checkAnswer(event.dragged.payload);
            }}>
            <Text style={styles.textStyle}>
              {draggable.receivingItems[itemNumber].name !== ''
                ? draggable.receivingItems[itemNumber].value
                : userDragAnswers[pageNumber][dragNumber][itemNumber]}
            </Text>
          </DraxView>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
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
});

export default ReceivingRectangle;

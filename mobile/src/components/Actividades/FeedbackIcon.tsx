import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';

interface ReceivingRectangleTextProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  draggable: IDraggable;
}

const ReceivingRectangleText = (props: ReceivingRectangleTextProps) => {
  const {fontScale} = useWindowDimensions();
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
    styles.receivingRectangleBase,
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
        <Text
          style={[
            styles.textStyle,
            {fontSize: styles.textStyle.fontSize / fontScale},
          ]}>
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
    fontSize: 18,
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
    // borderColor: '#D22323',
    borderWidth: 0,
    backgroundColor: '#5C9DEC',
  },
  receivingRectangleRight: {
    // borderColor: '#2BAB1F',
    borderWidth: 0,
    backgroundColor: '#5C9DEC',
  },
});

export default ReceivingRectangleText;

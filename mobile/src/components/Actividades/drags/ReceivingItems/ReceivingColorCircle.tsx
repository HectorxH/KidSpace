import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import {getColor} from '../../utils';

interface ReceivingColorCircleProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  setResultColor: ReactStateSetter<string>;
  draggable: IDraggable;
}

const ReceivingColorCircle = (props: ReceivingColorCircleProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable, setResultColor} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [receivingValues, setReceivingValues] = props.receivingValues;

  const dragStyle = [
    styles.receivingBase,
    {backgroundColor: receivingValues[pageNumber][dragNumber][itemNumber]},
  ];
  const colorResult = (payload: number) => {
    let newReceivingValues = [...receivingValues];
    let newUserDragAnswers = [...userDragAnswers];
    const receivedColor = draggable.draggableItems[payload].value;

    newReceivingValues[pageNumber][dragNumber][itemNumber] = receivedColor;

    let newColor = getColor(
      newReceivingValues[pageNumber][dragNumber].reduce((x, y) => x + y, ''),
    );
    newUserDragAnswers[pageNumber][dragNumber][0] = newColor;

    setResultColor(newColor);
    setReceivingValues(newReceivingValues);
    setUserDragAnswers(newUserDragAnswers);
  };

  function resetAnswer() {}
  return (
    <View style={styles.container}>
      <DraxView
        style={dragStyle}
        receivingStyle={[styles.receivingBase, styles.receivingHover]}
        onTouchStart={() => {
          resetAnswer();
        }}
        onReceiveDragDrop={event => {
          colorResult(event.dragged.payload[1]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receivingBase: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B5B5B5',
    borderWidth: 3,
  },
  receivingHover: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default ReceivingColorCircle;

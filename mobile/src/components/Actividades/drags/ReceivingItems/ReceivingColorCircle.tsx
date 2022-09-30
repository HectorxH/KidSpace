import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import Layout from '../../../Utils/Layout';
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
    // const first = newReceivingItemList[0].value;
    // const second = newReceivingItemList[1].value;
    // const colors = first.concat(second);
    // console.log(colors);
    // let color = getColor(colors);
    // let userAnswers = [...props.userDragAnswers[0]];
    // // userAnswers[props.pageNumber] = color;
    // props.userDragAnswers[1](userAnswers);
    // props.setResultColor(color);
  };

  function resetAnswer() {
    // let newUserAnswers = [...userDragAnswers];
    // let newPickedAnswers = [...pickedDragAnswers];
    // newUserAnswers[pageNumber][dragNumber][itemNumber] = '';
    // newPickedAnswers[pageNumber][dragNumber][itemNumber] = 0;
    // setUserDragAnswers(newUserAnswers);
    // setPickedDragAnswers(newPickedAnswers);
  }
  return (
    <View style={styles.container}>
      <Layout
        position={draggable.receivingItems[itemNumber].position}
        ObjectView={
          <DraxView
            style={dragStyle}
            receivingStyle={[styles.receivingBase, styles.receivingHover]}
            onTouchStart={() => {
              resetAnswer();
            }}
            onReceiveDragDrop={event => {
              colorResult(event.dragged.payload);
            }}
          />
          //   <DraxView
          //   style={[
          //     styles.receivingZone,
          //     typeof props.item.value !== 'undefined'
          //       ? {backgroundColor: props.item.value}
          //       : {},
          //   ]}
          //   receivingStyle={styles.receiving}
          //   onReceiveDragDrop={event => {
          //     let selected_item = props.draggableItems[event.dragged.payload];
          //     let newReceivingItemList = [...props.receivingItems];
          //     newReceivingItemList[props.index].name = selected_item.name;
          //     newReceivingItemList[props.index].value = selected_item.value;
          //     // props.setReceivedItemList(newReceivingItemList);
          //     colorResult(newReceivingItemList);
          //   }}
          // />
        }
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

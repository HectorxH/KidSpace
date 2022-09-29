import React from 'react';
import {StyleSheet} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggableItems, IReceivingItems} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import {getColor} from '../../utils';

interface ReceivingColorCircleProps {
  props: ReceivingItemProps;
}

interface ReceivingItemProps {
  item: IReceivingItems;
  index: number;
  pageNumber: number;
  userDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  setResultColor: ReactStateSetter<string>;
  // setReceivedItemList: ReactStateSetter<IReceivingItems[]>;
  draggableItems: IDraggableItems[];
  receivingItems: IReceivingItems[];
  draggableType: string;
}

const ReceivingColorCircle = (parentProps: ReceivingColorCircleProps) => {
  const props = parentProps.props;
  const colorResult = (newReceivingItemList: any) => {
    console.log(newReceivingItemList);
    const first = newReceivingItemList[0].value;
    const second = newReceivingItemList[1].value;
    const colors = first.concat(second);
    console.log(colors);
    let color = getColor(colors);

    let userAnswers = [...props.userDragAnswers[0]];
    // userAnswers[props.pageNumber] = color;
    props.userDragAnswers[1](userAnswers);

    props.setResultColor(color);
  };

  return (
    <DraxView
      style={[
        styles.receivingZone,
        typeof props.item.value !== 'undefined'
          ? {backgroundColor: props.item.value}
          : {},
      ]}
      receivingStyle={styles.receiving}
      onReceiveDragDrop={event => {
        let selected_item = props.draggableItems[event.dragged.payload];
        let newReceivingItemList = [...props.receivingItems];
        newReceivingItemList[props.index].name = selected_item.name;
        newReceivingItemList[props.index].value = selected_item.value;
        // props.setReceivedItemList(newReceivingItemList);
        colorResult(newReceivingItemList);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receivingZone: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B5B5B5',
    borderWidth: 3,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default ReceivingColorCircle;

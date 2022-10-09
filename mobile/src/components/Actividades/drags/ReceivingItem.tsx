import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IDraggable} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {RSize} from '../../../utils/responsive';
import ReceivingCodeBlock from './ReceivingItems/ReceivingCodeBlock';
import ReceivingColorCircle from './ReceivingItems/ReceivingColorCircle';
import ReceivingImage from './ReceivingItems/ReceivingImage';
import ReceivingRectangle from './ReceivingItems/ReceivingRectangle';

interface ReceivingItemProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  setResultColor: ReactStateSetter<string>;
  draggable: IDraggable;
}

const ReceivingItem = (props: ReceivingItemProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  // console.log(draggable.receivingItems[itemNumber].type);
  return (
    <View style={styles.container}>
      {/* color circle  */}
      {draggable.receivingItems[itemNumber].type === 'colorCircle' && (
        <View style={styles.overlay}>
          <ReceivingColorCircle
            pageNumber={pageNumber}
            dragNumber={dragNumber}
            itemNumber={itemNumber}
            draggable={draggable}
            userDragAnswers={props.userDragAnswers}
            receivingValues={props.receivingValues}
            setResultColor={props.setResultColor}
          />
        </View>
      )}
      {/* image  */}
      {draggable.receivingItems[itemNumber].type === 'image' && (
        <View style={styles.overlay}>
          <ReceivingImage
            pageNumber={pageNumber}
            dragNumber={dragNumber}
            itemNumber={itemNumber}
            draggable={draggable}
            userDragAnswers={props.userDragAnswers}
            receivingValues={props.receivingValues}
            pickedDragAnswers={props.pickedDragAnswers}
            pickedDragAnswersIndex={props.pickedDragAnswersIndex}
            isDragItemPicked={props.isDragItemPicked}
          />
        </View>
      )}

      {/* rectangle  */}
      {draggable.receivingItems[itemNumber].type === 'rectangle' && (
        <View style={styles.overlay}>
          <ReceivingRectangle
            pageNumber={pageNumber}
            dragNumber={dragNumber}
            itemNumber={itemNumber}
            draggable={draggable}
            userDragAnswers={props.userDragAnswers}
            pickedDragAnswers={props.pickedDragAnswers}
            pickedDragAnswersIndex={props.pickedDragAnswersIndex}
            isDragItemPicked={props.isDragItemPicked}
          />
        </View>
      )}

      {/* code block  */}
      {draggable.receivingItems[itemNumber].type === 'codeBlock' && (
        <View style={styles.overlay}>
          <ReceivingCodeBlock
            pageNumber={pageNumber}
            dragNumber={dragNumber}
            itemNumber={itemNumber}
            draggable={draggable}
            userDragAnswers={props.userDragAnswers}
            pickedDragAnswers={props.pickedDragAnswers}
            receivingNames={props.receivingNames}
          />
        </View>
      )}
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
  receivingCircle: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
  },
});

export default ReceivingItem;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IDraggable} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {RSize} from '../../../utils/responsive';
import ReceivingBasurero from './ReceivingItems/ReceivingBasurero';
import ReceivingCircleImage from './ReceivingItems/ReceivingCircleImage';
import ReceivingCodeBlock from './ReceivingItems/ReceivingCodeBlock';
import ReceivingColorCircle from './ReceivingItems/ReceivingColorCircle';
import ReceivingImage from './ReceivingItems/ReceivingImage';
import ReceivingLetter from './ReceivingItems/ReceivingLetter';
import ReceivingMoonBlock from './ReceivingItems/ReceivingMoonBlock';
import ReceivingRectangle from './ReceivingItems/ReceivingRectangle';
import ReceivingRectangleText from './ReceivingItems/ReceivingRectangleText';

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
  joseItem: [string, ReactStateSetter<string>];
  joseMessage: [string, ReactStateSetter<string>];
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

      {/* rectangle  */}
      {draggable.receivingItems[itemNumber].type === 'circleImage' && (
        <View style={styles.overlay}>
          <ReceivingCircleImage
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

      {/* rectangle Text */}
      {draggable.receivingItems[itemNumber].type === 'rectangleText' && (
        <View style={styles.overlay}>
          <ReceivingRectangleText
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

      {/* letter  */}
      {draggable.receivingItems[itemNumber].type === 'letter' && (
        <View style={styles.overlay}>
          <ReceivingLetter
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
            receivingValues={props.receivingValues}
          />
        </View>
      )}

      {/* moon block  */}
      {draggable.receivingItems[itemNumber].type === 'moonBlock' && (
        <View style={styles.overlay}>
          <ReceivingMoonBlock
            pageNumber={pageNumber}
            dragNumber={dragNumber}
            itemNumber={itemNumber}
            draggable={draggable}
            userDragAnswers={props.userDragAnswers}
            pickedDragAnswers={props.pickedDragAnswers}
            receivingValues={props.receivingValues}
            pickedDragAnswersIndex={props.pickedDragAnswersIndex}
            isDragItemPicked={props.isDragItemPicked}
          />
        </View>
      )}

      {/* Basurero  */}
      {draggable.receivingItems[itemNumber].type === 'basurero' && (
        <View style={styles.overlay}>
          <ReceivingBasurero
            pageNumber={pageNumber}
            dragNumber={dragNumber}
            itemNumber={itemNumber}
            draggable={draggable}
            userDragAnswers={props.userDragAnswers}
            receivingValues={props.receivingValues}
            pickedDragAnswers={props.pickedDragAnswers}
            pickedDragAnswersIndex={props.pickedDragAnswersIndex}
            isDragItemPicked={props.isDragItemPicked}
            joseItem={props.joseItem}
            joseMessage={props.joseMessage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 0,
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

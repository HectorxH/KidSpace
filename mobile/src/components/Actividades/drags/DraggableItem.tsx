import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IReceivingItems} from '../../../types/activity';
import DraggableRectangle from './DraggableItems/DraggableRectangle';
import DraggableCodeBlock from './DraggableItems/DraggableCodeBlock';
import DraggableImage from './DraggableItems/DraggableImage';
import DraggableMoonBlock from './DraggableItems/DraggableMoonBlock';
import DraggableLetter from './DraggableItems/DraggableLetter';

interface DraggableItemProps {
  item: IReceivingItems;
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  isDragItemPicked: boolean[][][];
}

const DraggableItem = (props: DraggableItemProps) => {
  if (
    props.isDragItemPicked[props.pageNumber][props.dragNumber][
      props.itemNumber
    ] === true &&
    props.item.type !== 'letter'
  ) {
    return null;
  }
  return (
    <View style={styles.container}>
      {props.item.type === 'image' && (
        <DraggableImage
          item={props.item}
          dragNumber={props.dragNumber}
          itemNumber={props.itemNumber}
        />
      )}
      {props.item.type === 'rectangle' && (
        <DraggableRectangle
          item={props.item}
          dragNumber={props.dragNumber}
          itemNumber={props.itemNumber}
        />
      )}
      {props.item.type === 'codeBlock' && (
        <DraggableCodeBlock
          item={props.item}
          pageNumber={props.pageNumber} // receivingNames={}
          dragNumber={props.dragNumber}
          itemNumber={props.itemNumber}
        />
      )}
      {props.item.type === 'moonBlock' && (
        <DraggableMoonBlock
          item={props.item}
          pageNumber={props.pageNumber} // receivingNames={}
          dragNumber={props.dragNumber}
          itemNumber={props.itemNumber}
        />
      )}
      {props.item.type === 'letter' && (
        <DraggableLetter
          item={props.item}
          dragNumber={props.dragNumber}
          itemNumber={props.itemNumber}
          isPicked={
            props.isDragItemPicked[props.pageNumber][props.dragNumber][
              props.itemNumber
            ]
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DraggableItem;

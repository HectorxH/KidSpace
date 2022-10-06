import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IReceivingItems} from '../../../types/activity';
import DraggableRectangle from './DraggableItems/DraggableRectangle';
import DraggableCodeBlock from './DraggableItems/DraggableCodeBlock';
import DraggableImage from './DraggableItems/DraggableImage';

interface DraggableItemProps {
  item: IReceivingItems;
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
}

const DraggableItem = (props: DraggableItemProps) => {
  return (
    <View style={styles.container}>
      {props.item.type === 'image' && (
        <DraggableImage item={props.item} itemNumber={props.itemNumber} />
      )}
      {props.item.type === 'rectangle' && (
        <DraggableRectangle item={props.item} itemNumber={props.itemNumber} />
      )}
      {props.item.type === 'codeBlock' && (
        <DraggableCodeBlock
          item={props.item}
          pageNumber={props.pageNumber} // receivingNames={}
          dragNumber={props.dragNumber}
          itemNumber={props.itemNumber}
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
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IReceivingItems} from '../../../../types/activity';
import CodeBlock from '../CodeBlock';

interface DraggableCodeBlockProps {
  item: IReceivingItems;
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  // receivingNames: [string[][][], ReactStateSetter<string[][][]>];
}

const DraggableCodeBlock = (props: DraggableCodeBlockProps) => {
  return (
    <View style={styles.container}>
      <DraxView
        style={styles.dragContainer}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        payload={[props.dragNumber, props.itemNumber]}
        longPressDelay={10}>
        <CodeBlock item={props.item} value={props.item.value} />
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dragContainer: {
    flex: 1,
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 0,
    opacity: 1,
  },
});

export default DraggableCodeBlock;

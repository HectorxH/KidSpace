import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggableItems} from '../../../../types/activity';
import {RSize} from '../../../../utils/responsive';

interface DraggableRectangleProps {
  item: IDraggableItems;
  dragNumber: number;
  itemNumber: number;
}

const DraggableRectangle = (props: DraggableRectangleProps) => {
  return (
    <View style={styles.container}>
      <DraxView
        style={styles.draggableRectangle}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        payload={[props.dragNumber, props.itemNumber]}
        longPressDelay={10}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{props.item.value}</Text>
        </View>
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  draggableRectangle: {
    flex: 1,
    elevation: 10,
    height: '100%',
    width: '100%',
    backgroundColor: '#5C9DEC',
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 0,
    opacity: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: RSize(0.045, 'h'),
    textTransform: 'none',
    color: 'white',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableRectangle;

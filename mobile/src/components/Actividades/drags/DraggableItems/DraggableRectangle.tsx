import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggableItems} from '../../../../types/activity';

interface DraggableRectangleProps {
  item: IDraggableItems;
  dragNumber: number;
  itemNumber: number;
}

const DraggableRectangle = (props: DraggableRectangleProps) => {
  const {fontScale} = useWindowDimensions();
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
          <Text
            style={[
              styles.textStyle,
              {fontSize: styles.textStyle.fontSize / fontScale},
            ]}>
            {props.item.value}
          </Text>
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
    fontSize: 14,
    textTransform: 'none',
    color: 'white',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableRectangle;

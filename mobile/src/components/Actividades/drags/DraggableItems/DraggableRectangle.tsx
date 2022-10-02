import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggableItems} from '../../../../types/activity';
import {RSize} from '../../../../utils/responsive';
import Layout from '../../../Utils/Layout';

interface DraggableRectangleProps {
  item: IDraggableItems;
  itemNumber: number;
}

const DraggableRectangle = (props: DraggableRectangleProps) => {
  return (
    <View style={styles.container}>
      <Layout
        position={props.item.position}
        ObjectView={
          <DraxView
            style={styles.draggableRectangle}
            draggingStyle={styles.dragging}
            dragReleasedStyle={styles.dragging}
            hoverDraggingStyle={styles.hoverDragging}
            payload={props.itemNumber}
            longPressDelay={10}>
            <Text style={styles.textStyle}>{props.item.value}</Text>
          </DraxView>
        }
      />
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
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.045, 'h'),
    textTransform: 'none',
    color: 'white',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableRectangle;

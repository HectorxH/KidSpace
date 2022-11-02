import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggableItems} from '../../../../types/activity';

interface DraggableLetterProps {
  item: IDraggableItems;
  dragNumber: number;
  itemNumber: number;
  isPicked: boolean;
}

const DraggableLetter = (props: DraggableLetterProps) => {
  const {fontScale} = useWindowDimensions();
  console.log(props.isPicked);
  return (
    <View style={styles.container}>
      {props.isPicked === true && (
        <View style={styles.container}>
          <View style={styles.pickedcontainer} />
        </View>
      )}
      {props.isPicked !== true && (
        <DraxView
          style={styles.draggableLetter}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 0,
  },
  pickedcontainer: {
    flex: 1,
    elevation: 10,
    borderRadius: 10,
    height: '100%',
    width: '100%',
    backgroundColor: '#D9D9D9',
  },
  draggableLetter: {
    flex: 1,
    elevation: 10,
    borderRadius: 10,
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 0,
    opacity: 1,
    elevation: 10,
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
    color: '#063D69',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableLetter;

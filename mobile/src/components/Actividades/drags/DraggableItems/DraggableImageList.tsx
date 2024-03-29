import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DraxView} from 'react-native-drax';
import Images from '../../../../assets/images/images';
import {IDraggableItems} from '../../../../types/activity';

interface DraggableImageProps {
  item: IDraggableItems;
  itemNumber: number;
  dragNumber: number;
}

const DraggableImage = (props: DraggableImageProps) => {
  return (
    <View style={styles.container}>
      <DraxView
        style={styles.draggableImage}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        payload={[props.dragNumber, props.itemNumber]}
        longPressDelay={10}>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={Images.items[props.item.name]}
        />
        {/* <View style={styles.test} /> */}
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 10,
    height: '100%',
    width: '100%',
  },
  test: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  draggableImage: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    opacity: 1,
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

export default DraggableImage;

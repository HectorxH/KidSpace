import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import Images from '../../../../assets/images/images';

interface ReceivingImageProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  draggable: IDraggable;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
}

const ReceivingImage = (props: ReceivingImageProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [receivingValues, setReceivingValues] = props.receivingValues;

  const dragStyle = [styles.receivingBase];

  const updateImage = (payload: number) => {
    let newReceivingValues = [...receivingValues];
    let newUserDragAnswers = [...userDragAnswers];
    const receivedImageName = draggable.draggableItems[payload].value;

    newReceivingValues[pageNumber][dragNumber][itemNumber] = receivedImageName;
    newUserDragAnswers[pageNumber][dragNumber][itemNumber] = receivedImageName;

    setReceivingValues(newReceivingValues);
    setUserDragAnswers(newUserDragAnswers);
  };

  function resetAnswer() {}

  return (
    <View style={styles.container}>
      <DraxView
        style={dragStyle}
        receivingStyle={[styles.receivingBase, styles.receivingHover]}
        onTouchStart={() => {
          resetAnswer();
        }}
        onReceiveDragDrop={event => {
          updateImage(event.dragged.payload[1]);
        }}>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={
            Images.items[receivingValues[pageNumber][dragNumber][itemNumber]]
          }
        />
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receivingBase: {
    height: '100%',
    width: '100%',
    borderRadius: RSize(0.015, 'h'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B5B5B5',
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
  },
  receivingHover: {
    borderColor: 'red',
    borderWidth: 2,
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    opacity: 1,
  },
});

export default ReceivingImage;

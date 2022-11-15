import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IJumpCard} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
// import {Button} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import Items from './Items';
import Texts from './Texts';

interface CardComponentProps {
  onPressFunction(): void;
  jumpCard: IJumpCard;
  disabled: boolean;
  pageNumber: number;
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const CardComponent = (props: CardComponentProps) => {
  const {onPressFunction, jumpCard} = props;
  return (
    <TouchableOpacity
      activeOpacity={props.disabled === false ? 1 : 0.5}
      disabled={props.disabled}
      style={
        props.disabled === false ? styles.container : styles.containerDisabled
      }
      onPress={onPressFunction}>
      <View style={styles.overlay}>
        <Items
          images={jumpCard.items}
          resize="cover"
          specialTexture={''}
          borderRadius={jumpCard.borderRadius}
        />
      </View>
      <View style={styles.overlay}>
        <Texts
          texts={jumpCard.texts}
          pageNumber={props.pageNumber}
          draggable={[]}
          userDragAnswers={props.userDragAnswers}
          pickedDragAnswers={props.pickedDragAnswers}
          pickedDragAnswersIndex={props.pickedDragAnswersIndex}
          isDragItemPicked={props.isDragItemPicked}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: RSize(0.05, 'h'),
    // borderBottomStartRadius: RSize(0.05, 'h'),
    // borderBottomEndRadius: RSize(0.05, 'h'),
    elevation: 10,
  },
  containerDisabled: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: RSize(0.05, 'h'),
    // borderBottomStartRadius: RSize(0.05, 'h'),
    // borderBottomEndRadius: RSize(0.05, 'h'),
    elevation: 10,
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default CardComponent;

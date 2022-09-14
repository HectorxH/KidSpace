import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {IJumpCard} from '../../types/activity';
// import {Button} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import Items from './Items';
import Texts from './Texts';

interface CardComponentProps {
  onPressFunction(): void;
  jumpCard: IJumpCard;
  disabled: boolean;
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
        <Items images={jumpCard.items} resize="cover" />
      </View>
      <View style={styles.overlay}>
        <Texts texts={jumpCard.texts} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomStartRadius: RSize(0.05, 'h'),
    borderBottomEndRadius: RSize(0.05, 'h'),
    elevation: 10,
  },
  containerDisabled: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomStartRadius: RSize(0.05, 'h'),
    borderBottomEndRadius: RSize(0.05, 'h'),
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
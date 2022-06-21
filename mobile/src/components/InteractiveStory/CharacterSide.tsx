import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';

const CharacterSide = (props: {
  character: any;
  mood: any;
  characterPosition: any;
}) => {
  const character = props.character;
  const mood = props.mood;
  const characterPosition = props.characterPosition;

  return (
    <View
      style={
        character !== 'none'
          ? characterPosition === 'left'
            ? styles.containerLeft
            : styles.containerRight
          : {}
      }>
      <View style={styles.characterContainer}>
        <Image
          style={styles.characterImage}
          resizeMode="contain"
          source={character !== 'none' ? Images.character[character][mood] : {}}
        />
      </View>
      <View style={styles.storyPad} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  containerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  storyPad: {
    flex: 7,
  },
  characterContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  characterImage: {
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export default CharacterSide;

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';

const CharacterSide = (props: {character: any; mood: any}) => {
  const character = props.character;
  const mood = props.mood;

  return (
    <View style={character !== 'none' ? styles.characterContainer : {}}>
      <Image
        style={styles.characterImage}
        resizeMode="contain"
        source={character !== 'none' ? Images.character[character][mood] : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  characterContainer: {
    flex: 2,
  },
  characterImage: {
    height: '100%',
    alignSelf: 'center',
  },
});

export default CharacterSide;

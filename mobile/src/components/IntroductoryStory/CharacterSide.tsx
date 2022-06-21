import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';

interface CharacterSideProps {
  character: string;
  mood: string;
}

const CharacterSide = ({character, mood}: CharacterSideProps) => {
  if (character === 'none') {
    return null;
  }

  return (
    <View style={styles.characterContainer}>
      <Image
        style={styles.characterImage}
        resizeMode="contain"
        source={Images.character[character][mood]}
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

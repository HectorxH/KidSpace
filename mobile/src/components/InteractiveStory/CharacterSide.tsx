import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';
import {RSize} from '../../utils/responsive';

interface CharacterSideProps {
  character: string;
  mood: string;
  characterPosition: string;
}

const CharacterSide = ({
  character,
  mood,
  characterPosition,
}: CharacterSideProps) => {
  // let style =

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
  characterContainer: {
    flexDirection: 'column',
    width: '30%',
  },
  characterImage: {
    aspectRatio: 1.4,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export default CharacterSide;

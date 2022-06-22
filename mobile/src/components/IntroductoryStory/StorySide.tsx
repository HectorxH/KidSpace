import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {CharacterPosition} from '../../types/story';
import {RSize} from '../../utils/responsive';

interface StorySideProps {
  message: string;
  characterPosition: CharacterPosition;
}

const StorySide = ({message, characterPosition}: StorySideProps) => {
  const messages = message.split('*');

  return (
    <View style={styles.storyContainerColumn}>
      <View style={styles.storyPad} />
      <View
        style={
          characterPosition === 'left'
            ? styles.storyContainerRowLeft
            : styles.storyContainerRowRight
        }>
        <View style={styles.storyBox}>
          <Text style={styles.baseText}>
            {messages.map((word, index) => {
              return (
                <Text
                  style={index % 2 === 1 ? styles.oddText : styles.evenText}
                  key={word}>
                  {word}
                </Text>
              );
            })}
          </Text>
        </View>
        <View style={styles.storyPad} />
      </View>
      <View style={styles.storyPad} />
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainerColumn: {
    flex: 3,
    flexDirection: 'column',
  },
  storyContainerRowRight: {
    flex: 3,
    flexDirection: 'row-reverse',
  },
  storyContainerRowLeft: {
    flex: 3,
    flexDirection: 'row',
  },
  storyPad: {
    flex: 1,
  },
  storyBox: {
    flex: 6,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 5,
    paddingVertical: RSize(0.01, 'h'),
    paddingHorizontal: RSize(0.02, 'w'),
    borderColor: 'black',
  },
  baseText: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.075, 'h'),
    fontFamily: 'Poppins-Bold',
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
});

export default StorySide;

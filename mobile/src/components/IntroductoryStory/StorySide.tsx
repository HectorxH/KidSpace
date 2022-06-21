import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const StorySide = (props: {message: string; characterPosition: any}) => {
  const message = props.message.split('*');
  const characterPosition = props.characterPosition;

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
            {message.map((word, index) => {
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
    // backgroundColor: 'white',
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
    // alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'black',
  },
  baseText: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Poppins',
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
});

export default StorySide;

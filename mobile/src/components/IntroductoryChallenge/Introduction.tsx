import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Introduction = (props) => {
  const message = props.message.split('*');

  return (
    <View style={styles.horizontalContainer}>
      <View style={styles.leftPad} />
      <View style={styles.verticalContainer}>
        <View style={styles.pad} />
        <View style={styles.storyBox}>
          <View style={styles.horizontalContainer}>
            <View style={styles.pad} />
            <View style={styles.textContainer}>
              <Text style={styles.baseText}>
                {message.map((word, index) => {
                  return (
                    <Text
                      style={index % 2 === 1 ? styles.oddText : styles.evenText}
                      key={word.concat(index.toString())}>
                      {word}
                    </Text>
                  );
                })}
              </Text>
            </View>
            <View style={styles.pad} />
          </View>
        </View>
        <View style={styles.pad} />
      </View>
      <View style={styles.rightPad} />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPad: {
    flex: 1,
  },
  rightPad: {
    flex: 3,
  },
  verticalContainer: {
    flex: 11,
    flexDirection: 'column',
  },
  pad: {
    flex: 2,
  },
  storyBox: {
    flex: 6,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 30,
    justifyContent: 'center',
    flexDirection: 'column',
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

export default Introduction;

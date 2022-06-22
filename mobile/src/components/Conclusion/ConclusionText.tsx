import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {RSize} from '../../utils/responsive';

const ConclusionText = props => {
  const text = props.text;
  const pagina = props.pagina;

  return (
    <View style={styles.textBody}>
      <View
        style={[styles.textBox, pagina === 'story' ? {borderWidth: 5} : {}]}>
        <Text style={styles.baseText}>
          {text.split('*').map((word, index) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  textBody: {
    flex: 1,
    flexDirection: 'column',
  },
  textBox: {
    flex: 1,
    borderRadius: RSize(0.02),
    justifyContent: 'center',
    paddingHorizontal: RSize(0.04),
    elevation: 7,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: RSize(0.03),
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  baseText: {
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.03),
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
});

export default ConclusionText;

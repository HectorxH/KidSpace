import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';

interface TextsProps {
  texts: [{text: string; start: number[]; end: number[]}] | [];
}

const Texts = ({texts}: TextsProps) => {
  if (texts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {texts.map((text: {text: string; start: number[]; end: number[]}) => {
        const message = (
          <Text style={styles.baseText}>
            {text.text.split('*').map((word: string, index: number) => {
              return (
                <Text
                  style={index % 2 === 1 ? styles.oddText : styles.evenText}
                  key={word}>
                  {word}
                </Text>
              );
            })}
          </Text>
        );
        return (
          <View
            style={styles.overlay}
            key={
              text.start[0].toString() +
              text.start[1].toString() +
              text.end[0].toString() +
              text.end[1].toString()
            }>
            <Layout
              object={text}
              ObjectView={<View style={styles.textBox}>{message}</View>}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  baseText: {
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

export default Texts;

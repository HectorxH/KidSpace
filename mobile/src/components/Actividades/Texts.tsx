import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';
import {ITexts} from '../../types/activity';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getTextStyle} from './utils';

interface TextsProps {
  texts: ITexts[] | never[];
}

const Texts = ({texts}: TextsProps) => {
  if (texts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {texts.map((text: ITexts) => {
        const textStyles = getTextStyle(styles.baseText, text.settings);
        const message = (
          <Text
            style={textStyles.settings}
            key={text.position.start.toString()}>
            {typeof text.leftIcon !== 'undefined' && (
              <Icon
                name={text.leftIcon.name}
                size={RSize(text.leftIcon.size)}
                color={text.leftIcon.color}
              />
            )}
            {text.text.split('*').map((word: string, index: number) => {
              return (
                <Text
                  style={
                    typeof textStyles.textColor.color !== 'undefined'
                      ? textStyles.textColor
                      : index % 2 === 1
                      ? styles.oddText
                      : styles.evenText
                  }
                  key={word + index.toString() + text.position.end.toString()}>
                  {word}
                </Text>
              );
            })}
            {typeof text.rightIcon !== 'undefined' && (
              <Icon
                name={text.rightIcon.name}
                size={RSize(text.rightIcon.size)}
                color={text.rightIcon.color}
              />
            )}
          </Text>
        );
        return (
          <View
            style={styles.overlay}
            key={
              text.position.start[0].toString() +
              text.position.start[1].toString() +
              text.position.end[0].toString() +
              text.position.end[1].toString()
            }>
            <Layout
              position={text.position}
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
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.06, 'h'),
    fontWeight: 'normal',
    elevation: 0,
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
});

export default Texts;

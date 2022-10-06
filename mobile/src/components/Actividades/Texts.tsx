import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';
import {IDraggable, ITexts} from '../../types/activity';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getTextStyle} from './utils';
import _ from 'lodash';
import {ReactStateSetter} from '../../types/others';
import ReceivingRectangleText from './drags/ReceivingItems/ReceivingRectangleText';

interface TextsProps {
  pageNumber: number;
  texts: ITexts[] | never[];
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  draggable: IDraggable[];
}

const Texts = ({
  texts,
  pageNumber,
  userDragAnswers,
  pickedDragAnswers,
  draggable,
}: TextsProps) => {
  if (texts.length === 0) {
    return null;
  }
  const dragRectangleT = (idx: number, w: string, k: string) => {
    return (
      <View style={styles.receivingRectangleStyle} key={idx + w + k}>
        <ReceivingRectangleText
          pageNumber={pageNumber}
          dragNumber={0}
          itemNumber={idx}
          userDragAnswers={userDragAnswers}
          pickedDragAnswers={pickedDragAnswers}
          draggable={draggable[0]}
        />
      </View>
    );
  };
  const iconCheck = (idx: number, w: string, k: string) => {
    return (
      <View style={styles.iconContainer} key={idx + w + k}>
        <Icon name={'check'} size={RSize(0.05, 'h')} color={'green'} />
      </View>
    );
  };
  const keywords = ['dragRectangle', 'iconDragCheck'];
  const components: {
    [key: string]: (idx: number, w: string, k: string) => JSX.Element;
  } = {
    dragRectangle: dragRectangleT,
    iconDragCheck: iconCheck,
  };

  const format = (text: string, auxKey: string) => {
    let newText: (string | JSX.Element)[] = [text];
    for (let i = 0; i < keywords.length; i++) {
      newText = _.flattenDeep<string | JSX.Element>(
        newText.map(t =>
          typeof t === 'string'
            ? t
                .split(`{{${keywords[i]}}}`)
                .map((sentence, sentenceIndex) =>
                  sentenceIndex < t.split(`{{${keywords[i]}}}`).length - 1
                    ? [
                        sentence,
                        components[keywords[i]](
                          sentenceIndex,
                          sentence + auxKey,
                          keywords[i],
                        ),
                      ]
                    : [sentence],
                )
            : t,
        ),
      );
    }
    return newText;
  };

  return (
    <View style={styles.container}>
      {texts.map((text: ITexts, textIndex: number) => {
        const textStyles = getTextStyle(styles.baseText, text.settings);
        const arrComps = format(text.text, textIndex.toString());
        const message = (
          <View key={textIndex + text.text} style={styles.containerTexts}>
            {arrComps.map(
              (sentence: string | JSX.Element, sentenceIndex: number) => {
                return typeof sentence !== 'string'
                  ? sentence
                  : typeof sentence === 'string' &&
                      sentence.split('*').map((words, wordsIndex) => {
                        let textStyle =
                          typeof textStyles.textColor.color !== 'undefined'
                            ? textStyles.textColor
                            : wordsIndex % 2 === 1
                            ? styles.oddText
                            : styles.evenText;
                        return words.split(' ').map((word, wordIndex) => {
                          return (
                            <View
                              key={
                                word + wordsIndex + sentenceIndex + wordIndex
                              }>
                              <Text style={[textStyles.settings, textStyle]}>
                                {wordIndex === words.split(' ').length - 1
                                  ? word
                                  : word + ' '}
                              </Text>
                            </View>
                          );
                        });
                      });
              },
            )}
          </View>
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
  iconContainer: {
    height: '100%',
  },
  containerTexts: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  receivingRectangleStyle: {
    height: 25,
    width: 90,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
  },
  textBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RSize} from '../../utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import ReceivingRectangleText from './drags/ReceivingItems/ReceivingRectangleText';

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
    <View style={styles.receivingRectangleStyle} key={idx + w + k}>
      <Icon name={'check'} size={RSize(0.05, 'h')} color={'green'} />
    </View>
  );
};
const keywords = ['dragRectangle', 'iconCheck'];
const components: {
  [key: string]: (idx: number, w: string, k: string) => JSX.Element;
} = {
  dragRectangle: dragRectangleT,
  iconCheck: iconCheck,
};

export const format = (text: string, auxKey: string) => {
  let newText: (string | JSX.Element)[] = [text];
  for (let i = 0; i < keywords.length; i++) {
    newText = _.flattenDeep<string | JSX.Element>(
      newText.map(t =>
        typeof t === 'string'
          ? t
              .split(`{${keywords[i]}}`)
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

const styles = StyleSheet.create({
  receivingRectangleStyle: {
    height: 25,
    width: 90,
  },
});

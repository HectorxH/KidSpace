import React from 'react';
import {View, StyleSheet} from 'react-native';

import Items from './Items';
import TextBoxes from './TextBoxes';
import Texts from './Texts';
import Alternativas from './Alternativas';
import AlternativasDropdown from './AlternativasDropdown';
import {ReactStateSetter} from '../../types/others';
import {IActivityPage} from '../../types/activity';

interface StoryComponentProps {
  story: IActivityPage;
  pageNumber: number;
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
}

const StoryComponent = (props: StoryComponentProps) => {
  const {story} = props;
  const items = typeof story.items !== 'undefined' ? story.items : [];
  const bubbles = typeof story.bubbles !== 'undefined' ? story.bubbles : [];
  const textBoxes =
    typeof story.textBoxes !== 'undefined' ? story.textBoxes : [];
  const texts = typeof story.texts !== 'undefined' ? story.texts : [];

  const alternativas =
    typeof story.alternativas !== 'undefined' ? story.alternativas : [];

  const alternativasDropdown =
    typeof story.alternativasDropdown !== 'undefined'
      ? story.alternativasDropdown
      : [];

  return (
    <View style={styles.container}>
      {/* Personajes/Imagenes */}
      <View style={styles.overlay}>
        <Items images={items} />
      </View>
      {/* Cuadros de texto */}
      <View style={styles.overlay}>
        <TextBoxes boxes={textBoxes} />
      </View>
      {/* Textos */}
      <View style={styles.overlay}>
        <Texts texts={texts} />
      </View>
      {/* Burbujas / otras imagenes que vayan sobre el cuadro de texto */}
      <View style={styles.overlay}>
        <Items images={bubbles} />
      </View>
      {/* Preguntas / Alternativas */}
      <View style={styles.overlay}>
        <Alternativas
          questions={alternativas}
          userAnswers={props.userAnswers}
          pickedAnswers={props.pickedAnswers}
          pageNumber={props.pageNumber}
        />
      </View>
      {/* Preguntas / Seleccion dropdown */}
      <View style={styles.overlay}>
        <AlternativasDropdown
          questionsDropdown={alternativasDropdown}
          userAnswersDropdown={props.userAnswersDropdown}
          pickedAnswersDropdown={props.pickedAnswersDropdown}
          pageNumber={props.pageNumber}
        />
      </View>
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
});

export default StoryComponent;

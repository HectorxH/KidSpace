import React from 'react';
import {View, StyleSheet} from 'react-native';

import Items from './Items';
import TextBoxes from './TextBoxes';
import Texts from './Texts';
import Alternativas from './Alternativas';
import AlternativasDropdown from './AlternativasDropdown';
import {ReactStateSetter} from '../../types/others';
import {IActivityPage} from '../../types/activity';
import Draggable from './Draggable';
import TextInputAnswer from './TextInputAnswer';

interface StoryComponentProps {
  story: IActivityPage;
  pageNumber: number;

  // drag
  dragAnswers: [string[], ReactStateSetter<string[]>];

  // alternativas
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];

  // dropdown
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];

  // quiz
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];

  // input field
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
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

  const quiz = typeof story.quiz !== 'undefined' ? story.quiz : [];

  const alternativasDropdown =
    typeof story.alternativasDropdown !== 'undefined'
      ? story.alternativasDropdown
      : [];

  const inputFieldQuestions =
    typeof story.textFieldQuestion !== 'undefined'
      ? story.textFieldQuestion
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
          quiz={quiz}
          userAnswers={props.userAnswers}
          pickedAnswers={props.pickedAnswers}
          userAnswersQuiz={props.userAnswersQuiz}
          pickedAnswersQuiz={props.pickedAnswersQuiz}
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
      {/* Preguntas / InputField */}
      <View style={styles.overlay}>
        <TextInputAnswer
          textFieldQuestions={inputFieldQuestions}
          userInputAnswers={props.userInputAnswers}
          pageNumber={props.pageNumber}
        />
      </View>
      {/* Draggable / Seleccion colores */}
      {typeof story.draggable !== 'undefined' &&
        story.draggable.draggable === true && (
          <View style={styles.overlay}>
            <Draggable
              pageNumber={props.pageNumber}
              userDragAnswers={props.dragAnswers}
            />
          </View>
        )}
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

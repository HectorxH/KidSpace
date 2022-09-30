import React from 'react';
import {View, StyleSheet} from 'react-native';

import Items from './Items';
import TextBoxes from './TextBoxes';
import Texts from './Texts';
import Alternativas from './Alternativas';
import AlternativasDropdown from './AlternativasDropdown';
import {ReactStateSetter} from '../../types/others';
import {IActivityPage} from '../../types/activity';
import TextInputAnswer from './TextInputAnswer';
import Draggable from './Draggable';

interface StoryComponentProps {
  story: IActivityPage;
  pageNumber: number;

  // alternativas
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];

  // dropdown
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];

  // drag
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];

  // quiz
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];

  // input field
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];

  // especial de modelo 3d con custom texture
  modelMaterial: string[][];
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

  const dragQuestions =
    typeof story.draggable !== 'undefined' ? story.draggable : [];

  return (
    <View style={styles.container}>
      {/* Personajes/Imagenes */}
      <View style={styles.overlay}>
        <Items
          images={items}
          specialTexture={
            props.pageNumber > 1
              ? props.modelMaterial[props.pageNumber - 2][0]
              : ''
          }
        />
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
        <Items
          images={bubbles}
          specialTexture={
            props.pageNumber > 1
              ? props.modelMaterial[props.pageNumber - 2][0]
              : ''
          }
        />
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
      {typeof story.draggable !== 'undefined' && (
        <View style={styles.overlay}>
          <Draggable
            pageNumber={props.pageNumber}
            userDragAnswers={props.userDragAnswers}
            pickedDragAnswers={props.pickedDragAnswers}
            receivingNames={props.receivingNames}
            receivingValues={props.receivingValues}
            draggable={dragQuestions}
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

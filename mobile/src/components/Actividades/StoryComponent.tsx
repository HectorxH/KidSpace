import React from 'react';
import {View, StyleSheet} from 'react-native';

import Items from './Items';
import TextBoxes from './TextBoxes';
import Texts from './Texts';
import Alternativas from './Alternativas';
import AlternativasDropdown from './AlternativasDropdown';
import TextInputAnswer from './TextInputAnswer';
import Draggable from './Draggable';
import {IStoryComponentParams} from '../../types/story';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider} from 'react-native-drax';
import LottieComponent from './LottieComponent';
import TextBoxesDragChecking from './TextBoxesDragChecking';
import FeedbackJose from './FeedbackJose';

interface StoryComponentProps {
  storyComponentParams: IStoryComponentParams;
}

const StoryComponent = (props: StoryComponentProps) => {
  const {
    pageNumber,
    story,
    lotties,
    toggleDefaultValue,
    toggleValues,
    modelMaterial,
    userAnswers,
    pickedAnswers,
    userAnswersQuiz,
    pickedAnswersQuiz,
    userAnswersDropdown,
    pickedAnswersDropdown,
    isDragItemPicked,
    userInputAnswers,
    userDragAnswers,
    rightDragAnswers,
    pickedDragAnswers,
    pickedDragAnswersIndex,
    receivingNames,
    receivingValues,
    joseItem,
    joseMessage,
  } = props.storyComponentParams;

  const pagina = story[pageNumber];
  const items = typeof pagina.items !== 'undefined' ? pagina.items : [];
  const bubbles = typeof pagina.bubbles !== 'undefined' ? pagina.bubbles : [];
  const textBoxes =
    typeof pagina.textBoxes !== 'undefined' ? pagina.textBoxes : [];
  const textBoxesDragChecking =
    typeof pagina.textBoxesDragChecking !== 'undefined'
      ? pagina.textBoxesDragChecking
      : [];

  const texts = typeof pagina.texts !== 'undefined' ? pagina.texts : [];

  const alternativas =
    typeof pagina.alternativas !== 'undefined' ? pagina.alternativas : [];

  const quiz = typeof pagina.quiz !== 'undefined' ? pagina.quiz : [];
  const feedbackJose =
    typeof pagina.feedbackJose !== 'undefined' ? pagina.feedbackJose : false;

  const alternativasDropdown =
    typeof pagina.alternativasDropdown !== 'undefined'
      ? pagina.alternativasDropdown
      : [];

  const inputFieldQuestions =
    typeof pagina.textFieldQuestion !== 'undefined'
      ? pagina.textFieldQuestion
      : [];

  const dragQuestions =
    typeof pagina.draggable !== 'undefined' ? pagina.draggable : [];

  if (
    toggleDefaultValue[pageNumber] === false &&
    toggleValues[pageNumber][0] !== 1
  ) {
    return null;
  }
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <DraxProvider>
          {/* Personajes/Imagenes */}
          <View style={styles.overlay}>
            <Items
              images={items}
              specialTexture={
                pageNumber > 1 ? modelMaterial[pageNumber - 2][0] : ''
              }
            />
          </View>
          {/* Cuadros de texto */}
          <View style={styles.overlay}>
            <TextBoxes boxes={textBoxes} />
          </View>
          {/* Cuadros de texto para checking de drag */}
          <View style={styles.overlay}>
            <TextBoxesDragChecking
              boxes={textBoxesDragChecking}
              userDragAnswers={userDragAnswers[0]}
              rightDragAnswers={rightDragAnswers}
            />
          </View>
          {/* Textos */}
          <View style={styles.overlay}>
            <Texts
              pageNumber={pageNumber}
              userDragAnswers={userDragAnswers}
              pickedDragAnswers={pickedDragAnswers}
              draggable={dragQuestions}
              texts={texts}
              pickedDragAnswersIndex={pickedDragAnswersIndex}
              isDragItemPicked={isDragItemPicked}
            />
          </View>
          {/* Burbujas / otras imagenes que vayan sobre el cuadro de texto */}
          <View style={styles.overlay}>
            <Items
              images={bubbles}
              specialTexture={
                pageNumber > 1 ? modelMaterial[pageNumber - 2][0] : ''
              }
            />
          </View>
          {/* Burbujas / otras imagenes que vayan sobre el cuadro de texto */}
          <View style={styles.overlay}>
            <FeedbackJose
              joseItem={joseItem[0]}
              joseMessage={joseMessage[0]}
              feedbackJose={feedbackJose}
            />
          </View>
          {/* Preguntas / Alternativas */}
          <View style={styles.overlay}>
            <Alternativas
              questions={alternativas}
              quiz={quiz}
              userAnswers={userAnswers}
              pickedAnswers={pickedAnswers}
              userAnswersQuiz={userAnswersQuiz}
              pickedAnswersQuiz={pickedAnswersQuiz}
              pageNumber={pageNumber}
            />
          </View>
          {/* Preguntas / Seleccion dropdown */}
          <View style={styles.overlay}>
            <AlternativasDropdown
              questionsDropdown={alternativasDropdown}
              userAnswersDropdown={userAnswersDropdown}
              pickedAnswersDropdown={pickedAnswersDropdown}
              pageNumber={pageNumber}
            />
          </View>
          {/* Preguntas / InputField */}
          <View style={styles.overlay}>
            <TextInputAnswer
              textFieldQuestions={inputFieldQuestions}
              userInputAnswers={userInputAnswers}
              pageNumber={pageNumber}
            />
          </View>
          {/* Draggable */}
          <View style={styles.overlay}>
            <Draggable
              pageNumber={pageNumber}
              userDragAnswers={userDragAnswers}
              pickedDragAnswers={pickedDragAnswers}
              isDragItemPicked={isDragItemPicked}
              pickedDragAnswersIndex={pickedDragAnswersIndex}
              receivingNames={receivingNames}
              receivingValues={receivingValues}
              draggable={dragQuestions}
              joseItem={joseItem}
              joseMessage={joseMessage}
            />
          </View>
          <View style={styles.overlay}>
            <LottieComponent lotties={lotties[pageNumber]} />
          </View>
        </DraxProvider>
      </GestureHandlerRootView>
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

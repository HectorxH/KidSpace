import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {Button} from 'react-native-paper';
import Activities from './assets/activities/activities';
import DesafioIntroductorioSceneAR from './components/ARScenes/DesafioIntroductorioAR';
import Inventario from './components/inventario/inventario';
import Introduction from './components/IntroductoryChallenge/Introduction';
import Questions from './components/IntroductoryChallenge/Questions';
import ToggleButton from './components/IntroductoryChallenge/QuestionsButton';
import ContinueButton from './components/IntroductoryChallenge/ContinueButton';
import StoryNavigation from './components/StoryNavigation';

const Desafio = ({navigation, route}) => {
  const props = route.params;
  const actividad = props.actividad;
  const tipo = props.tipo;
  const [models, setModels] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [canMove, setCanMove] = useState(0);
  const [estado, setEstado] = useState('story');
  const [toggleQuestions, setToggleQuestions] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: DesafioIntroductorioSceneAR,
        }}
        viroAppProps={{
          models: [...models],
          items: Activities[actividad][tipo].items,
          actividad: actividad,
        }}
      />
      {toggleQuestions === true ? (
        <View style={styles.overlay}>
          <Questions
            quiz={Activities[actividad][tipo].quiz}
            toggleQuestions={toggleQuestions}
            answersCount={answersCount}
            setAnswersCount={setAnswersCount}
          />
        </View>
      ) : (
        <View />
      )}
      <View
        style={
          Activities[actividad][tipo].items.length === models.length ||
          estado === 'story'
            ? styles.overlay
            : styles.off
        }>
        <ToggleButton
          toggleQuestions={toggleQuestions}
          setToggleQuestions={setToggleQuestions}
          settings={Activities[actividad][tipo].settings[0]}
        />
      </View>
      <View style={toggleQuestions === true ? styles.overlay : styles.off}>
        <ContinueButton
          answersCount={answersCount}
          answersNum={Activities[actividad][tipo].quiz.length}
          settings={Activities[actividad][tipo].settings[1]}
          navigation={navigation}
        />
      </View>
      <View style={estado === 'story' ? styles.overlay : styles.off}>
        <Introduction
          message={Activities[actividad][tipo].story[pageNumber].message}
        />
      </View>
      <View
        style={
          Activities[actividad][tipo].items.length !== models.length
            ? styles.overlay
            : styles.off
        }>
        <Inventario
          items={Activities[actividad][tipo].items}
          models={models}
          setModels={setModels}
        />
      </View>
      {canMove === 1 ||
      estado === 'story' ||
      (estado === 'quiz' &&
        Activities[actividad][tipo][estado][pageNumber].rightAnswer ===
          'none') ? (
        <StoryNavigation
          storyLength={Activities[actividad][tipo][estado].length}
          pageNumber={[pageNumber, setPageNumber]}
          canMove={[canMove, setCanMove]}
          estado={estado}
          setEstado={setEstado}
        />
      ) : (
        <View />
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
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // backgroundColor: '#000000aa',
  },
  off: {
    flex: 0,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Desafio;

import React, {useState, useRef} from 'react';
import {View, StyleSheet, StatusBar, ImageSourcePropType} from 'react-native';
// @ts-ignore
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import Activities from './assets/activities/activities';
import DesafioIntroductorioSceneAR from './components/ARScenes/DesafioIntroductorioAR';
import Inventario from './components/inventario/inventario';
import Introduction from './components/IntroductoryChallenge/Introduction';
import Questions from './components/IntroductoryChallenge/Questions';
import ToggleButton from './components/IntroductoryChallenge/QuestionsButton';
import ContinueButton from './components/IntroductoryChallenge/ContinueButton';
import StoryNavigation from './components/StoryNavigation';
import DynamicTable from './components/Tables/DynamicTable';
import {DesafioProps} from './types/navigation';
import {DesafioEstado, Vec3} from './types/activity';

const Desafio = ({navigation, route}: DesafioProps) => {
  const props = route.params;
  const actividad = props.actividad;
  const tipo = props.tipo;
  const [models, setModels] = useState<ImageSourcePropType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [canMove, setCanMove] = useState(0);
  const [estado, setEstado] = useState<DesafioEstado>('story');
  const [toggleQuestions, setToggleQuestions] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [positions, setPositions] = useState<Vec3[]>([]);

  let sceneNav = useRef<ViroARSceneNavigator>(null);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ViroARSceneNavigator
        // autofocus={true}
        // bloomEnabled={true}
        ref={sceneNav}
        initialScene={{
          // @ts-ignore
          scene: DesafioIntroductorioSceneAR,
        }}
        viroAppProps={{
          models: [...models],
          items: Activities[actividad][tipo].items,
          actividad: actividad,
          positions: positions,
        }}
      />
      {toggleQuestions === true ? (
        <View style={styles.overlay}>
          {tipo === 'introductory' ? (
            <View style={styles.questions}>
              <Questions
                quiz={Activities[actividad][tipo].quiz}
                toggleQuestions={toggleQuestions}
                answersCount={[answersCount, setAnswersCount]}
              />
            </View>
          ) : (
            <View style={styles.table}>
              <DynamicTable answersCount={[answersCount, setAnswersCount]} />
            </View>
          )}
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
          toggleQuestions={[toggleQuestions, setToggleQuestions]}
          settings={Activities[actividad][tipo].settings[0]}
          answersCounts={[answersCount, setAnswersCount]}
        />
      </View>
      <View style={toggleQuestions === true ? styles.overlay : styles.off}>
        <ContinueButton
          answersCount={answersCount}
          answersNum={Activities[actividad][tipo].quiz.length}
          settings={Activities[actividad][tipo].settings[1]}
          navigation={navigation}
          tipo={tipo}
          setNumPag={undefined}
        />
      </View>
      <View style={estado === 'story' ? styles.overlay : styles.off}>
        <Introduction
          message={Activities[actividad][tipo].story[pageNumber].message}
        />
      </View>
      <View style={styles.overlay}>
        <Inventario
          items={Activities[actividad][tipo].items}
          models={[models, setModels]}
          positions={[positions, setPositions]}
          visible={!toggleQuestions}
          sceneNav={sceneNav}
        />
      </View>
      {canMove === 1 ||
      estado === 'story' ||
      (estado === 'quiz' &&
        Activities[actividad][tipo][estado][pageNumber].rightAnswer ===
          'none') ? (
        <StoryNavigation
          storyLength={Activities[actividad][tipo].quiz.length}
          pageNumber={[pageNumber, setPageNumber]}
          canMove={[canMove, setCanMove]}
          estado={[estado, setEstado]}
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
    // backgroundColor: '#000000aa',
  },
  questions: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // backgroundColor: '#000000aa',
  },
  table: {
    flex: 1,
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

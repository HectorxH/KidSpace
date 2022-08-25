import React, {useState, useRef} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
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
import {DesafiosProps} from './types/navigation';
import {DesafioEstado, Vec3} from './types/activity';
import {RSize} from './utils/responsive';
import CellMenu from './components/Tables/CellMenu';
import {Cell} from 'react-native-table-component';

const Desafio = ({navigation, route}: DesafiosProps) => {
  const props = route.params;
  const actividad = props.actividad;
  const tipo = props.tipo;
  const [models, setModels] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [canMove, setCanMove] = useState(0);
  const [estado, setEstado] = useState<DesafioEstado>('story');
  const [toggleQuestions, setToggleQuestions] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [positions, setPositions] = useState<Vec3[]>([]);

  let sceneNav = useRef<ViroARSceneNavigator>(null);

  // Desafio introductorio styles
  // perdon uwu
  const [leftAnswerStyles, setLeftAnswerStyles] = useState({
    0: styles.answerButton,
    1: styles.answerButton,
    2: styles.answerButton,
  });

  const [leftAnswerTextStyles, setLeftAnswerTextStyles] = useState({
    0: styles.answerText,
    1: styles.answerText,
    2: styles.answerText,
  });

  const [rightAnswerStyles, setRightAnswerStyles] = useState({
    0: styles.answerButton,
    1: styles.answerButton,
    2: styles.answerButton,
  });

  const [rightAnswerTextStyles, setRightAnswerTextStyles] = useState({
    0: styles.answerText,
    1: styles.answerText,
    2: styles.answerText,
  });

  // Desafío interactivo styles
  const [isCorrect1, setIsCorrect1] = useState(false);
  const [isCorrect2, setIsCorrect2] = useState(false);
  const [isCorrect3, setIsCorrect3] = useState(false);
  const [value1, setValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);
  const [value3, setValue3] = useState<number | null>(null);

  const tableData = [
    [
      <Cell
        data={'Margarita'}
        style={{backgroundColor: '#eeeeee', flex: 1}}
        textStyle={styles.dataText}
      />,
      <Cell
        data={'Girasol'}
        style={{backgroundColor: '#eebc00', flex: 1}}
        textStyle={styles.dataText}
      />,
      <Cell
        data={'Iris'}
        style={{backgroundColor: '#bf96f1', flex: 1}}
        textStyle={styles.dataText}
      />,
    ],
    [
      <CellMenu
        correct={9}
        isCorrect={[isCorrect1, setIsCorrect1]}
        answersCount={[answersCount, setAnswersCount]}
        value={[value3, setValue3]}
      />,
      <CellMenu
        correct={7}
        isCorrect={[isCorrect2, setIsCorrect2]}
        answersCount={[answersCount, setAnswersCount]}
        value={[value2, setValue2]}
      />,
      <CellMenu
        correct={4}
        isCorrect={[isCorrect3, setIsCorrect3]}
        answersCount={[answersCount, setAnswersCount]}
        value={[value1, setValue1]}
      />,
    ],
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ViroARSceneNavigator
        worldAlignment={'Camera'}
        numberOfTrackedImages={4}
        ref={sceneNav}
        initialScene={{
          // @ts-ignore
          scene: DesafioIntroductorioSceneAR,
        }}
        viroAppProps={{
          models: [...models],
          items: Activities[actividad][tipo].items,
          actividad: actividad,
          positions: [positions, setPositions],
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
                leftAnswerButtonStyles={[leftAnswerStyles, setLeftAnswerStyles]}
                leftAnswerTextStyles={[
                  leftAnswerTextStyles,
                  setLeftAnswerTextStyles,
                ]}
                rightAnswerButtonStyles={[
                  rightAnswerStyles,
                  setRightAnswerStyles,
                ]}
                rightAnswerTextStyles={[
                  rightAnswerTextStyles,
                  setRightAnswerTextStyles,
                ]}
              />
            </View>
          ) : (
            <View style={styles.table}>
              <DynamicTable
                answersCount={[answersCount, setAnswersCount]}
                tableData={tableData}
              />
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
  answerButton: {
    borderRadius: RSize(0.04, 'h'),
    borderWidth: 3,
    justifyContent: 'center',
    borderColor: '#5C9DEC',
  },
  answerText: {
    color: '#063D69',
    textTransform: 'none',
    fontSize: RSize(0.035, 'h'),
    fontFamily: 'Poppins-Bold',
  },
  dataText: {textAlign: 'center', color: '#063D69', fontFamily: 'Poppins-Bold'},
});

export default Desafio;

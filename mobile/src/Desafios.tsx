import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useRef} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import DesafioIntroductorioSceneAR from './components/ARScenes/DesafioIntroductorioAR';
import Inventario from './components/inventario/inventario';
import Introduction from './components/IntroductoryChallenge/Introduction';

import Activities from './assets/activities/activities';
import Items from './components/Cuentos/Items';
import TextBoxes from './components/Cuentos/TextBoxes';
import Texts from './components/Cuentos/Texts';
import Questions from './components/Cuentos/Questions';
import ActNavigation from './components/Cuentos/ActNavigation';
import {DesafioEstado, Vec3} from './types/activity';

import {
  actividadNombre,
  desafioTipo,
  RootStackParamList,
} from './types/navigation';

interface DesafiosProps {
  tipo: desafioTipo;
  actividad: actividadNombre;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const Desafios = (props: DesafiosProps) => {
  const {actividad, tipo, navigation} = props;
  const [pageNumber, setPageNumber] = useState(0);
  const desafio = Activities[actividad][tipo];
  const story = desafio.story;
  // const story = desafio.quiz;

  let sceneNav = useRef<ViroARSceneNavigator>(null);
  const [models, setModels] = useState<number[]>([]);
  const [positions, setPositions] = useState<Vec3[]>([]);

  // Variables para controlar avance en preguntas de alternativas
  const [userAnswers, setUserAnswers] = useState<number[][][]>(
    typeof story !== 'undefined'
      ? story.map(s => s.questions.map(q => q.rightAnswer.map(() => 0)))
      : [[[]]],
  );
  const [pickedAnswers, setPickedAnswers] = useState<number[][][]>(
    typeof story !== 'undefined'
      ? story.map(s => s.questions.map(q => q.answers.map(() => 0)))
      : [[[]]],
  );

  // Variables para controlar avance en preguntas con dropdown
  // pendiente

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

      {/* Personajes/Imagenes */}
      <View style={styles.overlay}>
        <Items images={story[pageNumber].items} />
      </View>
      {/* Cuadros de texto */}
      <View style={styles.overlay}>
        <TextBoxes boxes={story[pageNumber].textBoxes} />
      </View>
      {/* Textos */}
      <View style={styles.overlay}>
        <Texts texts={story[pageNumber].texts} />
      </View>
      {/* Burbujas / otras imagenes que vayan sobre el cuadro de texto */}
      <View style={styles.overlay}>
        <Items images={story[pageNumber].bubbles} />
      </View>
      {/* Preguntas / Alternativas */}
      <View style={styles.overlay}>
        <Questions
          questions={story[pageNumber].questions}
          userAnswers={[userAnswers, setUserAnswers]}
          pickedAnswers={[pickedAnswers, setPickedAnswers]}
          pageNumber={pageNumber}
        />
      </View>
      <ActNavigation
        storyLength={story.length}
        pageNumber={[pageNumber, setPageNumber]}
        navigation={navigation}
        tipo={tipo}
        actividad={actividad}
        userAnswers={userAnswers[pageNumber]}
      />
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
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Desafios;

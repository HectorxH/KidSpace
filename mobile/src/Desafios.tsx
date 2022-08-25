import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import Items from './components/Cuentos/Items';
import TextBoxes from './components/Cuentos/TextBoxes';
import Texts from './components/Cuentos/Texts';
import Questions from './components/Cuentos/Questions';
import ActNavigation from './components/Cuentos/ActNavigation';
import Images from './assets/images/images';
import Stories from './assets/stories/stories';
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
  const story = Stories[actividad][tipo];
  const [pageNumber, setPageNumber] = useState(0);

  const [userAnswers, setUserAnswers] = useState<number[][]>(
    typeof story !== 'undefined'
      ? story.map(s => s.questions.map(() => 0))
      : [[]],
  );
  const [pickedAnswers, setPickedAnswers] = useState<number[][][]>(
    typeof story !== 'undefined'
      ? story.map(s => s.questions.map(q => q.answers.map(() => 0)))
      : [[[]]],
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        resizeMode="cover"
        source={Images.background[story[pageNumber].background]}
        style={styles.backgroundImage}>
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
      </ImageBackground>
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

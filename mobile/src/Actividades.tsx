import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {ActividadesProps} from './types/navigation';
import ActividadComponent from './components/Actividades/ActividadComponent';
import Activities from './assets/activities/activities';

const Actividades = ({navigation, route}: ActividadesProps) => {
  const nombreActividad = route.params.actividad;

  const actividad = Activities[nombreActividad];

  const [pageNumber, setPageNumber] = useState(0);

  // Variables para controlar avance en preguntas de alternativas
  const [userAnswers, setUserAnswers] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.alternativas !== 'undefined'
        ? s.alternativas.map(q => q.rightAnswer.map(() => 0))
        : [[]],
    ),
  );
  const [pickedAnswers, setPickedAnswers] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.alternativas !== 'undefined'
        ? s.alternativas.map(q => q.answers.map(() => 0))
        : [[]],
    ),
  );

  // Variables para controlar avance en preguntas de alternativasDropdown
  const [userAnswersDropdown, setUserAnswersDropdown] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.alternativasDropdown !== 'undefined'
        ? s.alternativasDropdown.map(q => q.rightAnswer.map(() => 0))
        : [[]],
    ),
  );
  const [pickedAnswersDropdown, setPickedAnswersDropdown] = useState<
    number[][][]
  >(
    actividad.map(s =>
      typeof s.alternativasDropdown !== 'undefined'
        ? s.alternativasDropdown.map(q => q.answers.map(() => 0))
        : [[]],
    ),
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.overlay}>
        <ActividadComponent
          actividades={actividad}
          nombreActividad={nombreActividad}
          pageNumber={[pageNumber, setPageNumber]}
          userAnswers={[userAnswers, setUserAnswers]}
          pickedAnswers={[pickedAnswers, setPickedAnswers]}
          userAnswersDropdown={[userAnswersDropdown, setUserAnswersDropdown]}
          pickedAnswersDropdown={[
            pickedAnswersDropdown,
            setPickedAnswersDropdown,
          ]}
          navigation={navigation}
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
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Actividades;

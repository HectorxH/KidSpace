import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Actividad, Vec3} from '../../types/activity';
import {RootStackParamList} from '../../types/navigation';
import {ReactStateSetter} from '../../types/others';
import JumpButton from './JumpButton';
import JumpCard from './JumpCard';

interface ActNavigationProps {
  actividades: Actividad;
  cantMonedas: number;
  storyLength: number;
  pageNumber: [number, ReactStateSetter<number>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;

  // drag
  dragAnswers: [string[], ReactStateSetter<string[]>];
  rightDragAnswer: string[];

  // inputfield
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswer: number[][];

  // alternativas
  userAnswers: number[][][];

  // dropdown
  userAnswersDropdown: number[][][];

  // quiz
  userAnswersQuiz: number[][];

  // botones
  toggleValues: [number[], ReactStateSetter<number[]>];
  jumpVisibility: boolean;

  // inventario / 3d
  models: [number[], ReactStateSetter<number[]>];
  placedItems: [number[], ReactStateSetter<number[]>];
  nPlacedItems: [number, ReactStateSetter<number>];
  positions: [Vec3[], ReactStateSetter<Vec3[]>];
}

const ActNavigation = (props: ActNavigationProps) => {
  const {actividades, storyLength, navigation} = props;
  const cantMonedas = props.cantMonedas;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const userAnswers = props.userAnswers[pageNumber];
  const userAnswersDropdown = props.userAnswersDropdown[pageNumber];
  const userAnswersQuiz = props.userAnswersQuiz[pageNumber];

  const actividad = actividades[pageNumber];

  // Se bloquea la navegación cuando aparecen preguntas sin responder en el cuento/desafio
  var respuestasCorrectas =
    userAnswers
      .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersDropdown
      .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersQuiz.reduce((x, y) => Number(x) + Number(y), 0);

  var cantidadRespuestas =
    userAnswers.map(b => b.length).reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersDropdown
      .map(b => b.length)
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersQuiz.length;

  const nextPageNumber = () => {
    if (pageNumber !== storyLength - 1) {
      if (
        typeof actividades[pageNumber + 1].AR !== 'undefined' &&
        actividades[pageNumber + 1].AR?.start === true
      ) {
        props.toggleValues[1]([0]);
        props.placedItems[1](
          actividades[pageNumber + 1].AR!.models.map(() => 0),
        );
        props.nPlacedItems[1](0);
        props.models[1]([]);
        props.positions[1]([]);
        // setPlacedItems(items.map(() => 0));
        // setNPlacedItems(0);
        // props.models[1]([]);
        // setPositions([]);
      }
      setPageNumber(pageNumber + 1);
    } else {
      navigation?.navigate('Recompensas', {cantMonedas});
    }
  };

  const prevPageNumber = () => {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1);
    }
  };
  const jumpButtons =
    typeof actividad.jumpButton !== 'undefined' ? actividad.jumpButton : [];

  const jumpCards =
    typeof actividad.jumpCard !== 'undefined' ? actividad.jumpCard : [];

  return (
    <View style={styles.overlay}>
      {respuestasCorrectas === cantidadRespuestas &&
        jumpButtons.length === 0 &&
        jumpCards.length === 0 && (
          <View style={styles.overlay}>
            {/* // Cuando es desafio se carga boton para togglear preguntas  */}
            {/* // Cuando es cuento o introduccion de desafio se usa navegacion con tap  */}
            <TouchableWithoutFeedback onPress={prevPageNumber}>
              <View style={styles.container} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={nextPageNumber}>
              <View style={styles.container} />
            </TouchableWithoutFeedback>
          </View>
        )}
      {/* // Cuando es ejercicio o conclusion de desafio se usa navegacion con boton o cards */}
      {jumpCards.length !== 0 && (
        <View style={styles.overlay}>
          <JumpCard
            jumpCards={jumpCards}
            userAnswers={props.userAnswers}
            userAnswersDropdown={props.userAnswersDropdown}
            userAnswersQuiz={props.userAnswersQuiz}
            userDragAnswer={props.dragAnswers}
            rightDragAnswer={props.rightDragAnswer}
            userInputAnswers={props.userInputAnswers}
            rightInputAnswers={props.rightInputAnswer}
            pageNumber={props.pageNumber}
            toggleVisibility={props.jumpVisibility}
          />
        </View>
      )}
      {jumpButtons.length !== 0 && (
        <View style={styles.overlay}>
          <JumpButton
            jumpButtons={jumpButtons}
            userAnswers={props.userAnswers}
            userAnswersDropdown={props.userAnswersDropdown}
            userAnswersQuiz={props.userAnswersQuiz}
            userDragAnswer={props.dragAnswers}
            rightDragAnswer={props.rightDragAnswer}
            userInputAnswers={props.userInputAnswers}
            rightInputAnswers={props.rightInputAnswer}
            pageNumber={props.pageNumber}
            nextPage={() => nextPageNumber()}
            toggleVisibility={props.jumpVisibility}
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
    flexDirection: 'row',
  },
});

export default ActNavigation;

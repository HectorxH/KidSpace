import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Actividad} from '../../types/activity';
import {RootStackParamList} from '../../types/navigation';
import {ReactStateSetter} from '../../types/others';
import JumpButton from './JumpButton';
import JumpCard from './JumpCard';

interface ActNavigationProps {
  actividades: Actividad;
  storyLength: number;
  userAnswers: number[][][];
  userAnswersDropdown: number[][][];
  pageNumber: [number, ReactStateSetter<number>];
  jumpVisibility: boolean;
  models: [number[], ReactStateSetter<number[]>];
  toggleValues: [number[], ReactStateSetter<number[]>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const ActNavigation = (props: ActNavigationProps) => {
  const {actividades, storyLength, navigation} = props;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const userAnswers = props.userAnswers[pageNumber];
  const userAnswersDropdown = props.userAnswersDropdown[pageNumber];

  const actividad = actividades[pageNumber];

  // Se bloquea la navegación cuando aparecen preguntas sin responder en el cuento/desafio
  var respuestasCorrectas =
    userAnswers
      .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersDropdown
      .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0);

  var cantidadRespuestas =
    userAnswers.map(b => b.length).reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersDropdown
      .map(b => b.length)
      .reduce((x, y) => Number(x) + Number(y), 0);

  const nextPageNumber = () => {
    if (pageNumber !== storyLength - 1) {
      if (typeof actividades[pageNumber + 1].AR !== 'undefined') {
        props.models[1]([]);
        props.toggleValues[1]([0]);
      }
      setPageNumber(pageNumber + 1);
    } else {
      navigation?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'MainMap'}],
        }),
      );
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
            pageNumber={props.pageNumber}
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

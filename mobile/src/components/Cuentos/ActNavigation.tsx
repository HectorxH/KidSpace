import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {DesafioEstado} from '../../types/activity';
import {
  actividadNombre,
  desafioTipo,
  RootStackParamList,
} from '../../types/navigation';
import {ReactStateSetter} from '../../types/others';

interface ActNavigationProps {
  storyLength: number;
  userAnswers: number[];
  tipo: desafioTipo;
  actividad: actividadNombre;
  pageNumber: [number, ReactStateSetter<number>];
  estado?: [DesafioEstado, ReactStateSetter<DesafioEstado>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const ActNavigation = (props: ActNavigationProps) => {
  const {storyLength, navigation, tipo, actividad, userAnswers} = props;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const actividades: keyof RootStackParamList = 'Actividades';
  const flujo: [desafioTipo, desafioTipo] = [
    'CuentoIntroductorio',
    // 'DesafioIntroductorio',
    'CuentoInteractivo',
    // 'DesafioCreativo',
  ];

  // Se bloquea la navegación cuando aparecen preguntas sin responder en el cuento/desafio
  if (
    userAnswers.reduce(function (x, y) {
      return Number(x) + Number(y);
    }, 0) !== userAnswers.length
  ) {
    return null;
  }

  function nextPageNumber() {
    if (pageNumber !== storyLength - 1) {
      setPageNumber(pageNumber + 1);
    } else {
      let index = flujo.indexOf(tipo) + 1;
      console.log(index);
      if (index >= flujo.length) {
        navigation?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'MainMap'}],
          }),
        );
      } else {
        navigation?.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'MainMap'},
              {
                name: actividades,
                params: {actividad: actividad, tipo: flujo[index]},
              },
            ],
          }),
        );
      }
    }
  }

  function prevPageNumber() {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1);
    }
  }

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={prevPageNumber}>
        <View style={styles.container} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={nextPageNumber}>
        <View style={styles.container} />
      </TouchableWithoutFeedback>
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

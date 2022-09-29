import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Actividad, IActividadLog, Vec3} from '../../types/activity';
import {RootStackParamList} from '../../types/navigation';
import {ReactStateSetter} from '../../types/others';
import JumpButton from './JumpButton';
import JumpCard from './JumpCard';
import _ from 'lodash';

interface ActNavigationProps {
  actividades: Actividad;
  nombreActividad: string;
  cantMonedas: number;
  storyLength: number;
  pageNumber: [number, ReactStateSetter<number>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;

  // outputs para servidor
  actividadLog: [IActividadLog, ReactStateSetter<IActividadLog>];
  tiempoInicio: number;
  preguntasRespuestasQuiz: [string[][], string[][][]];

  // alternativas
  userAnswers: number[][][];

  // dropdown
  userAnswersDropdown: number[][][];

  // drag
  userDragAnswers: string[][][];
  rightDragAnswers: string[][][];

  // inputfield
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswer: number[][];

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
  setUpdateMaterial: ReactStateSetter<boolean>;
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  setMaterialSelectorToggle: ReactStateSetter<number>;
  selectedPageOrder: [number, ReactStateSetter<number>];
}

const ActNavigation = (props: ActNavigationProps) => {
  const {actividades, storyLength, navigation} = props;
  const [pageNumber, setPageNumber] = props.pageNumber;
  const [actividadLog, setActividadLog] = props.actividadLog;
  const cantMonedas = props.cantMonedas;
  const nombreActividad = props.nombreActividad;
  const userAnswers = props.userAnswers[pageNumber];
  const userAnswersDropdown = props.userAnswersDropdown[pageNumber];
  const userAnswersQuiz = props.userAnswersQuiz[pageNumber];

  const actividad = actividades[pageNumber];

  // Se bloquea la navegación cuando aparecen preguntas sin responder en el cuento/desafio
  // Eliminar estas dos variables y cambiar por funcion checkAnswer, por ahora ayudan para avanzar rapido cuando no hay jumpbuttons
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
        props.setUpdateMaterial(true);
        props.toggleValues[1]([0]);
        props.placedItems[1](
          actividades[pageNumber + 1].AR!.models.map(() => 0),
        );
        props.nPlacedItems[1](0);
        props.models[1]([]);
        props.positions[1]([]);
      }
      props.setMaterialSelectorToggle(0);
      setPageNumber(pageNumber + 1);
    } else {
      let preguntasQuiz = _.flattenDeep(props.preguntasRespuestasQuiz[0]);

      let respuestasQuiz = _.flattenDeep(
        props.preguntasRespuestasQuiz[1]
          .map((pagina, numeroPagina) =>
            pagina[0].length > 0
              ? pagina.map(
                  (pregunta, numeroPregunta) =>
                    pregunta[
                      props.userAnswersQuiz[numeroPagina][numeroPregunta]
                    ],
                )
              : [],
          )
          .filter(pagina => pagina.length > 0),
      );
      let actLog: IActividadLog = {
        tipo: actividadLog.tipo,
        actividad: actividadLog.actividad,
        unidad: actividadLog.unidad,
        steam: actividadLog.steam,
        estudiante: actividadLog.estudiante,
        curso: actividadLog.curso,
        quizFinal: preguntasQuiz.map(function (pregunta, numeroPregunta) {
          return {
            pregunta: pregunta,
            respuesta: respuestasQuiz[numeroPregunta],
          };
        }),
        duracion: ((Date.now() - props.tiempoInicio) / 1000).toString(),
        fecha: actividadLog.fecha,
      };
      console.log(actLog);
      setActividadLog(actLog);
      navigation?.navigate('Recompensas', {cantMonedas, nombreActividad});
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
            userDragAnswers={props.userDragAnswers}
            rightDragAnswers={props.rightDragAnswers}
            userInputAnswers={props.userInputAnswers}
            rightInputAnswers={props.rightInputAnswer}
            pageNumber={props.pageNumber}
            toggleVisibility={props.jumpVisibility}
            modelMaterial={props.modelMaterial}
            selectedMaterial={props.selectedMaterial}
            setMaterialSelectorToggle={props.setMaterialSelectorToggle}
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
            userDragAnswers={props.userDragAnswers}
            rightDragAnswers={props.rightDragAnswers}
            userInputAnswers={props.userInputAnswers}
            rightInputAnswers={props.rightInputAnswer}
            pageNumber={props.pageNumber}
            nextPage={() => nextPageNumber()}
            toggleVisibility={props.jumpVisibility}
            modelMaterial={props.modelMaterial}
            selectedMaterial={props.selectedMaterial}
            setMaterialSelectorToggle={props.setMaterialSelectorToggle}
            selectedPageOrder={props.selectedPageOrder}
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

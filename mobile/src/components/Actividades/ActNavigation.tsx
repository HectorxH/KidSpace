import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {IActividadLog} from '../../types/activity';
import {RootStackParamList} from '../../types/navigation';
import JumpButton from './JumpButton';
import JumpCard from './JumpCard';
import _ from 'lodash';
import {IActNavigationParams} from '../../types/story';

interface ActNavigationProps {
  actNavigationParams: IActNavigationParams;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const ActNavigation = (props: ActNavigationProps) => {
  const {
    actividades,
    storyLength,
    cantMonedas,
    nombreActividad,
    setUpdateMaterial,
    setMaterialSelectorToggle,
    preguntasRespuestasQuiz,
    userAnswers,
    userAnswersDropdown,
    userAnswersQuiz,
    userDragAnswers,
    rightDragAnswers,
    userInputAnswers,
    rightInputAnswer,
    jumpVisibility,
    modelMaterial,
    selectedMaterial,
    selectedPageOrder,
    tiempoInicio,
  } = props.actNavigationParams;
  const navigation = props.navigation;

  const [pageNumber, setPageNumber] = props.actNavigationParams.pageNumber;
  const [actividadLog, setActividadLog] =
    props.actNavigationParams.actividadLog;

  const userAnswersPage = userAnswers[pageNumber];
  const userAnswersDropdownPage = userAnswersDropdown[pageNumber];
  const userAnswersQuizPage = userAnswersQuiz[pageNumber];

  const [toggleValues, setToggleValues] =
    props.actNavigationParams.toggleValues;

  const [placedItems, setPlacedItems] = props.actNavigationParams.placedItems;
  const [nPlacedItems, setNPlacedItems] =
    props.actNavigationParams.nPlacedItems;
  const [models, setModels] = props.actNavigationParams.models;
  const [positions, setPositions] = props.actNavigationParams.positions;

  const actividad = actividades[pageNumber];

  // Se bloquea la navegación cuando aparecen preguntas sin responder en el cuento/desafio
  // Eliminar estas dos variables y cambiar por funcion checkAnswer, por ahora ayudan para avanzar rapido cuando no hay jumpbuttons
  var respuestasCorrectas =
    userAnswersPage
      .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersDropdownPage
      .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersQuizPage.reduce((x, y) => Number(x) + Number(y), 0);

  var cantidadRespuestas =
    userAnswersPage
      .map(b => b.length)
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersDropdownPage
      .map(b => b.length)
      .reduce((x, y) => Number(x) + Number(y), 0) +
    userAnswersQuizPage.length;

  const nextPageNumber = async () => {
    if (pageNumber !== storyLength - 1) {
      if (
        typeof actividades[pageNumber + 1].AR !== 'undefined' &&
        actividades[pageNumber + 1].AR?.start === true
      ) {
        setUpdateMaterial(true);
        let newToggleValues = [...toggleValues];
        let newPlacedItems = [...placedItems];
        let newNPlacedItems = [...nPlacedItems];
        let newModels = [...models];
        let newPositions = [...positions];

        newToggleValues[pageNumber] = [0];
        newPlacedItems[pageNumber] =
          typeof actividades[pageNumber + 1].AR !== 'undefined' &&
          typeof actividades[pageNumber + 1].AR?.models !== 'undefined'
            ? actividades[pageNumber + 1].AR!.models!.map(() => 0)
            : [];
        newNPlacedItems[pageNumber] = 0;
        newModels[pageNumber] = [];
        newPositions[pageNumber] = [];

        setToggleValues(newToggleValues);
        setPlacedItems(newPlacedItems);
        setNPlacedItems(newNPlacedItems);
        setModels(newModels);
        setPositions(newPositions);
      }
      setMaterialSelectorToggle(0);
      setPageNumber(pageNumber + 1);
    } else {
      let preguntasQuiz = _.flattenDeep(preguntasRespuestasQuiz[0]);

      let respuestasQuiz = _.flattenDeep(
        preguntasRespuestasQuiz[1]
          .map((pagina, numeroPagina) =>
            pagina[0].length > 0
              ? pagina.map(
                  (pregunta, numeroPregunta) =>
                    pregunta[userAnswersQuiz[numeroPagina][numeroPregunta]],
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
        duracion: ((Date.now() - tiempoInicio) / 1000).toString(),
        fecha: actividadLog.fecha,
      };
      setActividadLog(actLog);
      navigation?.navigate('Recompensas', {
        cantMonedas,
        nombreActividad,
        actLog,
      });
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
            userAnswers={userAnswers}
            userAnswersDropdown={userAnswersDropdown}
            userAnswersQuiz={userAnswersQuiz}
            userDragAnswers={userDragAnswers}
            rightDragAnswers={rightDragAnswers}
            userInputAnswers={userInputAnswers}
            rightInputAnswers={rightInputAnswer}
            pageNumber={[pageNumber, setPageNumber]}
            toggleVisibility={jumpVisibility[pageNumber]}
            modelMaterial={modelMaterial}
            selectedMaterial={selectedMaterial}
            setMaterialSelectorToggle={setMaterialSelectorToggle}
          />
        </View>
      )}
      {jumpButtons.length !== 0 && (
        <View style={styles.overlay}>
          <JumpButton
            jumpButtons={jumpButtons}
            userAnswers={userAnswers}
            userAnswersDropdown={userAnswersDropdown}
            userAnswersQuiz={userAnswersQuiz}
            userDragAnswers={userDragAnswers}
            rightDragAnswers={rightDragAnswers}
            userInputAnswers={userInputAnswers}
            rightInputAnswers={rightInputAnswer}
            pageNumber={[pageNumber, setPageNumber]}
            nextPage={() => nextPageNumber()}
            toggleVisibility={jumpVisibility[pageNumber]}
            modelMaterial={modelMaterial}
            selectedMaterial={selectedMaterial}
            setMaterialSelectorToggle={setMaterialSelectorToggle}
            selectedPageOrder={selectedPageOrder}
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

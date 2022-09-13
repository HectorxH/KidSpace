import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {ActividadesProps} from './types/navigation';
import ActividadComponent from './components/Actividades/ActividadComponent';
import Activities from './assets/activities/activities';

const Actividades = ({navigation, route}: ActividadesProps) => {
  const nombreActividad = route.params.actividad;
  const cantMonedas = route.params.cantMonedas;

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

  // Variables para controlar avance en preguntas de Quiz
  const [userAnswersQuiz, setUserAnswersQuiz] = useState<number[][]>(
    actividad.map(s =>
      typeof s.quiz !== 'undefined' ? s.quiz.map(() => 0) : [],
    ),
  );
  const [pickedAnswersQuiz, setPickedAnswersQuiz] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.quiz !== 'undefined'
        ? s.quiz.map(q => q.answers.map(() => 0))
        : [[]],
    ),
  );

  // Variables para controlar avance en preguntas de drag; [pageNumber] = pageAnswer
  const [userDragAnswer, setUserDragAnswer] = useState<string[]>(
    actividad.map(() => ''),
  );
  const rightDragAnswer = actividad.map(s =>
    typeof s.draggable !== 'undefined' ? s.draggable.answer : '',
  );

  // Variables para controlar las texturas del modelo 3d en caso de que aplique
  // [pageNumber][models_number] = "nombre_textura", ejemplo: modelMaterial[0][0] = "azul_quijote"
  const [modelMaterial, setModelMaterial] = useState<string[][]>(
    actividad.map(s =>
      typeof s.AR !== 'undefined' ? s.AR.models.map(() => 'default') : [],
    ),
  );

  // Variables para controlar las texturas del modelo 3d usando el selector de texturas
  // [pageNumber][models_number][materialOrder] = "nombre_textura",
  // ejemplo: selectedModelMaterialFields[0][0][0] = "azul" // modelo 0 en página 0 tiene valor azul en textura 0
  // ejemplo: selectedModelMaterialFields[0][0][1] = "quijote"  // modelo 0 en página 0 tiene valor quijote en textura 1
  const [selectedMaterial, setSelectedMaterial] = useState<string[][][]>(
    actividad.map(s =>
      typeof s.AR !== 'undefined'
        ? s.AR.models.map(model =>
            typeof model.ARMaterials !== 'undefined'
              ? model.ARMaterials.materialOrder.map(() => 'default')
              : [],
          )
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
          cantMonedas={cantMonedas}
          pageNumber={[pageNumber, setPageNumber]}
          userAnswers={[userAnswers, setUserAnswers]}
          pickedAnswers={[pickedAnswers, setPickedAnswers]}
          userAnswersDropdown={[userAnswersDropdown, setUserAnswersDropdown]}
          pickedAnswersDropdown={[
            pickedAnswersDropdown,
            setPickedAnswersDropdown,
          ]}
          userAnswersQuiz={[userAnswersQuiz, setUserAnswersQuiz]}
          pickedAnswersQuiz={[pickedAnswersQuiz, setPickedAnswersQuiz]}
          dragAnswers={[userDragAnswer, setUserDragAnswer]}
          rightDragAnswer={rightDragAnswer}
          modelMaterial={[modelMaterial, setModelMaterial]}
          selectedMaterial={[selectedMaterial, setSelectedMaterial]}
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

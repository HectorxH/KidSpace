import {useState} from 'react';
import Activities from '../assets/activities/activities';
import {IActividadLog} from '../types/activity';
import {
  getNombreActividad,
  getNombreUnidad,
  getSteam,
  getTipoActividad,
} from '../components/Actividades/utils';
import {IActividadesParams} from '../types/story';
import ActividadesComponentParams from './ActividadesComponentInit';
import {ActividadesCompletadas} from '../types/activity';

const ActividadesParams = (
  nombreActividad: string,
  userName: string,
  userLastName: string,
  curso: string,
  cantMonedas: number,
  completadas: ActividadesCompletadas,
) => {
  const actividad = Activities[nombreActividad];
  const [pageNumber, setPageNumber] = useState(0);

  // Outputs para el servidor al final de la actividad
  const [actividadLog, setActividadLog] = useState<IActividadLog>({
    tipo: getTipoActividad(nombreActividad),
    actividad: getNombreActividad(nombreActividad),
    unidad: getNombreUnidad(nombreActividad),
    steam: getSteam(nombreActividad),
    estudiante: userName + ' ' + userLastName,
    curso: curso,
    quizFinal: [
      {
        pregunta: 'pregunta',
        respuesta: 'respuesta',
      },
      {
        pregunta: 'pregunta',
        respuesta: 'respuesta',
      },
    ],
    duracion: '0',
    fecha: new Date(Date.now()),
  });
  const [tiempoInicio, setTiempoInicio] = useState<number>(Date.now());

  // string de preguntas para output
  // [pageNumber][preguntaNumber] = preguntaText
  const preguntasQuiz = actividad.map(s =>
    typeof s.quiz !== 'undefined' ? s.quiz.map(q => q.pregunta) : [],
  );

  // string de respuestas para output
  const respuestasQuiz = actividad.map(s =>
    typeof s.quiz !== 'undefined'
      ? s.quiz.map(q => q.answers.map(answer => answer.text))
      : [[]],
  );
  // Variables para controlar avance en preguntas de alternativas
  // [pageNumber][preguntaNumber][rightAnswerNumber] = dragAnswer = 0 (mal) | 1 (bien)
  const [userAnswers, setUserAnswers] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.alternativas !== 'undefined'
        ? s.alternativas.map(q => q.rightAnswer.map(() => 0))
        : [[]],
    ),
  );
  // [pageNumber][preguntaNumber][answerFieldNumber] = dragAnswer = 0 (no responde) | 1 (bien) | (mal), se usa para estilos
  const [pickedAnswers, setPickedAnswers] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.alternativas !== 'undefined'
        ? s.alternativas.map(q => q.answers.map(() => 0))
        : [[]],
    ),
  );

  // Variables para controlar avance en preguntas de alternativasDropdown, mismo criterio de indices que alternativas
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
  // [pageNumber][questionNumber] = answerNumber
  const [userAnswersQuiz, setUserAnswersQuiz] = useState<number[][]>(
    actividad.map(s =>
      typeof s.quiz !== 'undefined' ? s.quiz.map(() => 0) : [],
    ),
  );
  // [pageNumber][questionNumber][answerNumber] = 0 | 1, mismo de alternativas
  const [pickedAnswersQuiz, setPickedAnswersQuiz] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.quiz !== 'undefined'
        ? s.quiz.map(q => q.answers.map(() => 0))
        : [[]],
    ),
  );

  // Variables para controlar avance en preguntas de InputField [pageNumber][questionNumber] = input
  const [userInputAnswers, setUserInputAnswer] = useState<number[][]>(
    actividad.map(s =>
      typeof s.textFieldQuestion !== 'undefined'
        ? s.textFieldQuestion.map(() => 0)
        : [0],
    ),
  );
  const rightInputAnswer = actividad.map(s =>
    typeof s.textFieldQuestion !== 'undefined'
      ? s.textFieldQuestion.map(q => q.rightAnswer)
      : [0],
  );
  // Variables para controlar avance en preguntas de drag;
  // Esta variable revisa que la cant de respuestas del usuario
  // sea igual a la cant de respuestas que necesita la pregunta
  // [pageNumber][dragNumber][answerNumber] = string con answer de drag
  const [userDragAnswers, setUserDragAnswers] = useState<string[][][]>(
    actividad.map(s =>
      typeof s.draggable !== 'undefined'
        ? s.draggable.map(q => q.answer.map(() => ''))
        : [[]],
    ),
  );
  // [pageNumber][dragNumber][receivingItemNumber] = dragAnswer = 0 (no responde) | 1 (bien) | 2 (mal), se usa para estilos
  const [pickedDragAnswers, setPickedDragAnswers] = useState<number[][][]>(
    actividad.map(s =>
      typeof s.draggable !== 'undefined'
        ? s.draggable.map(q => q.receivingItems.map(() => 0))
        : [[]],
    ),
  );
  // [pageNumber][dragNumber][receivingItemNumber] = dragAnswer = 0 (no responde) | 1 (bien) | 2 (mal), se usa para estilos
  const [pickedDragAnswersIndex, setPickedDragAnswersIndex] = useState<
    number[][][]
  >(
    actividad.map(s =>
      typeof s.draggable !== 'undefined'
        ? s.draggable.map(q => q.receivingItems.map(() => -1))
        : [[]],
    ),
  );
  // [pageNumber][dragNumber][answerNumber] = rightAnswer
  const rightDragAnswers = actividad.map(s =>
    typeof s.draggable !== 'undefined' ? s.draggable.map(q => q.answer) : [],
  );

  // [pageNumber][dragNumber][itemNumber] = itemName
  // se usa para controlar estilos en bloques de codigo
  const [receivingNames, setReceivingNames] = useState<string[][][]>(
    actividad.map(s =>
      typeof s.draggable !== 'undefined'
        ? s.draggable.map(q => q.receivingItems.map(item => item.name))
        : [[]],
    ),
  );

  // [pageNumber][dragNumber][itemNumber] = itemValue
  // se usa para controlar valores en campos de drag-receive
  const [receivingValues, setReceivingValues] = useState<string[][][]>(
    actividad.map(s =>
      typeof s.draggable !== 'undefined'
        ? s.draggable.map(q => q.receivingItems.map(item => item.value))
        : [['']],
    ),
  );

  // [pageNumber][dragNumber][itemNumber] = itemValue
  // se usa para controlar valores en campos de drag-receive
  const [isDragItemPicked, setIsDragItemPicked] = useState<boolean[][][]>(
    actividad.map(s =>
      typeof s.draggable !== 'undefined'
        ? s.draggable.map(q => q.draggableItems.map(() => false))
        : [[]],
    ),
  );

  // variables para controlar bloques de código (drag)
  // [pageNumber][dragNumber][itemNumber][top/bottom] = true | false;
  // const [itemFlaps, setItemFlaps] = useState<boolean[][][][]>(
  //   actividad.map(s)
  //   draggable.receivingItems.map(item => {
  //     let top = typeof item.top !== 'undefined' ? item.top : false;
  //     let bottom = typeof item.bottom !== 'undefined' ? item.bottom : false;
  //     return [top, bottom];
  //   }),
  // );

  // Variables para controlar las texturas del modelo 3d en caso de que aplique
  // [pageNumber][models_number] = "nombre_textura", ejemplo: modelMaterial[0][0] = "azul_quijote"
  const [modelMaterial, setModelMaterial] = useState<string[][]>(
    actividad.map(s =>
      typeof s.AR !== 'undefined' && typeof s.AR.models !== 'undefined'
        ? s.AR.models.map(() => 'default')
        : [],
    ),
  );

  // Variables para controlar las texturas del modelo 3d usando el selector de texturas
  // [pageNumber][models_number][materialOrder] = "nombre_textura",
  // ejemplo: selectedModelMaterialFields[0][0][0] = "azul" // modelo 0 en página 0 tiene valor azul en textura 0
  // ejemplo: selectedModelMaterialFields[0][0][1] = "quijote"  // modelo 0 en página 0 tiene valor quijote en textura 1
  const [selectedMaterial, setSelectedMaterial] = useState<string[][][]>(
    actividad.map(s =>
      typeof s.AR !== 'undefined' && typeof s.AR.models !== 'undefined'
        ? s.AR.models.map(model =>
            typeof model.ARMaterials !== 'undefined'
              ? model.ARMaterials.materialOrder.map(() => 'default')
              : [],
          )
        : [[]],
    ),
  );

  const actividadesParams: IActividadesParams = {
    actividades: actividad,
    pageNumber: [pageNumber, setPageNumber],
    nombreActividad: nombreActividad,
    cantMonedas: cantMonedas,
    completadas: completadas,
    userAnswers: [userAnswers, setUserAnswers],
    pickedAnswers: [pickedAnswers, setPickedAnswers],
    userAnswersDropdown: [userAnswersDropdown, setUserAnswersDropdown],
    pickedAnswersDropdown: [pickedAnswersDropdown, setPickedAnswersDropdown],
    userAnswersQuiz: [userAnswersQuiz, setUserAnswersQuiz],
    pickedAnswersQuiz: [pickedAnswersQuiz, setPickedAnswersQuiz],
    isDragItemPicked: [isDragItemPicked, setIsDragItemPicked],
    userDragAnswers: [userDragAnswers, setUserDragAnswers],
    pickedDragAnswers: [pickedDragAnswers, setPickedDragAnswers],
    pickedDragAnswersIndex: [pickedDragAnswersIndex, setPickedDragAnswersIndex],
    rightDragAnswers: rightDragAnswers,
    receivingNames: [receivingNames, setReceivingNames],
    receivingValues: [receivingValues, setReceivingValues],
    userInputAnswers: [userInputAnswers, setUserInputAnswer],
    rightInputAnswer: rightInputAnswer,
    modelMaterial: [modelMaterial, setModelMaterial],
    selectedMaterial: [selectedMaterial, setSelectedMaterial],
    actividadLog: [actividadLog, setActividadLog],
    tiempoInicio: [tiempoInicio, setTiempoInicio],
    preguntasRespuestasQuiz: [preguntasQuiz, respuestasQuiz],
  };

  const actividadesComponentParams =
    ActividadesComponentParams(actividadesParams);
  return actividadesComponentParams;
};

export default ActividadesParams;

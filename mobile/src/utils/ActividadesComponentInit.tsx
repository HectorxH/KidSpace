import {useState} from 'react';
import Models from '../assets/3d/models';
import {
  IModelChildrenProps,
  IModelProps,
  ITransform,
} from '../components/ARScenes/ARcomponents/utils';
import {Vec3} from '../types/activity';
import {
  IActividadesComponentParams,
  IActividadesParams,
  IActNavigationParams,
  IArmarDesarmarParams,
  IInventarioParams,
  ILottieComponentParams,
  IMarkerTrackerFeedbackParams,
  IMaterialSelectorParams,
  IStoryComponentParams,
  ITemperaturaSelectorParams,
  IToggleButtonParams,
  IViroAppParams,
} from '../types/story';

const ActividadesComponentParams = (actividadesParams: IActividadesParams) => {
  const {
    actividades,
    lotties,
    nombreActividad,
    cantMonedas,
    completadas,
    userDragAnswers,
    pickedDragAnswers,
    pickedDragAnswersIndex,
    isDragItemPicked,
    userInputAnswers,
    rightInputAnswer,
    userAnswers,
    userAnswersDropdown,
    userAnswersQuiz,
    pickedAnswers,
    pickedAnswersDropdown,
    pickedAnswersQuiz,
    selectedMaterial,
    modelMaterial,
    receivingNames,
    receivingValues,
    actividadLog,
    tiempoInicio,
    preguntasRespuestasQuiz,
    rightDragAnswers,
  } = actividadesParams;
  const [pageNumber, setPageNumber] = actividadesParams.pageNumber;

  // [pageNumber][modelNumber] = value
  const [models, setModels] = useState<number[][]>(actividades.map(() => []));
  const [positions, setPositions] = useState<Vec3[][]>(
    actividades.map(() => []),
  );
  const models3d = actividades.map(actividadPage =>
    typeof actividadPage.AR !== 'undefined' &&
    typeof actividadPage.AR.models !== 'undefined'
      ? actividadPage.AR.models
      : [],
  );

  const temperaturasList = actividades.map(actividadPage =>
    typeof actividadPage.AR !== 'undefined' &&
    typeof actividadPage.AR.models !== 'undefined'
      ? actividadPage.AR.models.map(model =>
          typeof model.temperaturas !== 'undefined' ? model.temperaturas : [],
        )
      : [[]],
  );

  const imageTrackers = actividades.map(actividadPage =>
    typeof actividadPage.AR !== 'undefined' &&
    typeof actividadPage.AR.imageTrackers !== 'undefined'
      ? actividadPage.AR.imageTrackers
      : [],
  );

  const toggleButtons = actividades.map(actividadPage =>
    typeof actividadPage.toggleButton !== 'undefined'
      ? actividadPage.toggleButton
      : [],
  );
  const toggleDefaultValue = actividades.map(actividadPage =>
    typeof actividadPage.toggleButton !== 'undefined'
      ? actividadPage.toggleButton[0].value
      : true,
  );
  // const [toggleValues, setToggleValues] = useState<number[][]>(
  //   toggleButtons.map(tButton => tButton.map(b => (b.value === true ? 1 : 0))),
  // );

  const [toggleValues, setToggleValues] = useState<number[][]>(
    actividades.map(actividadPage =>
      typeof actividadPage.toggleButton !== 'undefined'
        ? actividadPage.toggleButton[0].value === true
          ? [1]
          : [0]
        : [],
    ),
  );
  // vars texturas
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    useState<number>(0);
  const [armarDesarmarToggle, setArmarDesarmarToggle] = useState<number>(0);
  const [temperaturaSelectorToggle, setTemperaturaSelectorToggle] =
    useState<number>(0);
  const [selectedModelMaterials, setSelectedModelMaterials] = useState<{
    materialOrder: string[];
    materialChoices: string[][];
  }>({materialOrder: [], materialChoices: [[]]});
  const [updateMaterial, setUpdateMaterial] = useState<boolean>(false);
  const [selectedPageOrder, setSelectedPageOrder] = useState<number>(0);
  const [activeModelIndex, setActiveModelIndex] = useState<number>(0);

  // Vars inventario
  const hideInventory = actividades.map(actividadPage =>
    typeof actividadPage.AR !== 'undefined' &&
    typeof actividadPage.AR.hideInventory !== 'undefined'
      ? actividadPage.AR.hideInventory
      : false,
  );
  const [placedItems, setPlacedItems] = useState<number[][]>(
    models3d.map((model3d, pNumber) =>
      model3d.map((_item, index) => (models[pNumber].includes(index) ? 1 : 0)),
    ),
  );
  const [nPlacedItems, setNPlacedItems] = useState<number[]>(
    models.map(placedModels => placedModels.length),
  );

  // vars modelos 3d
  const [transforms, setTransforms] = useState<ITransform[][]>(
    models3d.map(model3d =>
      model3d.map(item => ({
        scale: item.scale,
        rotation: item.rotation,
        position: [0, 0, 0],
      })),
    ),
  );
  const modelProps: IModelProps[][] = models3d.map(model3d =>
    model3d.map(item => ({
      model: Models[item.model].model,
      altModel:
        typeof item.alt !== 'undefined'
          ? Models[item.alt].model
          : Models[item.model].model,
      alt: typeof item.alt !== 'undefined' ? item.alt : '',
      modelType: typeof item.type !== 'undefined' ? item.type : 'object',
      modelImage360: typeof item.image360 !== 'undefined' ? item.image360 : '',
      modelVideo360: typeof item.video360 !== 'undefined' ? item.video360 : '',
      resources: Models[item.model].resources,
      materials: Models[item.model].materials,
      defaultTexture: item.defaultTexture,
      type: Models[item.model].type,
      interactable:
        typeof item.interactable !== 'undefined' ? item.interactable : [],
      ARMaterials:
        typeof item.ARMaterials !== 'undefined'
          ? item.ARMaterials
          : {materialOrder: [], materialChoices: []},
    })),
  );
  // pagenumber-itemnumber-childnumber
  const modelChildrenProps: IModelChildrenProps[][][] = models3d.map(model3d =>
    model3d.map(item =>
      typeof item.childrens !== 'undefined'
        ? item.childrens.map(child => ({
            model: Models[child.model].model,
            altModel:
              typeof child.alt !== 'undefined'
                ? Models[child.alt].model
                : Models[child.model].model,
            alt: typeof child.alt !== 'undefined' ? child.alt : '',
            modelType:
              typeof child.type !== 'undefined' ? child.type : 'object',
            modelImage360:
              typeof child.image360 !== 'undefined' ? child.image360 : '',
            resources: Models[child.model].resources,
            materials: Models[child.model].materials,
            type: Models[child.model].type,
            interactable:
              typeof child.interactable !== 'undefined'
                ? child.interactable
                : [],
            ARMaterials:
              typeof child.ARMaterials !== 'undefined'
                ? child.ARMaterials
                : {materialOrder: [], materialChoices: []},

            rotation: child.rotation,
            scale: child.scale,
          }))
        : [],
    ),
  );

  const [rotations, setRotations] = useState<number[][]>(
    modelProps.map(model => model.map(() => 0)),
  );

  const [useAlt, setUseAlt] = useState<boolean[][]>(
    models3d.map(model3d => model3d.map(() => false)),
  );

  const [useChildrenAlt, setUseChildrenAlt] = useState<boolean[][][]>(
    models3d.map(model3d =>
      model3d.map(model =>
        typeof model.childrens !== 'undefined'
          ? model.childrens.map(() => false)
          : [],
      ),
    ),
  );

  // image tracking
  const [markerTrackingState, setMarkerTrackingState] = useState<string[][]>(
    actividades.map(actividadPage =>
      typeof actividadPage.AR !== 'undefined' &&
      typeof actividadPage.AR.imageTrackers !== 'undefined'
        ? actividadPage.AR.imageTrackers.map(() => 'lastKnownPose')
        : [],
    ),
  );

  const trackerMessages = actividades.map(actividadPage =>
    typeof actividadPage.AR !== 'undefined' &&
    typeof actividadPage.AR.trackerMessage !== 'undefined'
      ? actividadPage.AR.trackerMessage
      : '',
  );

  const trackerFeedbacks = actividades.map(actividadPage =>
    typeof actividadPage.AR !== 'undefined' &&
    typeof actividadPage.AR.trackerFeedback !== 'undefined'
      ? actividadPage.AR.trackerFeedback
      : '',
  );

  const [activeTracker, setActiveTracker] = useState<string[]>(
    actividades.map(() => ''),
  );
  const [activeTrackerIndex, setActiveTrackerIndex] = useState<number[]>(
    actividades.map(() => 0),
  );

  const [joseMessage, setJoseMessage] = useState<string>(
    '¡Arrastra cada residuo al basurero correcto!',
  );
  const [joseItem, setJoseItem] = useState<string>('JoseSmile');

  const ViroAppParams: IViroAppParams = {
    pageNumber: pageNumber,
    models: [...models],
    actividad: nombreActividad,
    positions: positions,
    models3d: models3d,
    imageTrackers: imageTrackers,
    modelProps: modelProps,
    modelChildrenProps: modelChildrenProps,
    transforms: [transforms, setTransforms],
    useAlt: [useAlt, setUseAlt],
    useChildrenAlt: [useChildrenAlt, setUseChildrenAlt],
    rotations: [rotations, setRotations],
    materialSelectorToggle: [materialSelectorToggle, setMaterialSelectorToggle],
    armarDesarmarToggle: [armarDesarmarToggle, setArmarDesarmarToggle],
    temperaturaSelectorToggle: [
      temperaturaSelectorToggle,
      setTemperaturaSelectorToggle,
    ],
    setSelectedModelMaterials: setSelectedModelMaterials,
    modelMaterial: modelMaterial[0],
    setActiveModelIndex: setActiveModelIndex,
    updateMaterial: [updateMaterial, setUpdateMaterial],
    markerTrackingState: [markerTrackingState, setMarkerTrackingState],
    activeTracker: [activeTracker, setActiveTracker],
    activeTrackerIndex: [activeTrackerIndex, setActiveTrackerIndex],
  };

  const InventarioParams: IInventarioParams = {
    pageNumber: pageNumber,
    models3d: models3d,
    models: [models, setModels],
    positions: [positions, setPositions],
    placedItems: [placedItems, setPlacedItems],
    nPlacedItems: [nPlacedItems, setNPlacedItems],
    hideInventory: hideInventory,
    toggleDefaultValue: toggleDefaultValue,
    toggleValues: toggleValues,

    modelProps: modelProps,
    updateMaterial: [updateMaterial, setUpdateMaterial],
    setSelectedModelMaterials: setSelectedModelMaterials,
    setMaterialSelectorToggle: setMaterialSelectorToggle,
    setArmarDesarmarToggle: setArmarDesarmarToggle,
    setTemperaturaSelectorToggle: setTemperaturaSelectorToggle,
  };

  const MaterialSelectorParams: IMaterialSelectorParams = {
    pageNumber: pageNumber,
    materialSelectorToggle: [materialSelectorToggle, setMaterialSelectorToggle],
    modelMaterial: modelMaterial,
    selectedMaterial: selectedMaterial,
    selectedModelMaterials: selectedModelMaterials,
    activeModelIndex: activeModelIndex,
    models3d: models3d,
    selectedPageOrder: [selectedPageOrder, setSelectedPageOrder],
  };

  const MarkerTrackerFeedbackParams: IMarkerTrackerFeedbackParams = {
    pageNumber: pageNumber,
    activeTrackerIndex: activeTrackerIndex,
    markerTrackingState: markerTrackingState,
    activeTracker: activeTracker,
    toggleDefaultValue: toggleDefaultValue,
    toggleValues: toggleValues,
    trackerMessages: trackerMessages,
    trackerFeedbacks: trackerFeedbacks,
  };

  const StoryComponentParams: IStoryComponentParams = {
    pageNumber: pageNumber,
    story: actividades,
    toggleDefaultValue: toggleDefaultValue,
    toggleValues: toggleValues,
    userInputAnswers: userInputAnswers,
    userAnswers: userAnswers,
    pickedAnswers: pickedAnswers,
    userAnswersDropdown: userAnswersDropdown,
    pickedAnswersDropdown: pickedAnswersDropdown,
    isDragItemPicked: isDragItemPicked,
    userDragAnswers: userDragAnswers,
    rightDragAnswers: rightDragAnswers,
    receivingNames: receivingNames,
    receivingValues: receivingValues,
    pickedDragAnswers: pickedDragAnswers,
    pickedDragAnswersIndex: pickedDragAnswersIndex,
    userAnswersQuiz: userAnswersQuiz,
    pickedAnswersQuiz: pickedAnswersQuiz,
    modelMaterial: modelMaterial[0],
    lotties: lotties,
    joseItem: [joseItem, setJoseItem],
    joseMessage: [joseMessage, setJoseMessage],
  };

  const ToggleButtonParams: IToggleButtonParams = {
    pageNumber: pageNumber,
    toggleButtons: toggleButtons,
    toggleDefaultValue: toggleDefaultValue,
    models3d: models3d,
    models: models,
    hideInventory: hideInventory,
    imageTrackers: imageTrackers,
    activeTracker: activeTracker,
    toggleQuestions: [toggleValues, setToggleValues],
  };

  const ActNavigationParams: IActNavigationParams = {
    pageNumber: [pageNumber, setPageNumber],
    actividadLog: actividadLog,
    tiempoInicio: tiempoInicio[0],
    preguntasRespuestasQuiz: preguntasRespuestasQuiz,
    actividades: actividades,
    nombreActividad: nombreActividad,
    cantMonedas: cantMonedas,
    completadas: completadas,
    storyLength: actividades.length,

    userDragAnswers: userDragAnswers,
    userInputAnswers: userInputAnswers,
    userAnswers: userAnswers,
    userAnswersDropdown: userAnswersDropdown,
    userAnswersQuiz: userAnswersQuiz,
    pickedAnswersQuiz: pickedAnswersQuiz[0],
    rightDragAnswers: rightDragAnswers,
    rightInputAnswer: rightInputAnswer,
    pickedDragAnswers: pickedDragAnswers,
    pickedDragAnswersIndex: pickedDragAnswersIndex,
    isDragItemPicked: isDragItemPicked,

    models: [models, setModels],
    placedItems: [placedItems, setPlacedItems],
    nPlacedItems: [nPlacedItems, setNPlacedItems],
    positions: [positions, setPositions],
    jumpVisibility: toggleDefaultValue.map(
      (tDefaultValue, toggleIndex) =>
        tDefaultValue === true || toggleValues[toggleIndex][0] === 1,
    ),
    toggleValues: [toggleValues, setToggleValues],
    setUpdateMaterial: setUpdateMaterial,
    modelMaterial: modelMaterial,
    selectedMaterial: selectedMaterial,
    setMaterialSelectorToggle: setMaterialSelectorToggle,
    selectedPageOrder: [selectedPageOrder, setSelectedPageOrder],
  };

  const LottieComponentParams: ILottieComponentParams = {
    pageNumber: pageNumber,
    lotties: lotties,
  };

  const ArmarDesarmarParams: IArmarDesarmarParams = {
    pageNumber: pageNumber,
    armarDesarmarToggle: [armarDesarmarToggle, setArmarDesarmarToggle],
    modelMaterial: modelMaterial,
    selectedMaterial: selectedMaterial,
    selectedModelMaterials: selectedModelMaterials,
    activeModelIndex: activeModelIndex,
    models3d: models3d,
    selectedPageOrder: [selectedPageOrder, setSelectedPageOrder],
    useAlt: [useAlt, setUseAlt],
    toggleValues: toggleValues,
    nPlacedItems: nPlacedItems,
  };

  const TemperaturaSelectorParams: ITemperaturaSelectorParams = {
    pageNumber: pageNumber,
    temperaturaSelectorToggle: [
      temperaturaSelectorToggle,
      setTemperaturaSelectorToggle,
    ],
    modelMaterial: modelMaterial,
    selectedMaterial: selectedMaterial,
    selectedModelMaterials: selectedModelMaterials,
    activeModelIndex: activeModelIndex,
    models3d: models3d,
    selectedPageOrder: [selectedPageOrder, setSelectedPageOrder],
    temperaturasList: temperaturasList,
    toggleValues: toggleValues,
    nPlacedItems: nPlacedItems,
  };

  const actividadComponentParams: IActividadesComponentParams = {
    pageNumber: pageNumber,
    actividades: actividades,
    viroAppParams: ViroAppParams,
    inventarioParams: InventarioParams,
    materialSelectorParams: MaterialSelectorParams,
    storyComponentParams: StoryComponentParams,
    toggleButtonParams: ToggleButtonParams,
    actNavigationParams: ActNavigationParams,
    markerTrackerFeedbackParams: MarkerTrackerFeedbackParams,
    lottiesComponentParams: LottieComponentParams,
    armarDesarmarParams: ArmarDesarmarParams,
    temperaturaSelectorParams: TemperaturaSelectorParams,
  };

  return actividadComponentParams;
};

export default ActividadesComponentParams;

import {useState} from 'react';
import {Vec3} from '../types/activity';
import {
  IActividadesComponentParams,
  IActividadesParams,
  IActNavigationParams,
  IInventarioParams,
  IMaterialSelectorParams,
  IStoryComponentParams,
  IToggleButtonParams,
  IViroAppParams,
} from '../types/story';

const ActividadesComponentParams = (actividadesParams: IActividadesParams) => {
  const {
    actividades,
    nombreActividad,
    cantMonedas,
    userDragAnswers,
    pickedDragAnswers,
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
  const [toggleValues, setToggleValues] = useState<number[][]>(
    toggleButtons.map(tButton => tButton.map(b => (b.value === true ? 1 : 0))),
  );

  // vars texturas
  const [materialSelectorToggle, setMaterialSelectorToggle] =
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

  const ViroAppParams: IViroAppParams = {
    pageNumber: pageNumber,
    models: [...models],
    actividad: nombreActividad,
    positions: positions,
    models3d: models3d,
    imageTrackers: imageTrackers,
    materialSelectorToggle: [materialSelectorToggle, setMaterialSelectorToggle],
    setSelectedModelMaterials: setSelectedModelMaterials,
    modelMaterial: modelMaterial[0],
    setActiveModelIndex: setActiveModelIndex,
    updateMaterial: [updateMaterial, setUpdateMaterial],
  };

  const InventarioParams: IInventarioParams = {
    pageNumber: pageNumber,
    models3d: models3d,
    showInventory: models3d.map(
      (m3d, pNumber) =>
        m3d.length !== models[pNumber].length &&
        hideInventory[pNumber] === false,
    ),
    visible: toggleDefaultValue.map(
      (tDefaultValue, toggleIndex) =>
        !(tDefaultValue === true || toggleValues[toggleIndex][0] === 1) ||
        tDefaultValue === true,
    ),
    setMaterialSelectorToggle: setMaterialSelectorToggle,
    models: [models, setModels],
    positions: [positions, setPositions],
    placedItems: [placedItems, setPlacedItems],
    nPlacedItems: [nPlacedItems, setNPlacedItems],
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
    userDragAnswers: userDragAnswers,
    receivingNames: receivingNames,
    receivingValues: receivingValues,
    pickedDragAnswers: pickedDragAnswers,
    userAnswersQuiz: userAnswersQuiz,
    pickedAnswersQuiz: pickedAnswersQuiz,
    modelMaterial: modelMaterial[0],
  };

  const ToggleButtonParams: IToggleButtonParams = {
    pageNumber: pageNumber,
    toggleButtons: toggleButtons,
    toggleDefaultValue: toggleDefaultValue,
    models3d: models3d,
    models: models,
    hideInventory: hideInventory,
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
    storyLength: actividades.length,
    userDragAnswers: userDragAnswers[0],
    rightDragAnswers: rightDragAnswers,
    userInputAnswers: userInputAnswers,
    rightInputAnswer: rightInputAnswer,
    userAnswers: userAnswers[0],
    userAnswersDropdown: userAnswersDropdown[0],
    userAnswersQuiz: userAnswersQuiz[0],
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

  const actividadComponentParams: IActividadesComponentParams = {
    pageNumber: pageNumber,
    actividades: actividades,
    viroAppParams: ViroAppParams,
    inventarioParams: InventarioParams,
    materialSelectorParams: MaterialSelectorParams,
    storyComponentParams: StoryComponentParams,
    toggleButtonParams: ToggleButtonParams,
    actNavigationParams: ActNavigationParams,
  };

  return actividadComponentParams;
};

export default ActividadesComponentParams;

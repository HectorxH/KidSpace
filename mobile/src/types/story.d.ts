import {
  IModelChildrenProps,
  IModelProps,
  ITransform,
} from '../components/ARScenes/ARcomponents/utils';
import {
  Actividad,
  IActividadLog,
  IImageTracker,
  ILottie,
  IModels,
  IToggleButton,
  Vec3,
} from './activity';
import {ReactStateSetter} from './others';
import {ActividadesCompletadas} from './activity';

export interface IActividadesParams {
  actividades: Actividad;
  lotties: ILottie[][];
  pageNumber: [number, ReactStateSetter<number>];
  nombreActividad: string;
  cantMonedas: number;
  completadas: ActividadesCompletadas;
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  rightDragAnswers: string[][][];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswer: number[][];
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  actividadLog: [IActividadLog, ReactStateSetter<IActividadLog>];
  tiempoInicio: [number, ReactStateSetter<number>];
  preguntasRespuestasQuiz: [string[][], string[][][]];
}

export interface IViroAppParams {
  pageNumber: number;
  models3d: IModels[][];
  models: number[][];
  actividad: string;
  positions: Vec3[][];
  imageTrackers: IImageTracker[][];
  modelMaterial: string[][];
  modelProps: IModelProps[][];
  modelChildrenProps: IModelChildrenProps[][][];
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
  useChildrenAlt: [boolean[][][], ReactStateSetter<boolean[][][]>];
  transforms: [ITransform[][], ReactStateSetter<ITransform[][]>];
  rotations: [number[][], ReactStateSetter<number[][]>];
  materialSelectorToggle: [number, ReactStateSetter<number>];
  armarDesarmarToggle: [number, ReactStateSetter<number>];
  temperaturaSelectorToggle: [number, ReactStateSetter<number>];
  updateMaterial: [boolean, ReactStateSetter<boolean>];
  setActiveModelIndex: ReactStateSetter<number>;
  setSelectedModelMaterials: ReactStateSetter<{
    materialOrder: string[];
    materialChoices: string[][];
  }>;
  markerTrackingState: [string[][], ReactStateSetter<string[][]>];
  activeTracker: [string[], ReactStateSetter<string[]>];
  activeTrackerIndex: [number[], ReactStateSetter<number[]>];
}

export interface IInventarioParams {
  pageNumber: number;
  models3d: IModels[][];
  models: [number[][], ReactStateSetter<number[][]>];
  positions: [Vec3[][], ReactStateSetter<Vec3[][]>];
  placedItems: [number[][], ReactStateSetter<number[][]>];
  nPlacedItems: [number[], ReactStateSetter<number[]>];
  hideInventory: boolean[];
  toggleDefaultValue: boolean[];
  toggleValues: number[][];

  modelProps: IModelProps[][];
  updateMaterial: [boolean, ReactStateSetter<boolean>];
  setSelectedModelMaterials: ReactStateSetter<{
    materialOrder: string[];
    materialChoices: string[][];
  }>;
  setMaterialSelectorToggle: ReactStateSetter<number>;
  setArmarDesarmarToggle: ReactStateSetter<number>;
  setTemperaturaSelectorToggle: ReactStateSetter<number>;
}

export interface IMaterialSelectorParams {
  pageNumber: number;
  materialSelectorToggle: [number, ReactStateSetter<number>];
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  activeModelIndex: number;
  models3d: IModels[][];
  selectedPageOrder: [number, ReactStateSetter<number>];
}
export interface IArmarDesarmarParams {
  pageNumber: number;
  armarDesarmarToggle: [number, ReactStateSetter<number>];
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  activeModelIndex: number;
  models3d: IModels[][];
  selectedPageOrder: [number, ReactStateSetter<number>];
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
  toggleValues: number[][];
  nPlacedItems: number[];
}

export interface ITemperaturaSelectorParams {
  pageNumber: number;
  temperaturaSelectorToggle: [number, ReactStateSetter<number>];
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  activeModelIndex: number;
  models3d: IModels[][];
  selectedPageOrder: [number, ReactStateSetter<number>];
  temperaturasList: string[][][];
  toggleValues: number[][];
  nPlacedItems: number[];
}

export interface IMarkerTrackerFeedbackParams {
  pageNumber: number;
  activeTrackerIndex: number[];
  markerTrackingState: string[][];
  activeTracker: string[];
  toggleDefaultValue: boolean[];
  toggleValues: number[][];
  trackerMessages: string[];
  trackerFeedbacks: string[];
}

export interface IStoryComponentParams {
  pageNumber: number;
  story: Actividad;
  toggleDefaultValue: boolean[];
  lotties: ILottie[][];
  toggleValues: number[][];
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  rightDragAnswers: string[][][];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];
  modelMaterial: string[][];
  joseItem: [string, ReactStateSetter<string>];
  joseMessage: [string, ReactStateSetter<string>];
}

export interface IToggleButtonParams {
  pageNumber: number;
  toggleDefaultValue: boolean[];
  models3d: IModels[][];
  models: number[][];
  hideInventory: boolean[];
  toggleButtons: IToggleButton[][];
  activeTracker: string[];
  imageTrackers: IImageTracker[][];
  toggleQuestions: [number[][], ReactStateSetter<number[][]>];
}

export interface IActNavigationParams {
  pageNumber: [number, ReactStateSetter<number>];
  actividadLog: [IActividadLog, ReactStateSetter<IActividadLog>];
  tiempoInicio: number;
  preguntasRespuestasQuiz: [string[][], string[][][]];
  actividades: Actividad;
  nombreActividad: string;
  cantMonedas: number;
  completadas: ActividadesCompletadas;
  storyLength: number;
  rightDragAnswers: string[][][];
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswer: number[][];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: number[][][];
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  models: [number[][], ReactStateSetter<number[][]>];
  placedItems: [number[][], ReactStateSetter<number[][]>];
  nPlacedItems: [number[], ReactStateSetter<number[]>];
  positions: [Vec3[][], ReactStateSetter<Vec3[][]>];
  jumpVisibility: boolean[];
  toggleValues: [number[][], ReactStateSetter<number[][]>];
  setUpdateMaterial: ReactStateSetter<boolean>;
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  setMaterialSelectorToggle: ReactStateSetter<number>;
  selectedPageOrder: [number, ReactStateSetter<number>];
}

export interface ILottieComponentParams {
  pageNumber: number;
  lotties: ILottie[][];
}
export interface IActividadesComponentParams {
  pageNumber: number;
  actividades: Actividad;
  viroAppParams: IViroAppParams;
  inventarioParams: IInventarioParams;
  materialSelectorParams: IMaterialSelectorParams;
  armarDesarmarParams: IArmarDesarmarParams;
  temperaturaSelectorParams: ITemperaturaSelectorParams;
  storyComponentParams: IStoryComponentParams;
  toggleButtonParams: IToggleButtonParams;
  actNavigationParams: IActNavigationParams;
  markerTrackerFeedbackParams: IMarkerTrackerFeedbackParams;
  lottiesComponentParams: ILottieComponentParams;
}

// export type Vec3 = [number, number, number];

// export interface IPosition {
//   start: number[];
//   end: number[];
// }

// export interface IImages {
//   name: string;
//   position: IPosition;
// }

// export interface IAlternativas {
//   rightAnswer: string[];
//   answers: [{text: string; position: IPosition}];
// }

// export interface IModels {
//   model: string;
//   type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
//   scale: Vec3;
//   rotation: Vec3;
// }

// export interface IAR {
//   state: string;
//   models: IModels[] | never[];
// }

// export interface IPagina {
//   background: string;
//   items?: IImages[] | never[];
//   bubbles?: IImages[] | never[];
//   textBoxes?: [{position: IPosition}] | never[];
//   texts?: [{text: string; position: IPosition}] | never[];
//   alternativas?: IAlternativas[] | never[];
//   AR?: IAR;
// }

// export type Story = IPagina[];

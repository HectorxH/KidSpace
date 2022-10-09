import {
  IModelProps,
  ITransform,
} from '../components/ARScenes/ARcomponents/utils';
import {
  Actividad,
  IActividadLog,
  IImageTracker,
  IModels,
  IToggleButton,
  Vec3,
} from './activity';
import {ReactStateSetter} from './others';

export interface IActividadesParams {
  actividades: Actividad;
  pageNumber: [number, ReactStateSetter<number>];
  nombreActividad: string;
  cantMonedas: number;
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
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
  transforms: [ITransform[][], ReactStateSetter<ITransform[][]>];
  rotations: [number[][], ReactStateSetter<number[][]>];
  materialSelectorToggle: [number, ReactStateSetter<number>];
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
  setMaterialSelectorToggle: ReactStateSetter<number>;
  hideInventory: boolean[];
  toggleDefaultValue: boolean[];
  toggleValues: number[][];
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

export interface IMarkerTrackerFeedbackParams {
  pageNumber: number;
  activeTrackerIndex: number[];
  markerTrackingState: string[][];
  activeTracker: string[];
  toggleDefaultValue: boolean[];
  toggleValues: number[][];
  trackerMessages: string[];
}

export interface IStoryComponentParams {
  pageNumber: number;
  story: Actividad;
  toggleDefaultValue: boolean[];
  toggleValues: number[][];
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];
  modelMaterial: string[][];
}

export interface IToggleButtonParams {
  pageNumber: number;
  toggleDefaultValue: boolean[];
  models3d: IModels[][];
  models: number[][];
  hideInventory: boolean[];
  toggleButtons: IToggleButton[][];
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
  storyLength: number;
  rightDragAnswers: string[][][];
  userInputAnswers: [number[][], ReactStateSetter<number[][]>];
  rightInputAnswer: number[][];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
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

export interface IActividadesComponentParams {
  pageNumber: number;
  actividades: Actividad;
  viroAppParams: IViroAppParams;
  inventarioParams: IInventarioParams;
  materialSelectorParams: IMaterialSelectorParams;
  storyComponentParams: IStoryComponentParams;
  toggleButtonParams: IToggleButtonParams;
  actNavigationParams: IActNavigationParams;
  markerTrackerFeedbackParams: IMarkerTrackerFeedbackParams;
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

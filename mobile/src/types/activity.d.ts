import {FlexAlignType} from 'react-native';
import {actividadNombre} from './navigation';

export interface IActividadLog {
  tipo: 'individual' | 'clase';
  actividad: string;
  unidad: string;
  steam: number[];
  estudiante: string;
  curso: string;
  quizFinal?: {pregunta: string; respuesta: string}[];
  duracion: string;
  fecha: Date | string;
}

export interface IActividadLogBueno {
  tipo: 'individual' | 'clase';
  actividad: string;
  unidad: string;
  steam: number[];
  estudiante: string;
  curso: string;
  quizFinal?: {pregunta: string; respuesta: string}[];
  duracion: string;
  fecha: Date;
}

export interface IActivity {
  nunidad: string;
  nactividad: string;
  titulo: string;
  descripcion: string;
  portada: string;
  cuento1: string;
  cuento2: string;
  desafio1: string;
  desafio2: string;
  quiz: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
  path: string;
  pathAsignar: string;
  nombreActividad: actividadNombre;
  // nombreActividad: 'diagramas' | 'diseños' | 'materiales';
}

export type ButtonSetting = {
  buttonIcon: string;
  buttonColor: string;
  buttonText: string;
};

export type IToggleButtonSetting = {
  buttonColorNormal: string;
  buttonColorAlt: string;
  buttonIconNormal: string;
  buttonIconAlt: string;
  buttonTextNormal: string;
  buttonTextAlt: string;
};

export type IToggleButtonStyle = {
  buttonTextAlt?: string;
};

export type Vec3 = [number, number, number];

export interface IPosition {
  start: number[];
  end: number[];
}

export interface ITextBoxes {
  position: IPosition;
  settings?: ITextBoxSettings;
}

export interface ITextBoxSettings {
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  elevation?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
}

export interface IImages {
  name: string;
  position: IPosition;
  settings?: IImagesSettings;
}

export interface IImagesSettings {
  opacity?: number;
  height?: string;
  width?: string;
  alignSelf?: FlexAlignType | 'auto' | undefined;
  transform?: IImagesTransforms[];
}

export interface IImagesTransforms {
  scaleX: number;
  scaleY: number;
  rotateX: string;
  rotateY: string;
  rotateZ: string;
}

export interface IAlternativas {
  rightAnswer: string[];
  answers: IAnswers[];
}

export interface IAnswers {
  text: string;
  position: IPosition;
  settings?: IAlternativasSettings;
}

export interface IAlternativasSettings {
  elevation?: number;
}

export interface IAlternativasDropdown {
  rightAnswer: string[];
  answers: string[];
  position: IPosition;
}

export interface IQuiz {
  answers: IAnswers[];
  pregunta: string;
}

export interface IModels {
  model: string;
  scale: Vec3;
  rotation: Vec3;
  type?: string;
  image360?: string;
  interactable?: string[];
  ARMaterials?: {
    materialOrder: string[];
    materialChoices: string[][];
  };
}

export interface IAR {
  start: boolean;
  imageTrackers?: IImageTracker[];
  hideInventory?: boolean;
  models?: IModels[];
}

export interface IImageTracker {
  target: string;
  display: string;
  displayType: 'image' | 'video' | '3dobject';
}

export interface ITexts {
  text: string;
  position: IPosition;
  leftIcon?: ITextIcons;
  rightIcon?: ITextIcons;
  settings?: ITextSettings;
}

export interface ITextSettings {
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify';
  elevation?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}

export interface ITextIcons {
  name: string;
  size: number;
  color: string;
}

export interface IToggleButton {
  value: boolean;
  position: IPosition;
  settings: IToggleButtonSetting;
}

export interface IJumpButton {
  target: number;
  require: number[];
  position: IPosition;
  settings: IToggleButtonSetting;
  style: IToggleButtonStyle;
  visible: boolean;
}

export interface IJumpCard {
  items: IImages[];
  texts: ITexts[];
  position: IPosition;
  target: number;
  require: number[];
  disableWhen: number[];
  // settings: IToggleButtonSetting;
  visible: boolean;
}

export interface ITextFieldQuestion {
  position: IPosition;
  rightAnswer: number;
}

export interface IDraggable {
  type: string;
  answer: string[];
  draggableItems: IDraggableItems[];
  receivingItems: IReceivingItems[];
}

export interface IDraggableItems {
  type: string;
  name: string;
  value: string;
  position: IPosition;
  top?: boolean;
  bottom?: boolean;
}

export interface IReceivingItems {
  type: string;
  name: string;
  value: string;
  position: IPosition;
  top?: boolean;
  bottom?: boolean;
}

export interface IActivityPage {
  background: string;
  items?: IImages[] | never[];
  bubbles?: IImages[] | never[];
  textBoxes?: ITextBoxes[] | never[];
  texts?: ITexts[] | never[];
  textFieldQuestion?: ITextFieldQuestion[];
  alternativas?: IAlternativas[] | never[];
  alternativasDropdown?: IAlternativasDropdown[] | never[];
  AR?: IAR;
  toggleButton?: IToggleButton[] | never[];
  jumpButton?: IJumpButton[] | never[];
  jumpCard?: IJumpCard[] | never[];
  quiz?: IQuiz[] | never[];
  draggable?: IDraggable[] | never[];
}

export type Actividad = IActivityPage[];

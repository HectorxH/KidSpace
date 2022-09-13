import {FlexAlignType} from 'react-native';

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
}

export interface IModels {
  model: string;
  // type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  scale: Vec3;
  rotation: Vec3;
  interactable?: string[];
  ARMaterials?: {
    materialOrder: string[];
    materialChoices: string[][];
  };
}

export interface IAR {
  start: boolean;
  models: IModels[];
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
  backgroundColor?: string;
}

export interface IDraggable {
  draggable: boolean;
  answer: string;
}

export interface IActivityPage {
  background: string;
  items?: IImages[] | never[];
  bubbles?: IImages[] | never[];
  textBoxes?: ITextBoxes[] | never[];
  texts?: ITexts[] | never[];
  alternativas?: IAlternativas[] | never[];
  alternativasDropdown?: IAlternativasDropdown[] | never[];
  AR?: IAR;
  toggleButton?: IToggleButton[] | never[];
  jumpButton?: IJumpButton[] | never[];
  jumpCard?: IJumpCard[] | never[];
  quiz?: IQuiz[] | never[];
  draggable?: IDraggable;
  textFieldQuestion?: ITextFieldQuestion[];
}

export type Actividad = IActivityPage[];

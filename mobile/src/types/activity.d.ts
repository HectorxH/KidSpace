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

export type Vec3 = [number, number, number];

export interface IPosition {
  start: number[];
  end: number[];
}

export interface ITextBoxes {
  position: IPosition;
}

export interface IImages {
  name: string;
  position: IPosition;
}

export interface IAlternativas {
  rightAnswer: string[];
  answers: IAnswers[];
}

export interface IAnswers {
  text: string;
  position: IPosition;
}

export interface IAlternativasDropdown {
  rightAnswer: string[];
  answers: string[];
  position: IPosition;
}

export interface IModels {
  model: string;
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  scale: Vec3;
  rotation: Vec3;
}

export interface IAR {
  start: boolean;
  models: IModels[];
}

export interface ITexts {
  text: string;
  position: IPosition;
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
  visible: boolean;
}

export interface IJumpCard {
  items: IImages[];
  texts: ITexts[];
  position: IPosition;
  target: number;
  require: number[];
  // settings: IToggleButtonSetting;
  visible: boolean;
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
}

export type Actividad = IActivityPage[];

// {
//   "background": "flowershop",
//   "items": [
//     {
//       "name": "cry",
//       "position": {
//         "start": [13, 2],
//         "end": [20, 20]
//       }
//     }
//   ],
//   "alternativasDropdown": [
//     {
//       "rightAnswer": ["9"],
//       "answers": ["9", "4", "7"],
//       "position": {
//         "start": [9, 10],
//         "end": [12, 12]
//       }
//     },
//     {
//       "rightAnswer": ["7"],
//       "answers": ["9", "4", "7"],
//       "position": {
//         "start": [9, 13],
//         "end": [12, 15]
//       }
//     },
//     {
//       "rightAnswer": ["4"],
//       "answers": ["9", "4", "7"],
//       "position": {
//         "start": [9, 16],
//         "end": [12, 18]
//       }
//     }
//   ]
// },

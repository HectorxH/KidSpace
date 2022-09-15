export type Vec3 = [number, number, number];

export interface IPosition {
  start: number[];
  end: number[];
}

export interface IImages {
  name: string;
  position: IPosition;
}

export interface IAlternativas {
  rightAnswer: string[];
  answers: [{text: string; position: IPosition}];
}

export interface IModels {
  model: string;
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  scale: Vec3;
  rotation: Vec3;
}

export interface IAR {
  state: string;
  models: IModels[] | never[];
}

export interface IPagina {
  background: string;
  items?: IImages[] | never[];
  bubbles?: IImages[] | never[];
  textBoxes?: [{position: IPosition}] | never[];
  texts?: [{text: string; position: IPosition}] | never[];
  alternativas?: IAlternativas[] | never[];
  AR?: IAR;
}

export type Story = IPagina[];

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

export type Vec3 = [number, number, number];

export interface IItem {
  model: string;
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  scale: Vec3;
  rotation: Vec3;
}

export interface IDialogo {
  message: string;
  messagePosition: string;
  spotlight: string;
}

export interface IPregunta {
  question: string;
  answers: [string, string, string];
  rightAnswer: string;
}

export type ButtonSetting = {
  [key: string]: string;
  buttonIconPosNormal: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

export interface ActividadDetail {
  items: IItem[];
  story: IDialogo[];
  quiz: IPregunta[];
  settings: ButtonSetting[];
}
export type DesafioEstado = 'story' | 'items' | 'quiz' | 'desafio';

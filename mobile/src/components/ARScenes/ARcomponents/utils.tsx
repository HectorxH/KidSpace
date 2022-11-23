import {ViroMaterialDict} from '@viro-community/react-viro/dist/components/Material/ViroMaterials';
import {ImageSourcePropType} from 'react-native';
import {IModels, Vec3} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';

export type TSelectedMaterial = {
  materialOrder: string[];
  materialChoices: string[][];
};

export interface ITransform {
  scale: Vec3;
  rotation: Vec3;
  position?: Vec3;
}

export interface IModelProps {
  model: ImageSourcePropType;
  altModel: ImageSourcePropType;
  alt: string;
  modelType: string;
  modelImage360: string;
  modelVideo360: string;
  resources: ImageSourcePropType[];
  materials: ViroMaterialDict | undefined;
  defaultTexture: string | undefined;
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  interactable: string[];
  ARMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
}

export interface IModelChildrenProps {
  model: ImageSourcePropType;
  altModel: ImageSourcePropType;
  alt: string;
  modelType: string;
  modelImage360: string;
  resources: ImageSourcePropType[];
  materials: ViroMaterialDict | undefined;
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  interactable: string[];
  ARMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  rotation: Vec3;
  scale: Vec3;
}

export function updateRotation2(
  pageNumber: number,
  index: number,
  rotateState: number,
  rotation: number,
  rotations: number[][],
  transforms: ITransform[][],
  setRotations: ReactStateSetter<number[][]>,
  setTransforms: ReactStateSetter<ITransform[][]>,
) {
  let transform = [...transforms];
  // Giro en todos los ejes
  //const temp = transform[index].rotation.map(x => x - rotation / 50);
  // let temp2: Vec3 = [temp[0], temp[1], temp[2]];

  //Giro en eje y
  transform[pageNumber][index].rotation = [
    transform[pageNumber][index].rotation[0],
    transform[pageNumber][index].rotation[1] - rotation / 5,
    transform[pageNumber][index].rotation[2],
  ];
  let rots = [...rotations];
  rots[pageNumber][index] = rotation;

  if (rotateState === 2) {
    setTransforms(transform);
  }
  if (rotateState !== 2) {
    setRotations(rots);
  }
}

export function updateScale(
  pageNumber: number,
  index: number,
  pinchState: number,
  scaleFactor: number,
  transforms: ITransform[][],
  setTransforms: ReactStateSetter<ITransform[][]>,
  models3d: IModels[],
) {
  console.log('pinch state', pinchState);

  let transform = [...transforms];
  const MIN_SCALE = 0.8;
  const MAX_SCALE = 1.3;
  const temp = transform[pageNumber][index].scale.map(x => x * scaleFactor);
  let temp2: Vec3 = [temp[0], temp[1], temp[2]];
  if (temp2[0] < models3d[index].scale[0] * MIN_SCALE) {
    temp2 = [
      models3d[index].scale[0] * MIN_SCALE,
      models3d[index].scale[1] * MIN_SCALE,
      models3d[index].scale[2] * MIN_SCALE,
    ];
    transform[pageNumber][index].scale = temp2;
  } else if (temp2[0] > models3d[index].scale[0] * MAX_SCALE) {
    temp2 = [
      models3d[index].scale[0] * MAX_SCALE,
      models3d[index].scale[1] * MAX_SCALE,
      models3d[index].scale[2] * MAX_SCALE,
    ];
    transform[pageNumber][index].scale = temp2;
  } else {
    transform[pageNumber][index].scale = temp2;
  }

  setTransforms(transform);
}

export function calculateDistance(p1: Vec3, p2: Vec3) {
  var a = p2[0] - p1[0];
  var b = p2[1] - p1[1];
  var c = p2[2] - p1[2];

  return Math.sqrt(a * a + b * b + c * c);
}

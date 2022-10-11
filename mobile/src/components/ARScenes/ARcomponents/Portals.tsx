import React from 'react';
import {
  ViroPortalScene,
  ViroPortal,
  Viro360Image,
  Viro3DObject,
} from '@viro-community/react-viro';
import Images from '../../../assets/images/images';
import {IModels, Vec3} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {IModelProps, TSelectedMaterial} from './utils';
import {ImageSourcePropType} from 'react-native';

interface PortalsProps {
  models3d: IModels[];
  modelProps: IModelProps[][];
  modelChildrenProps: IModelProps[][][];
  pageNumber: number;
  itemNumber: number;
  modelIndex: number;
  modelMaterial: string[];
  positions: Vec3[];
  setSelectedModelMaterials: ReactStateSetter<TSelectedMaterial>;
  transforms: [ITransform[][], ReactStateSetter<ITransform[][]>];
  rotations: [number[][], ReactStateSetter<number[][]>];
  materialSelectorToggle: [number, ReactStateSetter<number>];
  updateMaterial: [boolean, ReactStateSetter<boolean>];
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
  useChildrenAlt: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

interface ITransform {
  scale: Vec3;
  rotation: Vec3;
  position?: Vec3;
}

const Portals = (props: PortalsProps) => {
  const positions = props.positions;
  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    let transform = [...props.transforms[0]];

    //Giro en eje y
    transform[props.pageNumber][index].rotation = [
      transform[props.pageNumber][index].rotation[0],
      (transform[props.pageNumber][index].rotation[1] - rotation / 10) % 360,
      transform[props.pageNumber][index].rotation[2],
    ];

    props.transforms[1](transform);
  }

  return (
    <ViroPortalScene
      passable={true}
      onDrag={() => {}}
      dragType="FixedDistance"
      onRotate={(rotateState, rotation) =>
        updateRotation(props.itemNumber, rotateState, rotation)
      }>
      <ViroPortal
        position={
          typeof positions[props.modelIndex] === 'undefined'
            ? positions[props.modelIndex]
            : [
                positions[props.modelIndex][0],
                positions[props.modelIndex][1],
                -1,
              ]
        }
        rotation={
          props.transforms[0][props.pageNumber][props.itemNumber].rotation
        }
        //onDrag={() => {}}
        //dragType={'FixedDistance'}
        scale={[0.1, 0.1, 0.1]}>
        <Viro3DObject
          source={
            props.modelProps[props.pageNumber][props.itemNumber]
              .model as ImageSourcePropType
          }
          type={props.modelProps[props.pageNumber][props.itemNumber].type}
        />
      </ViroPortal>
      <Viro360Image
        source={
          Images.images360[
            props.modelProps[props.pageNumber][props.itemNumber].modelImage360
          ]
        }
      />
    </ViroPortalScene>
  );
};

export default Portals;

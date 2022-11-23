import React from 'react';
import {
  ViroPortalScene,
  ViroPortal,
  Viro360Image,
  Viro3DObject,
  Viro360Video,
} from '@viro-community/react-viro';
import Images from '../../../assets/images/images';
import Videos from '../../../assets/videos/videos';
import {IModels, Vec3} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {IModelProps, TSelectedMaterial} from './utils';
import {ImageSourcePropType} from 'react-native';

interface PortalsProps {
  models3d: IModels[];
  modelProps: IModelProps[][];
  // modelChildrenProps: IModelProps[][][];
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
  displayPortalItem: boolean;
}

interface ITransform {
  scale: Vec3;
  rotation: Vec3;
  position?: Vec3;
}

const Portals = (props: PortalsProps) => {
  const positions = props.positions;
  console.log(props.displayPortalItem);
  const displayPortalItem = props.displayPortalItem;

  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    // console.log(index, rotateState, rotation);
    let transform = [...props.transforms[0]];
    // let rots = [...rotations];
    // rots[pageNumber][index] = (rots[pageNumber][index] - rotation) % 360;
    // Giro en todos los ejes
    //const temp = transform[index].rotation.map(x => x - rotation / 50);
    // let temp2: Vec3 = [temp[0], temp[1], temp[2]];
    // console.log(tempRot);
    if (rotateState !== 2) {
      // setTempRot(transform[pageNumber][index].rotation[1]);
    }
    if (rotateState === 2) {
      //Giro en eje y
      transform[props.pageNumber][index].rotation = [
        transform[props.pageNumber][index].rotation[0],
        // (tempRot - rotation) % 360,
        (transform[props.pageNumber][index].rotation[1] - rotation / 10) % 360,
        transform[props.pageNumber][index].rotation[2],
      ];
    }

    props.transforms[1](transform);
  }
  return (
    <ViroPortalScene
      passable={true}
      onDrag={() => {}}
      dragType="FixedDistance"
      onRotate={(rotateState, rotation) =>
        updateRotation(props.itemNumber, rotateState, rotation)
      }
      position={positions[props.modelIndex]}>
      <ViroPortal
        rotation={
          props.transforms[0][props.pageNumber][props.itemNumber].rotation
        }
        //onDrag={() => {}}
        //dragType={'FixedDistance'}
        position={[0, 0, 0]}
        scale={[0.3, 0.3, 0.3]}>
        <Viro3DObject
          position={[0, 0, 0]}
          source={
            props.modelProps[props.pageNumber][props.itemNumber]
              .model as ImageSourcePropType
          }
          type={props.modelProps[props.pageNumber][props.itemNumber].type}
          resources={
            props.modelProps[props.pageNumber][props.itemNumber].resources
          }
        />
      </ViroPortal>

      {props.modelProps[props.pageNumber][props.itemNumber].modelImage360 !==
        '' &&
        displayPortalItem === true && (
          <Viro360Image
            source={
              Images.images360[
                props.modelProps[props.pageNumber][props.itemNumber]
                  .modelImage360
              ]
            }
          />
        )}

      {props.modelProps[props.pageNumber][props.itemNumber].modelVideo360 !==
        '' &&
        displayPortalItem === true && (
          <Viro360Video
            source={
              Videos.videos360[
                props.modelProps[props.pageNumber][props.itemNumber]
                  .modelVideo360
              ]
            }
          />
        )}
    </ViroPortalScene>
  );
};

export default Portals;

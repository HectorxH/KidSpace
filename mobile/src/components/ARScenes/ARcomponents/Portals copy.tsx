import React from 'react';
import {
  ViroPortalScene,
  ViroPortal,
  Viro360Image,
} from '@viro-community/react-viro';
import Images from '../../../assets/images/images';
import {IModels, Vec3} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {IModelProps, TSelectedMaterial} from './utils';
import PortalObjects3d from './PortalObject3d';

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
  const [transforms, setTransforms] = props.transforms;

  return (
    <ViroPortalScene passable={true}>
      <ViroPortal
        position={positions[props.modelIndex]}
        scale={[3, 3, 3]}
        rotation={[0, 0, 0]}>
        <PortalObjects3d
          pageNumber={props.pageNumber}
          models3d={props.models3d}
          modelProps={props.modelProps}
          itemNumber={props.itemNumber}
          modelIndex={props.modelIndex}
          positions={props.positions}
          rotations={props.rotations}
          useAlt={props.useAlt}
          transforms={[transforms, setTransforms]}
          materialSelectorToggle={props.materialSelectorToggle}
          setSelectedModelMaterials={props.setSelectedModelMaterials}
          modelMaterial={props.modelMaterial}
          updateMaterial={props.updateMaterial}
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

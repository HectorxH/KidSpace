import React from 'react';
import {Viro3DObject, ViroMaterials} from '@viro-community/react-viro';
import {IModels, Vec3} from '../../../types/activity';
import {ImageSourcePropType} from 'react-native';
import {ReactStateSetter} from '../../../types/others';
import {
  IModelProps,
  ITransform,
  TSelectedMaterial,
  updateRotation,
  updateScale,
} from './utils';

interface Objects3dProps {
  models3d: IModels[];
  modelProps: IModelProps[];
  itemNumber: number;
  modelIndex: number;
  transforms: [ITransform[], ReactStateSetter<ITransform[]>];
  positions: Vec3[];
  rotations: [number[], ReactStateSetter<number[]>];
  materialSelectorToggle: [number, ReactStateSetter<number>];
  setSelectedModelMaterials: ReactStateSetter<TSelectedMaterial>;
  modelMaterial: string[];
  updateMaterial: [boolean, ReactStateSetter<boolean>];
}

const Objects3d = (props: Objects3dProps) => {
  const [transforms, setTransforms] = props.transforms;
  const [rotations, setRotations] = props.rotations;

  const [updateMaterial, setUpdateMaterial] = props.updateMaterial;
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    props.materialSelectorToggle;

  function makeMaterials() {
    if (updateMaterial === true) {
      setUpdateMaterial(false);
      let materials = props.modelProps.map(model =>
        typeof model.materials !== 'undefined' ? model.materials : {},
      );
      for (let i = 0; i < materials.length; i++) {
        ViroMaterials.createMaterials(materials[i]);
      }
    }
  }

  function onModelClick(itemIndex: number) {
    if (
      props.modelProps[itemIndex].interactable.length === 0 ||
      materialSelectorToggle === 1
    ) {
      setMaterialSelectorToggle(0);
      return;
    }
    for (let i = 0; i < props.modelProps[itemIndex].interactable.length; i++) {
      if (props.modelProps[itemIndex].interactable[i] === 'materials') {
        makeMaterials();
        props.setSelectedModelMaterials(
          props.modelProps[itemIndex].ARMaterials,
        );
        setMaterialSelectorToggle(1);
      }
    }
  }

  return (
    <Viro3DObject
      source={props.modelProps[props.itemNumber].model as ImageSourcePropType}
      resources={props.modelProps[props.itemNumber].resources}
      materials={props.modelMaterial[props.modelIndex]}
      position={props.positions[props.modelIndex]}
      scale={transforms[props.itemNumber].scale}
      rotation={transforms[props.itemNumber].rotation}
      type={props.modelProps[props.itemNumber].type}
      onDrag={() => {}}
      dragType={'FixedToWorld'}
      onPinch={(pinchState, scaleFactor) =>
        updateScale(
          props.modelIndex,
          pinchState,
          scaleFactor,
          transforms,
          setTransforms,
          props.models3d,
        )
      }
      onRotate={(rotateState, rotation) =>
        updateRotation(
          props.modelIndex,
          rotateState,
          rotation + rotations[props.modelIndex],
          rotations,
          transforms,
          setRotations,
          setTransforms,
        )
      }
      onClick={() => onModelClick(props.itemNumber)}
    />
  );
};

export default Objects3d;

import React from 'react';
import {Viro3DObject, ViroMaterials} from '@viro-community/react-viro';
import {IModels, Vec3} from '../../../types/activity';
import {ImageSourcePropType} from 'react-native';
import {ReactStateSetter} from '../../../types/others';
import {
  IModelProps,
  ITransform,
  TSelectedMaterial,
  // updateRotation,
  updateScale,
} from './utils';

interface Objects3dProps {
  models3d: IModels[];
  modelProps: IModelProps[][];
  pageNumber: number;
  itemNumber: number;
  modelIndex: number;
  positions: Vec3[];
  modelMaterial: string[];
  setSelectedModelMaterials: ReactStateSetter<TSelectedMaterial>;
  transforms: [ITransform[][], ReactStateSetter<ITransform[][]>];
  rotations: [number[][], ReactStateSetter<number[][]>];
  materialSelectorToggle: [number, ReactStateSetter<number>];
  updateMaterial: [boolean, ReactStateSetter<boolean>];
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
}

const Objects3d = (props: Objects3dProps) => {
  const {
    models3d,
    modelProps,
    pageNumber,
    itemNumber,
    modelIndex,
    positions,
    modelMaterial,
    setSelectedModelMaterials,
  } = props;

  const [transforms, setTransforms] = props.transforms;
  const [rotations, setRotations] = props.rotations;
  const [useAlt, setUseAlt] = props.useAlt;

  const [updateMaterial, setUpdateMaterial] = props.updateMaterial;
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    props.materialSelectorToggle;

  function makeMaterials() {
    if (updateMaterial === true) {
      let materials = modelProps[pageNumber].map(model =>
        typeof model.materials !== 'undefined' ? model.materials : {},
      );

      if (materials.length > 0) {
        setUpdateMaterial(false);
      }
      for (let i = 0; i < materials.length; i++) {
        ViroMaterials.createMaterials(materials[i]);
      }
    }
  }
  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    // console.log(index, rotateState, rotation);
    let transform = [...transforms];
    // Giro en todos los ejes
    //const temp = transform[index].rotation.map(x => x - rotation / 50);
    // let temp2: Vec3 = [temp[0], temp[1], temp[2]];

    //Giro en eje y
    transform[pageNumber][index].rotation = [
      transform[pageNumber][index].rotation[0],
      transform[pageNumber][index].rotation[2] - rotation,
      transform[pageNumber][index].rotation[2],
    ];
    let rots = [...rotations];
    rots[pageNumber][index] = rotation;

    if (rotateState === 1) {
      setTransforms(transform);
    }
    if (rotateState !== 2) {
      setRotations(rots);
    }
  }
  function onModelClick(itemIndex: number) {
    console.log('click');
    if (
      modelProps[pageNumber][itemIndex].interactable.length === 0 ||
      materialSelectorToggle === 1
    ) {
      setMaterialSelectorToggle(0);
      return;
    }
    for (
      let i = 0;
      i < modelProps[pageNumber][itemIndex].interactable.length;
      i++
    ) {
      if (modelProps[pageNumber][itemIndex].interactable[i] === 'materials') {
        makeMaterials();
        setSelectedModelMaterials(
          modelProps[pageNumber][itemIndex].ARMaterials,
        );
        setMaterialSelectorToggle(1);
      }
      if (
        modelProps[pageNumber][itemIndex].interactable[i] === 'auxiliar' &&
        modelProps[pageNumber][itemIndex].alt !== ''
      ) {
        let newUseAlt = [...useAlt];
        if (newUseAlt[pageNumber][itemIndex] === true) {
          newUseAlt[pageNumber][itemIndex] = false;
        } else {
          newUseAlt[pageNumber][itemIndex] = true;
        }
        setUseAlt(newUseAlt);
      }
    }
  }

  return (
    <Viro3DObject
      source={
        useAlt[pageNumber][itemNumber] === false
          ? (modelProps[pageNumber][itemNumber].model as ImageSourcePropType)
          : (modelProps[pageNumber][itemNumber].altModel as ImageSourcePropType)
      }
      resources={modelProps[pageNumber][itemNumber].resources}
      materials={modelMaterial[modelIndex]}
      position={positions[modelIndex]}
      scale={transforms[pageNumber][itemNumber].scale}
      rotation={transforms[pageNumber][itemNumber].rotation}
      type={modelProps[pageNumber][itemNumber].type}
      onDrag={() => {}}
      dragType={'FixedToWorld'}
      onPinch={(pinchState, scaleFactor) =>
        updateScale(
          pageNumber,
          modelIndex,
          pinchState,
          scaleFactor,
          transforms,
          setTransforms,
          models3d,
        )
      }
      onRotate={(rotateState, rotation) =>
        updateRotation(
          // pageNumber,
          modelIndex,
          rotateState,
          (rotation / 5 + rotations[pageNumber][modelIndex]) % 360,
          // rotations,
          // transforms,
          // setRotations,
          // setTransforms,
        )
      }
      onClick={() => onModelClick(itemNumber)}
    />
  );
};

export default Objects3d;

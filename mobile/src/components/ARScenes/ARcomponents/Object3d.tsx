import React, {useState} from 'react';
import {
  Viro3DObject,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';
import {IModels, Vec3} from '../../../types/activity';
import {ImageSourcePropType} from 'react-native';
import {ReactStateSetter} from '../../../types/others';
import {
  IModelChildrenProps,
  IModelProps,
  ITransform,
  TSelectedMaterial,
  // updateRotation,
  updateScale,
} from './utils';

interface Objects3dProps {
  models3d: IModels[];
  modelProps: IModelProps[][];
  modelChildrenProps: IModelChildrenProps[][][];
  pageNumber: number;
  itemNumber: number;
  modelIndex: number;
  positions: Vec3[];
  modelMaterial: string[];
  setSelectedModelMaterials: ReactStateSetter<TSelectedMaterial>;
  transforms: [ITransform[][], ReactStateSetter<ITransform[][]>];
  rotations: [number[][], ReactStateSetter<number[][]>];
  materialSelectorToggle: [number, ReactStateSetter<number>];
  armarDesarmarToggle: [number, ReactStateSetter<number>];
  temperaturaSelectorToggle: [number, ReactStateSetter<number>];
  updateMaterial: [boolean, ReactStateSetter<boolean>];
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
  useChildrenAlt: [boolean[][][], ReactStateSetter<boolean[][][]>];
}

const Objects3d = (props: Objects3dProps) => {
  const {
    models3d,
    modelProps,
    modelChildrenProps,
    pageNumber,
    itemNumber,
    modelIndex,
    positions,
    modelMaterial,
    // setSelectedModelMaterials,
  } = props;

  const [transforms, setTransforms] = props.transforms;
  const [useAlt, setUseAlt] = props.useAlt;
  const [useChildrenAlt, setUseChildrenAlt] = props.useChildrenAlt;

  // const [updateMaterial, setUpdateMaterial] = props.updateMaterial;
  // const [materialSelectorToggle, setMaterialSelectorToggle] =
  //   props.materialSelectorToggle;

  const [tempRot, setTempRot] = useState(0);
  // const setArmarDesarmarToggle = props.armarDesarmarToggle[1];
  // const setTemperaturaSelectorToggle = props.temperaturaSelectorToggle[1];

  // function makeMaterials() {
  //   if (updateMaterial === true) {
  //     let materials = modelProps[pageNumber].map(model =>
  //       typeof model.materials !== 'undefined' ? model.materials : {},
  //     );
  //     if (materials.length > 0) {
  //       setUpdateMaterial(false);
  //     }
  //     for (let i = 0; i < materials.length; i++) {
  //       console.log(materials[i]);
  //       ViroMaterials.createMaterials(materials[i]);
  //     }
  //   }
  // }

  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    // console.log(index, rotateState, rotation);
    let transform = [...transforms];
    // let rots = [...rotations];
    // rots[pageNumber][index] = (rots[pageNumber][index] - rotation) % 360;
    // Giro en todos los ejes
    //const temp = transform[index].rotation.map(x => x - rotation / 50);
    // let temp2: Vec3 = [temp[0], temp[1], temp[2]];

    if (rotateState !== 2) {
      setTempRot(transform[pageNumber][index].rotation[1]);
    }
    if (rotateState === 2) {
      //Giro en eje y
      transform[pageNumber][index].rotation = [
        transform[pageNumber][index].rotation[0],
        // (tempRot - rotation) % 360,
        (transform[pageNumber][index].rotation[1] - rotation / 10) % 360,
        transform[pageNumber][index].rotation[2],
      ];
    }

    setTransforms(transform);
  }
  function onModelClick(itemIndex: number, type: string) {
    console.log('click');
    if (type === 'main') {
      // if (
      //   modelProps[pageNumber][itemIndex].interactable.length === 0 ||
      //   materialSelectorToggle === 1
      // ) {
      //   setMaterialSelectorToggle(0);
      //   return;
      // }
      for (
        let i = 0;
        i < modelProps[pageNumber][itemIndex].interactable.length;
        i++
      ) {
        // if (modelProps[pageNumber][itemIndex].interactable[i] === 'materials') {
        //   makeMaterials();
        //   setSelectedModelMaterials(
        //     modelProps[pageNumber][itemIndex].ARMaterials,
        //   );
        //   setMaterialSelectorToggle(1);
        // }
        // if (
        //   modelProps[pageNumber][itemIndex].interactable[i] === 'armarDesarmar'
        // ) {
        //   // setSelectedModelMaterials(
        //   //   modelProps[pageNumber][itemIndex].ARMaterials,
        //   // );
        //   setArmarDesarmarToggle(1);
        // }
        // if (
        //   modelProps[pageNumber][itemIndex].interactable[i] === 'temperatura'
        // ) {
        //   console.log('temperatura');
        //   makeMaterials();
        //   setSelectedModelMaterials(
        //     modelProps[pageNumber][itemIndex].ARMaterials,
        //   );
        //   setTemperaturaSelectorToggle(1);
        // }
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
    if (type === 'aux') {
      if (
        modelChildrenProps[pageNumber][itemIndex][0].interactable[0] ===
          'auxiliar' &&
        modelChildrenProps[pageNumber][itemIndex][0].alt !== ''
      ) {
        let newUseChildrenAlt = [...useChildrenAlt];
        if (newUseChildrenAlt[pageNumber][itemIndex][0] === true) {
          newUseChildrenAlt[pageNumber][itemIndex][0] = false;
        } else {
          newUseChildrenAlt[pageNumber][itemIndex][0] = true;
        }
        setUseChildrenAlt(newUseChildrenAlt);
      }
    }
  }
  return (
    <ViroNode
      position={positions[modelIndex]}
      onDrag={() => {}}
      dragType={'FixedToWorld'}
      rotation={transforms[pageNumber][itemNumber].rotation}
      onRotate={(rotateState, rotation) =>
        updateRotation(itemNumber, rotateState, rotation)
      }>
      <Viro3DObject
        source={
          useAlt[pageNumber][itemNumber] === false
            ? (modelProps[pageNumber][itemNumber].model as ImageSourcePropType)
            : (modelProps[pageNumber][itemNumber]
                .altModel as ImageSourcePropType)
        }
        resources={modelProps[pageNumber][itemNumber].resources}
        type={modelProps[pageNumber][itemNumber].type}
        materials={
          modelMaterial[modelIndex] === 'default' &&
          typeof modelProps[pageNumber][itemNumber].defaultTexture !==
            'undefined'
            ? modelProps[pageNumber][itemNumber].defaultTexture
            : modelMaterial[modelIndex]
        }
        // position={positions[modelIndex]}
        position={[0, 0, 0]}
        scale={transforms[pageNumber][itemNumber].scale}
        // rotation={transforms[pageNumber][itemNumber].rotation}
        onPinch={(pinchState, scaleFactor) =>
          updateScale(
            pageNumber,
            itemNumber,
            pinchState,
            scaleFactor,
            transforms,
            setTransforms,
            models3d,
          )
        }
        // onRotate={(rotateState, rotation) =>
        //   updateRotation(itemNumber, rotateState, rotation)
        // }
        onClick={() => onModelClick(itemNumber, 'main')}
      />
      {modelChildrenProps[pageNumber][itemNumber].length > 0 && (
        <Viro3DObject
          source={
            useChildrenAlt[pageNumber][itemNumber][0] === false
              ? (modelChildrenProps[pageNumber][itemNumber][0]
                  .model as ImageSourcePropType)
              : (modelChildrenProps[pageNumber][itemNumber][0]
                  .altModel as ImageSourcePropType)
          }
          resources={modelChildrenProps[pageNumber][itemNumber][0].resources}
          position={[0, 0.8, 0]}
          scale={modelChildrenProps[pageNumber][itemNumber][0].scale}
          rotation={modelChildrenProps[pageNumber][itemNumber][0].rotation}
          type={modelChildrenProps[pageNumber][itemNumber][0].type}
          onClick={() => onModelClick(itemNumber, 'aux')}
        />
      )}
    </ViroNode>
  );
};

export default Objects3d;

ViroMaterials.createMaterials({
  white_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
  default: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
  blue_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(19,42,143)',
  },
  grey_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(75,76,79)',
  },
  red_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(168,0,0)',
  },
  yellow_sphere: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(200,142,31)',
  },
});

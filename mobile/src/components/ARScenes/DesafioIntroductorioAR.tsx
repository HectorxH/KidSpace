import React, {useState} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroDirectionalLight,
  ViroAmbientLight,
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  // @ts-ignore
} from '@viro-community/react-viro';
import Models from '../../assets/3d/models';
import {IModels, Vec3} from '../../types/activity';
import {ImageSourcePropType} from 'react-native';
import {ReactStateSetter} from '../../types/others';
// import {ViroMaterialDict} from '@viro-community/react-viro/dist/components/Material/ViroMaterials';

type TSelectedMaterial = {
  materialOrder: string[];
  materialChoices: string[][];
};

interface DesafioIntroductorioSceneARProps {
  sceneNavigator: {
    viroAppProps: {
      models: number[];
      actividad: string;
      items: IModels[];
      positions: [Vec3[], ReactStateSetter<Vec3[]>];
      // rotations: [Vec3[], ReactStateSetter<Vec3[]>];
      materialSelectorToggle: [number, ReactStateSetter<number>];
      setSelectedModelMaterials: ReactStateSetter<TSelectedMaterial>;
      modelMaterial: string[];
      setActiveModelIndex: ReactStateSetter<number>;
      updateMaterial: [boolean, ReactStateSetter<boolean>];
    };
  };
}

interface ITransform {
  scale: Vec3;
  rotation: Vec3;
  position?: Vec3;
}

// interface ITransform {
//   model: ImageSourcePropType;
//   modelName: string;
//   modelIndex: number;
//   resources: ImageSourcePropType[];
//   materials?: ViroMaterialDict;
//   type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
//   interactable: string[];
//   ARMaterials: TSelectedMaterial;
//   scale: Vec3;
//   rotation: Vec3;
//   position?: Vec3;
// }

const DesafioIntroductorioSceneAR = (
  props: DesafioIntroductorioSceneARProps,
) => {
  const models = props.sceneNavigator.viroAppProps.models;
  const actividad = props.sceneNavigator.viroAppProps.actividad;
  const items = props.sceneNavigator.viroAppProps.items;
  const [updateMaterial, setUpdateMaterial] =
    props.sceneNavigator.viroAppProps.updateMaterial;
  const [positions] = props.sceneNavigator.viroAppProps.positions;
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    props.sceneNavigator.viroAppProps.materialSelectorToggle;
  const setSelectedModelMaterials =
    props.sceneNavigator.viroAppProps.setSelectedModelMaterials;
  const modelsMaterials = props.sceneNavigator.viroAppProps.modelMaterial;
  // const setActiveModelIndex =
  //   props.sceneNavigator.viroAppProps.setActiveModelIndex;

  const [, setTracking] = useState(false);
  const [transforms, setTransforms] = useState<ITransform[]>(
    items.map(item => ({
      scale: item.scale,
      rotation: item.rotation,
      position: [0, 0, 0],
    })),
  );
  const modelProps = items.map((item, index) => ({
    model: Models[actividad][item.model].model,
    modelName: item.model,
    modelIndex: index,
    resources: Models[actividad][item.model].resources,
    materials: Models[actividad][item.model].materials,
    type: Models[actividad][item.model].type,
    interactable:
      typeof item.interactable !== 'undefined' ? item.interactable : [],
    ARMaterials:
      typeof item.ARMaterials !== 'undefined'
        ? item.ARMaterials
        : {materialOrder: [], materialChoices: []},
    scale: item.scale,
    rotation: item.rotation,
    position: [0, 0, 0],
  }));
  const [rotations, setRotations] = useState<number[]>(modelProps.map(() => 0));

  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    let transform = [...transforms];
    // Giro en todos los ejes
    //const temp = transform[index].rotation.map(x => x - rotation / 50);
    // let temp2: Vec3 = [temp[0], temp[1], temp[2]];

    //Giro en eje y
    transform[index].rotation = [
      transform[index].rotation[0],
      transform[index].rotation[2] - rotation,
      transform[index].rotation[2],
    ];
    let rots = [...rotations];
    rots[index] = rotation;

    if (rotateState === 2) {
      setTransforms(transform);
    }
    if (rotateState !== 2) {
      setRotations(rots);
    }
  }
  function updateScale(index: number, pinchState: number, scaleFactor: number) {
    console.log('scale', pinchState, scaleFactor);

    let transform = [...transforms];
    const MIN_SCALE = 0.8;
    const MAX_SCALE = 1.3;
    const temp = transform[index].scale.map(x => x * scaleFactor);
    let temp2: Vec3 = [temp[0], temp[1], temp[2]];
    if (temp2[0] < items[index].scale[0] * MIN_SCALE) {
      temp2 = [
        items[index].scale[0] * MIN_SCALE,
        items[index].scale[1] * MIN_SCALE,
        items[index].scale[2] * MIN_SCALE,
      ];
      transform[index].scale = temp2;
    } else if (temp2[0] > items[index].scale[0] * MAX_SCALE) {
      temp2 = [
        items[index].scale[0] * MAX_SCALE,
        items[index].scale[1] * MAX_SCALE,
        items[index].scale[2] * MAX_SCALE,
      ];
      transform[index].scale = temp2;
    } else {
      transform[index].scale = temp2;
    }

    // if (temp2[0] >= MIN_SCALE && temp2[0] <= MAX_SCALE) {
    //   transform[index].scale = temp2;
    //   setTransforms(transform);
    // }
    setTransforms(transform);
  }

  function onInitialized(state: ViroTrackingStateConstants) {
    // console.log('state, reason, tracking:', state, reason, tracking);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTracking(true); // permite bindear cosas para que solo aparezcan cuando el tracking está activo
    }
  }

  function makeMaterials() {
    //ItemMaterials: ViroMaterialDict | undefined) {
    if (updateMaterial === true) {
      setUpdateMaterial(false);
      let materials = modelProps.map(model =>
        typeof model.materials !== 'undefined' ? model.materials : {},
      );
      for (let i = 0; i < materials.length; i++) {
        ViroMaterials.createMaterials(materials[i]);
      }
      // if (typeof ItemMaterials !== 'undefined') {
      //   ViroMaterials.createMaterials(ItemMaterials);
      // }
    }
  }

  // makeMaterials();
  function onModelClick(itemIndex: number) {
    if (
      modelProps[itemIndex].interactable.length === 0 ||
      materialSelectorToggle === 1
    ) {
      setMaterialSelectorToggle(0);
      return;
    }
    for (let i = 0; i < modelProps[itemIndex].interactable.length; i++) {
      if (modelProps[itemIndex].interactable[i] === 'materials') {
        // makeMaterials(modelProps[itemIndex].materials);
        makeMaterials();
        setSelectedModelMaterials(modelProps[itemIndex].ARMaterials);
        // setActiveModelIndex(modelProps[itemIndex].modelIndex);
        setMaterialSelectorToggle(1);
      }
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroDirectionalLight
        color="#FFFFFF"
        direction={[0.5, -1, 0.5]}
        castsShadow={true}
      />
      <ViroAmbientLight color="#FFFFFF" intensity={150} />
      {models.map((item: number, index: number) => {
        return (
          <ViroNode key={actividad + '_3dobj_' + index.toString()}>
            <Viro3DObject
              source={modelProps[item].model as ImageSourcePropType}
              resources={modelProps[item].resources}
              materials={modelsMaterials[index]}
              // resources={modelProps[item].resources as ImageSourcePropType[]}
              position={positions[index]}
              scale={transforms[item].scale}
              rotation={transforms[item].rotation}
              type={modelProps[item].type}
              onDrag={() => {}}
              dragType={'FixedToWorld'}
              onPinch={(pinchState, scaleFactor) =>
                updateScale(index, pinchState, scaleFactor)
              }
              onRotate={(rotateState, rotation) =>
                updateRotation(index, rotateState, rotation + rotations[index])
              }
              onClick={() => onModelClick(item)}
            />
          </ViroNode>
        );
      })}
    </ViroARScene>
  );
};

export default DesafioIntroductorioSceneAR;

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

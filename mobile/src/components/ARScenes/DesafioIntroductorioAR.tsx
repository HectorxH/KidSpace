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
import {ViroMaterialDict} from '@viro-community/react-viro/dist/components/Material/ViroMaterials';

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
      materialSelectorToggle: [number, ReactStateSetter<number>];
      setSelectedModelMaterials: ReactStateSetter<TSelectedMaterial>;
      modelMaterial: string[];
      setActiveModelIndex: ReactStateSetter<number>;
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
  const [positions] = props.sceneNavigator.viroAppProps.positions;
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    props.sceneNavigator.viroAppProps.materialSelectorToggle;
  const setSelectedModelMaterials =
    props.sceneNavigator.viroAppProps.setSelectedModelMaterials;
  const modelsMaterials = props.sceneNavigator.viroAppProps.modelMaterial;
  const setActiveModelIndex =
    props.sceneNavigator.viroAppProps.setActiveModelIndex;

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

  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    let transform = [...transforms];
    // Giro en todos los ejes
    //const temp = transform[index].rotation.map(x => x - rotation / 50);
    //let temp2: Vec3 = [temp[0], temp[1], temp[2]];

    //Giro en 1 eje
    const temp = transform[index].rotation[2] - rotation;
    let temp2: Vec3 = [
      transform[index].rotation[0],
      temp,
      transform[index].rotation[2],
    ];
    transform[index].rotation = temp2;
    setTransforms(transform);
  }
  function updateScale(index: number, pinchState: number, scaleFactor: number) {
    const MIN_SCALE = 0.1;
    const MAX_SCALE = 0.3;
    let transform = [...transforms];
    const temp = transform[index].scale.map(x => x * scaleFactor);
    let temp2: Vec3 = [temp[0], temp[1], temp[2]];
    if (temp2[0] >= MIN_SCALE && temp2[0] <= MAX_SCALE) {
      transform[index].scale = temp2;
      setTransforms(transform);
    }
  }

  function onInitialized(state: ViroTrackingStateConstants) {
    // console.log('state, reason, tracking:', state, reason, tracking);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTracking(true); // permite bindear cosas para que solo aparezcan cuando el tracking está activo
    }
  }

  function makeMaterials(ItemMaterials: ViroMaterialDict | undefined) {
    console.log('funcion llamada aaa');
    if (typeof ItemMaterials !== 'undefined') {
      ViroMaterials.createMaterials(ItemMaterials);
    }
  }

  function onModelClick(itemIndex: number) {
    if (
      modelProps[itemIndex].interactable.length === 0 ||
      materialSelectorToggle === 1
    ) {
      return;
    }
    for (let i = 0; i < modelProps[itemIndex].interactable.length; i++) {
      if (modelProps[itemIndex].interactable[i] === 'materials') {
        makeMaterials(modelProps[itemIndex].materials);
        setSelectedModelMaterials(modelProps[itemIndex].ARMaterials);
        setActiveModelIndex(modelProps[itemIndex].modelIndex);
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
              scale={modelProps[item].scale}
              rotation={modelProps[item].rotation}
              type={modelProps[item].type}
              onDrag={() => {}}
              dragType={'FixedToWorld'}
              onPinch={(pinchState, scaleFactor) =>
                updateScale(index, pinchState, scaleFactor)
              }
              onRotate={(rotateState, rotation) =>
                updateRotation(index, rotateState, rotation)
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

import React, {useState} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroDirectionalLight,
  ViroAmbientLight,
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  ViroPortalScene,
  ViroPortal,
  Viro360Image,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroImage,
  ViroVideo,
  // @ts-ignore
} from '@viro-community/react-viro';
import Images from '../../assets/images/images';
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
      imageTargets: string[];
      videoTargets: string[];
      imageTargetsDisplay: string[];
      videoTargetsDisplay: string[];
      actividad: string;
      models3d: IModels[];
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

const DesafioIntroductorioSceneAR = (
  props: DesafioIntroductorioSceneARProps,
) => {
  const models = props.sceneNavigator.viroAppProps.models;
  const imageTargets = props.sceneNavigator.viroAppProps.imageTargets;
  const videoTargets = props.sceneNavigator.viroAppProps.videoTargets;
  const imageTargetsDisplay =
    props.sceneNavigator.viroAppProps.imageTargetsDisplay;
  const videoTargetsDisplay =
    props.sceneNavigator.viroAppProps.videoTargetsDisplay;
  const actividad = props.sceneNavigator.viroAppProps.actividad;
  const models3d = props.sceneNavigator.viroAppProps.models3d;
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
    models3d.map(item => ({
      scale: item.scale,
      rotation: item.rotation,
      position: [0, 0, 0],
    })),
  );
  const modelProps = models3d.map((item, index) => ({
    model: Models[item.model].model,
    modelName: item.model,
    modelIndex: index,
    modelType: typeof item.type !== 'undefined' ? item.type : 'object',
    modelImage360: typeof item.image360 !== 'undefined' ? item.image360 : '',
    resources: Models[item.model].resources,
    materials: Models[item.model].materials,
    type: Models[item.model].type,
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
    let transform = [...transforms];
    const MIN_SCALE = 0.8;
    const MAX_SCALE = 1.3;
    const temp = transform[index].scale.map(x => x * scaleFactor);
    let temp2: Vec3 = [temp[0], temp[1], temp[2]];
    if (temp2[0] < models3d[index].scale[0] * MIN_SCALE) {
      temp2 = [
        models3d[index].scale[0] * MIN_SCALE,
        models3d[index].scale[1] * MIN_SCALE,
        models3d[index].scale[2] * MIN_SCALE,
      ];
      transform[index].scale = temp2;
    } else if (temp2[0] > models3d[index].scale[0] * MAX_SCALE) {
      temp2 = [
        models3d[index].scale[0] * MAX_SCALE,
        models3d[index].scale[1] * MAX_SCALE,
        models3d[index].scale[2] * MAX_SCALE,
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
    if (updateMaterial === true) {
      setUpdateMaterial(false);
      let materials = modelProps.map(model =>
        typeof model.materials !== 'undefined' ? model.materials : {},
      );
      for (let i = 0; i < materials.length; i++) {
        ViroMaterials.createMaterials(materials[i]);
      }
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
      {imageTargets.map((target: string, targetIndex: number) => {
        return (
          <ViroARImageMarker
            key={
              actividad + target + '_imageTracking_' + targetIndex.toString()
            }
            target={target}
            onAnchorFound={() => {
              console.log('target detectado:', target);
            }}>
            <ViroNode>
              <ViroImage
                height={0.5}
                width={0.5}
                position={[0, -1, 0]}
                rotation={[-90, 0, 0]}
                source={
                  Images.imageTargetsDisplay[imageTargetsDisplay[targetIndex]]
                }
              />
            </ViroNode>
          </ViroARImageMarker>
        );
      })}
      {videoTargets.map((target: string, targetIndex: number) => {
        return (
          <ViroARImageMarker
            key={
              actividad + target + '_videoTracking_' + targetIndex.toString()
            }
            target={target}
            // target={'pipe1'}
            onAnchorFound={() => {
              console.log('target detectado:', target);
            }}>
            <ViroNode>
              <ViroVideo
                height={1}
                width={0.5}
                // source={Images.videoTargetsDisplay.test}
                position={[0, -1, 0]}
                rotation={[-90, 0, 0]}
                loop={true}
                // onDrag={() => {}}
                // dragType={'FixedToWorld'}
                source={
                  Images.videoTargetsDisplay[videoTargetsDisplay[targetIndex]]
                }
              />
            </ViroNode>
          </ViroARImageMarker>
        );
      })}
      {models.map((itemNumber: number, modelIndex: number) => {
        return (
          <ViroNode key={actividad + '_3dobj_' + modelIndex.toString()}>
            {modelProps[itemNumber].modelType === 'object' && (
              <Viro3DObject
                source={modelProps[itemNumber].model as ImageSourcePropType}
                resources={modelProps[itemNumber].resources}
                materials={modelsMaterials[modelIndex]}
                position={positions[modelIndex]}
                scale={transforms[itemNumber].scale}
                rotation={transforms[itemNumber].rotation}
                type={modelProps[itemNumber].type}
                onDrag={() => {}}
                dragType={'FixedToWorld'}
                onPinch={(pinchState, scaleFactor) =>
                  updateScale(modelIndex, pinchState, scaleFactor)
                }
                onRotate={(rotateState, rotation) =>
                  updateRotation(
                    modelIndex,
                    rotateState,
                    rotation + rotations[modelIndex],
                  )
                }
                onClick={() => onModelClick(itemNumber)}
              />
            )}
            {modelProps[itemNumber].modelType === 'portal' && (
              <ViroPortalScene passable={true}>
                <ViroPortal
                  position={positions[modelIndex]}
                  scale={transforms[itemNumber].scale}
                  rotation={transforms[itemNumber].rotation}>
                  <Viro3DObject
                    source={modelProps[itemNumber].model as ImageSourcePropType}
                    resources={modelProps[itemNumber].resources}
                    materials={modelsMaterials[modelIndex]}
                    type={modelProps[itemNumber].type}
                    onDrag={() => {}}
                    dragType={'FixedToWorld'}
                    onPinch={(pinchState, scaleFactor) =>
                      updateScale(modelIndex, pinchState, scaleFactor)
                    }
                    onRotate={(rotateState, rotation) =>
                      updateRotation(
                        modelIndex,
                        rotateState,
                        rotation + rotations[modelIndex],
                      )
                    }
                    onClick={() => onModelClick(itemNumber)}
                  />
                </ViroPortal>
                <Viro360Image
                  source={
                    Images.images360[modelProps[itemNumber].modelImage360]
                  }
                />
              </ViroPortalScene>
            )}
          </ViroNode>
        );
      })}
    </ViroARScene>
  );
};

export default DesafioIntroductorioSceneAR;

ViroARTrackingTargets.createTargets({
  menhera: {
    source: Images.trackingTargets.menhera,
    orientation: 'Up',
    physicalWidth: 0.05,
    type: 'Image',
  },
  pipe1: {
    source: Images.trackingTargets.pipe1,
    orientation: 'Up',
    physicalWidth: 0.05,
    type: 'Image',
  },
  pipe2: {
    source: Images.trackingTargets.pipe2,
    orientation: 'Up',
    physicalWidth: 0.05,
    type: 'Image',
  },
});

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

import React, {useState} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroDirectionalLight,
  ViroAmbientLight,
  Viro3DObject,
  // @ts-ignore
} from '@viro-community/react-viro';
import Models from '../../assets/3d/models';
import {IItem, Vec3} from '../../types/activity';
import {ImageSourcePropType} from 'react-native';

interface DesafioIntroductorioSceneARProps {
  sceneNavigator: {
    viroAppProps: {
      models: number[];
      actividad: string;
      items: IItem[];
      positions: Vec3[];
    };
  };
}

interface ITransform {
  model: ImageSourcePropType;
  resources: ImageSourcePropType[];
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  scale: Vec3;
  rotation: Vec3;
  position?: Vec3;
}

const DesafioIntroductorioSceneAR = (
  props: DesafioIntroductorioSceneARProps,
) => {
  const models = props.sceneNavigator.viroAppProps.models;
  const actividad = props.sceneNavigator.viroAppProps.actividad;
  const items = props.sceneNavigator.viroAppProps.items;
  const positions = props.sceneNavigator.viroAppProps.positions;

  const [, setTracking] = useState(false);
  const [transforms, setTransforms] = useState<ITransform[]>(
    items.map(item => ({
      model: Models[actividad][item.model].model,
      resources: Models[actividad][item.model].resources,
      type: item.type,
      scale: item.scale,
      rotation: item.rotation,
    })),
  );

  function updatePosition(index: number, position: Vec3) {
    let transform = [...transforms];
    transform[index].position = position;
    setTransforms(transform);
  }
  function updateRotation(
    index: number,
    rotateState: number,
    rotation: number,
  ) {
    let transform = [...transforms];
    console.log(transform);
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
    console.log(transform);
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
          <Viro3DObject
            key={actividad + '_3dobj_' + index.toString()}
            source={transforms[item].model as ImageSourcePropType}
            resources={transforms[item].resources as ImageSourcePropType[]}
            position={positions[index]}
            scale={transforms[item].scale}
            rotation={transforms[item].rotation}
            type={transforms[item].type}
            onDrag={position =>
              updatePosition(item, [position[0], position[1], position[2]])
            }
            dragType={'FixedToWorld'}
            highAccuracyEvents={true}
            onPinch={(pinchState, scaleFactor) =>
              updateScale(index, pinchState, scaleFactor)
            }
            onRotate={(rotateState, rotation) =>
              updateRotation(index, rotateState, rotation)
            }
          />
        );
      })}
    </ViroARScene>
  );
};

export default DesafioIntroductorioSceneAR;

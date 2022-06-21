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
    };
  };
}

interface ITransform {
  model: ImageSourcePropType;
  resources: ImageSourcePropType[];
  type: 'GLB' | 'VRX' | 'OBJ' | 'GLTF';
  scale: Vec3;
  rotation: Vec3;
  position: Vec3;
}

const DesafioIntroductorioSceneAR = (
  props: DesafioIntroductorioSceneARProps,
) => {
  const models = props.sceneNavigator.viroAppProps.models;
  const actividad = props.sceneNavigator.viroAppProps.actividad;
  const items = props.sceneNavigator.viroAppProps.items;
  const [tracking, setTracking] = useState(false);
  const [transforms, setTransforms] = useState<ITransform[]>(
    items.map(item => ({
      model: Models[actividad][item.model].model,
      resources: Models[actividad][item.model].resources,
      type: item.type,
      scale: item.scale,
      rotation: item.rotation,
      position: [0, 0, -1],
    })),
  );
  function updatePosition(index: number, position: Vec3) {
    let transform = [...transforms];
    transform[index].position = position;
    setTransforms(transform);
  }
  // function updateRotation(index: number, rotation: Vec3) {
  //   let transform = [...transforms];
  //   transform[index].rotation = rotation;
  //   setTransforms(transform);
  // }
  // function updateScale(index: number, scale: Vec3) {
  //   let transform = [...transforms];
  //   transform[index].scale = scale;
  //   setTransforms(transform);
  // }

  function onInitialized(state: ViroTrackingStateConstants, reason: any) {
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
            position={transforms[item].position}
            scale={transforms[item].scale}
            rotation={transforms[item].rotation}
            type={transforms[item].type}
            onDrag={position =>
              updatePosition(item, [position[0], position[1], position[2]])
            }
            dragType={'FixedToWorld'}
            highAccuracyEvents={true}
            // onPinch={(pinchState, scaleFactor, source) =>
            //   updateScale(pinchState, scaleFactor, source)
            // }
          />
        );
      })}
    </ViroARScene>
  );
};

export default DesafioIntroductorioSceneAR;

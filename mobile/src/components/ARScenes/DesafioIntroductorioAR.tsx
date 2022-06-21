import React, {useState} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroDirectionalLight,
  ViroAmbientLight,
  Viro3DObject,
  ViroText,
} from '@viro-community/react-viro';
import Models from '../../assets/3d/models';

const DesafioIntroductorioSceneAR = (props) => {
  const models = props.sceneNavigator.viroAppProps.models;
  const actividad = props.sceneNavigator.viroAppProps.actividad;
  const items = props.sceneNavigator.viroAppProps.items;
  const [tracking, setTracking] = useState(false);
  const [transforms, setTransforms] = useState(
    items.map(item => ({
      model: Models[actividad][item.model].model,
      resources: Models[actividad][item.model].resources,
      type: item.type,
      scale: item.scale,
      rotation: item.rotation,
      position: [0, 0, -1],
    })),
  );
  function updatePosition(index, position) {
    let transform = [...transforms];
    transform[index].position = position;
    setTransforms(transform);
  }
  function updateRotation(index, rotation) {
    let transform = [...transforms];
    transform[index].rotation = rotation;
    setTransforms(transform);
  }
  function updateScale(index, scale) {
    let transform = [...transforms];
    transform[index].scale = scale;
    setTransforms(transform);
  }

  function onInitialized(state: ViroTrackingStateConstants, reason: any) {
    console.log('state, reason, tracking:', state, reason, tracking);
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
      {models.map((item, index) => {
        return (
          <Viro3DObject
            key={actividad + '_3dobj_' + index.toString()}
            source={transforms[item].model}
            resources={transforms[item].resources}
            position={transforms[item].position}
            scale={transforms[item].scale}
            rotation={transforms[item].rotation}
            type={transforms[item].type}
            onDrag={position =>
              updatePosition(item, [position[0], position[1], position[2]])
            }
            dragType={'FixedToWorld'}
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

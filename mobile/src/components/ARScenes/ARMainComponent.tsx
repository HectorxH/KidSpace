import React, {useState} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';
import {IImageTracker} from '../../types/activity';
import TargetTracker from './ARcomponents/TargetTracker';
import Objects3d from './ARcomponents/Object3d';
import Portals from './ARcomponents/Portals';
import {IViroAppParams} from '../../types/story';

interface ARMainComponentProps {
  sceneNavigator: {
    viroAppProps: {
      viroAppParams: IViroAppParams;
    };
  };
}

const ARMainComponent = (props: ARMainComponentProps) => {
  const viroProps = props.sceneNavigator.viroAppProps.viroAppParams;
  const {
    pageNumber,
    models,
    imageTrackers,
    actividad,
    models3d,
    positions,
    setSelectedModelMaterials,
    modelMaterial,
    modelProps,
    modelChildrenProps,
    useAlt,
    useChildrenAlt,
    markerTrackingState,
    activeTracker,
    activeTrackerIndex,
  } = viroProps;

  const [updateMaterial, setUpdateMaterial] = viroProps.updateMaterial;
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    viroProps.materialSelectorToggle;
  const [transforms, setTransforms] = viroProps.transforms;
  const [rotations, setRotations] = viroProps.rotations;
  const [, setTracking] = useState(false);

  function onInitialized(state: ViroTrackingStateConstants) {
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
      {imageTrackers[pageNumber].map(
        (imageTracker: IImageTracker, targetIndex: number) => {
          return (
            <ViroNode
              key={
                actividad +
                imageTracker.target +
                '_IT_' +
                targetIndex.toString()
              }>
              <TargetTracker
                imageTracker={imageTracker}
                pageNumber={pageNumber}
                trackerNumber={targetIndex}
                activeTrackerIndex={activeTrackerIndex}
                markerTrackingState={markerTrackingState}
                activeTracker={activeTracker}
              />
            </ViroNode>
          );
        },
      )}
      {models[pageNumber].map((itemNumber: number, modelIndex: number) => {
        return (
          <ViroNode key={actividad + '_3dobj_' + modelIndex}>
            {modelProps[pageNumber][itemNumber].modelType === 'object' && (
              <Objects3d
                pageNumber={pageNumber}
                models3d={models3d[pageNumber]}
                modelProps={modelProps}
                modelChildrenProps={modelChildrenProps}
                itemNumber={itemNumber}
                modelIndex={modelIndex}
                positions={positions[pageNumber]}
                useAlt={useAlt}
                useChildrenAlt={useChildrenAlt}
                rotations={[rotations, setRotations]}
                transforms={[transforms, setTransforms]}
                materialSelectorToggle={[
                  materialSelectorToggle,
                  setMaterialSelectorToggle,
                ]}
                setSelectedModelMaterials={setSelectedModelMaterials}
                modelMaterial={modelMaterial[pageNumber]}
                updateMaterial={[updateMaterial, setUpdateMaterial]}
              />
            )}
            {modelProps[pageNumber][itemNumber].modelType === 'portal' && (
              <Portals
                pageNumber={pageNumber}
                models3d={models3d[pageNumber]}
                modelProps={modelProps}
                modelChildrenProps={modelChildrenProps}
                itemNumber={itemNumber}
                modelIndex={modelIndex}
                positions={positions[pageNumber]}
                useAlt={useAlt}
                useChildrenAlt={useChildrenAlt}
                rotations={[rotations, setRotations]}
                transforms={[transforms, setTransforms]}
                materialSelectorToggle={[
                  materialSelectorToggle,
                  setMaterialSelectorToggle,
                ]}
                setSelectedModelMaterials={setSelectedModelMaterials}
                modelMaterial={modelMaterial[pageNumber]}
                updateMaterial={[updateMaterial, setUpdateMaterial]}
              />
            )}
          </ViroNode>
        );
      })}
    </ViroARScene>
  );
};

export default ARMainComponent;

ViroMaterials.createMaterials({
  default: {
    lightingModel: 'PBR',
    diffuseColor: 'rgb(231,231,231)',
  },
  white_sphere: {
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

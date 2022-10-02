import React, {useState} from 'react';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';
import Models from '../../assets/3d/models';
import {IImageTracker} from '../../types/activity';
import TargetTracker from './ARcomponents/TargetTracker';
import Objects3d from './ARcomponents/Object3d';
import Portals from './ARcomponents/Portals';
import {IModelProps, ITransform} from './ARcomponents/utils';
import {IViroAppParams} from '../../types/story';

interface ARMainComponentProps {
  sceneNavigator: {
    viroAppProps: {
      viroAppParams: IViroAppParams;
    };
  };
}

const ARMainComponent = (props: ARMainComponentProps) => {
  const {
    pageNumber,
    models,
    imageTrackers,
    actividad,
    models3d,
    positions,
    setSelectedModelMaterials,
    modelMaterial,
  } = props.sceneNavigator.viroAppProps.viroAppParams;

  const [updateMaterial, setUpdateMaterial] =
    props.sceneNavigator.viroAppProps.viroAppParams.updateMaterial;
  const [materialSelectorToggle, setMaterialSelectorToggle] =
    props.sceneNavigator.viroAppProps.viroAppParams.materialSelectorToggle;
  // const modelProps = props.sceneNavigator.viroAppProps.modelProps;
  // const [transforms, setTransforms] =
  //   props.sceneNavigator.viroAppProps.transforms;
  // const [rotations, setRotations] = props.sceneNavigator.viroAppProps.rotations;

  const [, setTracking] = useState(false);
  const [transforms, setTransforms] = useState<ITransform[]>(
    models3d[pageNumber].map(item => ({
      scale: item.scale,
      rotation: item.rotation,
      position: [0, 0, 0],
    })),
  );

  const modelProps: IModelProps[] = models3d[pageNumber].map(item => ({
    model: Models[item.model].model,
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
  }));
  const [rotations, setRotations] = useState<number[]>(modelProps.map(() => 0));

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
              <TargetTracker imageTracker={imageTracker} />
            </ViroNode>
          );
        },
      )}
      {models[pageNumber].map((itemNumber: number, modelIndex: number) => {
        return (
          <ViroNode key={actividad + '_3dobj_' + modelIndex.toString()}>
            {modelProps[itemNumber].modelType === 'object' && (
              <Objects3d
                models3d={models3d[pageNumber]}
                modelProps={modelProps}
                itemNumber={itemNumber}
                modelIndex={modelIndex}
                positions={positions[pageNumber]}
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
            {modelProps[itemNumber].modelType === 'portal' && (
              <Portals
                models3d={models3d[pageNumber]}
                modelProps={modelProps}
                itemNumber={itemNumber}
                modelIndex={modelIndex}
                positions={positions[pageNumber]}
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

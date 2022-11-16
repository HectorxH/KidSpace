import React from 'react';
import {
  ViroNode,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroImage,
  ViroVideo,
  Viro3DObject,
} from '@viro-community/react-viro';
import Images from '../../../assets/images/images';
import {IImageTracker} from '../../../types/activity';
import videos from '../../../assets/videos/videos';
import {ViroARTrackingTargetsMap} from '@viro-community/react-viro/dist/components/AR/ViroARTrackingTargets';
import {ReactStateSetter} from '../../../types/others';
import Models from '../../../assets/3d/models';
import {
  ViroRotation,
  ViroScale,
} from '@viro-community/react-viro/dist/components/Types/ViroUtils';

interface DesafioIntroductorioSceneARProps {
  imageTracker: IImageTracker;
  pageNumber: number;
  trackerNumber: number;
  markerTrackingState: [string[][], ReactStateSetter<string[][]>];
  activeTracker: [string[], ReactStateSetter<string[]>];
  activeTrackerIndex: [number[], ReactStateSetter<number[]>];
}

const DesafioIntroductorioSceneAR = (
  props: DesafioIntroductorioSceneARProps,
) => {
  const {imageTracker, pageNumber, trackerNumber} = props;
  const [markerTrackingState, setMarkerTrackingState] =
    props.markerTrackingState;
  const [activeTracker, setActiveTracker] = props.activeTracker;
  const [activeTrackerIndex, setActiveTrackerIndex] = props.activeTrackerIndex;
  const scale =
    typeof imageTracker.scale !== 'undefined' ? imageTracker.scale : [1, 1, 1];
  const rotation =
    typeof imageTracker.rotation !== 'undefined'
      ? imageTracker.rotation
      : [0, 0, 0];

  // const scale = [0.3, 0.3, 0.3];
  // const rotation = [-90, 180, 90];
  return (
    <ViroARImageMarker
      target={imageTracker.target}
      onAnchorUpdated={anchor => {
        if (
          anchor.trackingMethod !==
          markerTrackingState[pageNumber][trackerNumber]
        ) {
          let newMarkerTrackingState = [...markerTrackingState];
          let newActiveTracker = [...activeTracker];
          let newActiveTrackerIndex = [...activeTrackerIndex];

          newMarkerTrackingState[pageNumber][trackerNumber] =
            anchor.trackingMethod;

          if (anchor.trackingMethod === 'tracking') {
            // newActiveTracker[pageNumber] = imageTracker.target;
            newActiveTracker[pageNumber] = imageTracker.name;
            newActiveTrackerIndex[pageNumber] = trackerNumber;
            console.log('target detectado:', imageTracker.target);
          }

          setMarkerTrackingState(newMarkerTrackingState);
          setActiveTracker(newActiveTracker);
          setActiveTrackerIndex(newActiveTrackerIndex);
        }
      }}>
      <ViroNode scale={scale as ViroScale} rotation={rotation as ViroRotation}>
        {imageTracker.displayType === 'image' && (
          <ViroImage
            height={0.5}
            width={0.5}
            position={[0, -1, 0]}
            rotation={[-90, 0, 0]}
            onDrag={() => {}}
            dragType={'FixedToWorld'}
            source={Images.items[imageTracker.display]}
          />
        )}
        {imageTracker.displayType === 'video' && (
          <ViroVideo
            height={0.57}
            width={1}
            position={[0, -1, 0]}
            rotation={[-90, 0, 0]}
            loop={true}
            onDrag={() => {}}
            dragType={'FixedToWorld'}
            source={videos.items[imageTracker.display]}
          />
        )}

        {/* NOTE quizás implementar algun dia, pero va a desordenar
         todo con tanto parametro, igual seria choro */}
        {imageTracker.displayType === '3dobject' && (
          <Viro3DObject
            source={Models[imageTracker.display].model}
            type={Models[imageTracker.display].type}
            resources={Models[imageTracker.display].resources}
            position={[0, 0, 0]}
            onDrag={() => {}}
            dragType={'FixedToWorld'}
          />
        )}
      </ViroNode>
    </ViroARImageMarker>
  );
};

export default DesafioIntroductorioSceneAR;

const targets: ViroARTrackingTargetsMap = {
  menhera: {
    source: Images.trackingTargets.menhera,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  fbk: {
    source: Images.trackingTargets.fbk,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  pipe1: {
    source: Images.trackingTargets.pipe1,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  pipe2: {
    source: Images.trackingTargets.pipe2,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  harina: {
    source: Images.trackingTargets.harina,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  hilo: {
    source: Images.trackingTargets.hilo,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  mermelada: {
    source: Images.trackingTargets.mermelada,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  papel: {
    source: Images.trackingTargets.papel,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  plastico: {
    source: Images.trackingTargets.plastico,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  vidrio: {
    source: Images.trackingTargets.vidrio,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  camaraMomento: {
    source: Images.trackingTargets.camaraMomento,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  cucharaComer: {
    source: Images.trackingTargets.cucharaComer,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  libroInformacion: {
    source: Images.trackingTargets.libroInformacion,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  planchaRopa: {
    source: Images.trackingTargets.planchaRopa,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  telefonoDistancia: {
    source: Images.trackingTargets.telefonoDistancia,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  basureroAmarillo: {
    source: Images.trackingTargets.basureroAmarillo,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  basureroAzul: {
    source: Images.trackingTargets.basureroAzul,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  basureroCafe: {
    source: Images.trackingTargets.basureroCafe,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  basureroGris: {
    source: Images.trackingTargets.basureroGris,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
  basureroVerde: {
    source: Images.trackingTargets.basureroVerde,
    orientation: 'Up',
    physicalWidth: 0.3,
    type: 'Image',
  },
};

ViroARTrackingTargets.createTargets(targets);

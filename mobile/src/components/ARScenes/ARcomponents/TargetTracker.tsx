import React from 'react';
import {
  ViroNode,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroImage,
  ViroVideo,
} from '@viro-community/react-viro';
import Images from '../../../assets/images/images';
import {IImageTracker} from '../../../types/activity';
import videos from '../../../assets/videos/videos';

interface DesafioIntroductorioSceneARProps {
  imageTracker: IImageTracker;
}

const DesafioIntroductorioSceneAR = (
  props: DesafioIntroductorioSceneARProps,
) => {
  const imageTracker = props.imageTracker;
  return (
    <ViroARImageMarker
      target={imageTracker.target}
      onAnchorFound={() => {
        console.log('target detectado:', imageTracker.target);
      }}>
      <ViroNode>
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
            height={1}
            width={0.5}
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
        {/* {imageTracker.displayType === '3dobject'} */}
      </ViroNode>
    </ViroARImageMarker>
  );
};

export default DesafioIntroductorioSceneAR;

ViroARTrackingTargets.createTargets({
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
});

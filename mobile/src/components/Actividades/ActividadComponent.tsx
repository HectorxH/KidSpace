import React, {useRef} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import StoryComponent from './StoryComponent';
import ToggleButton from './ToggleButton';
import ActNavigation from './ActNavigation';

import Images from '../../assets/images/images';

import {RootStackParamList} from '../../types/navigation';

import ARMainComponent from '../ARScenes/ARMainComponent';
import Inventario from '../inventario/inventario';
import MaterialSelector from './MaterialSelector';
import {IActividadesComponentParams} from '../../types/story';
import MarkerTrackerFeedback from './MarkerTrackerFeedback';
import TemperaturaSelector from './TemperaturaSelector';

interface ActividadComponentProps {
  actividadesComponentParams: IActividadesComponentParams;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const ActividadComponent = (props: ActividadComponentProps) => {
  const {
    pageNumber,
    actividades,
    viroAppParams,
    inventarioParams,
    materialSelectorParams,
    storyComponentParams,
    toggleButtonParams,
    actNavigationParams,
    markerTrackerFeedbackParams,
  } = props.actividadesComponentParams;

  const actividad = actividades[pageNumber];
  const useAR = typeof actividad.AR !== 'undefined' ? true : false;
  let sceneNav = useRef<ViroARSceneNavigator>(null);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={Images.background[actividad.background]}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          {useAR === true && (
            <View style={styles.overlay}>
              <ViroARSceneNavigator
                worldAlignment={'Camera'}
                numberOfTrackedImages={4}
                ref={sceneNav}
                autofocus={true}
                initialScene={{
                  // @ts-ignore
                  scene: ARMainComponent,
                }}
                viroAppProps={{
                  viroAppParams: viroAppParams,
                }}
              />
            </View>
          )}
          <View style={styles.overlay}>
            <StoryComponent storyComponentParams={storyComponentParams} />
          </View>
          {useAR === true && (
            <View style={styles.overlay}>
              <Inventario
                inventarioParams={inventarioParams}
                sceneNav={sceneNav}
              />
            </View>
          )}
          <View style={styles.overlay}>
            <ToggleButton toggleButtonParams={toggleButtonParams} />
          </View>
          {useAR === true && (
            <View style={styles.overlay}>
              <MaterialSelector
                materialSelectorParams={materialSelectorParams}
              />
            </View>
          )}
          {useAR === true && (
            <View style={styles.overlay}>
              <TemperaturaSelector
                materialSelectorParams={materialSelectorParams}
              />
            </View>
          )}
          {useAR === true && (
            <View style={styles.overlay}>
              <MarkerTrackerFeedback
                markerTrackerFeedbackParams={markerTrackerFeedbackParams}
              />
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.overlay}>
        <ActNavigation
          actNavigationParams={actNavigationParams}
          navigation={props.navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActividadComponent;

import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ViroARScene,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroDirectionalLight,
  ViroAmbientLight,
  // @ts-ignore
} from '@viro-community/react-viro';
import {Button} from 'react-native-paper';

const DiagramasSceneAR = () => {
  const [tracking, setTracking] = useState(false);

  function onInitialized(state: any, reason: any) {
    console.log('state, reason, tracking:', state, reason, tracking);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTracking(true); // permite bindear cosas para que solo aparezcan cuando el tracking está activo
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setTracking(false); // permite bindear cosas para que solo aparezcan cuando el tracking está inactivo
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
    </ViroARScene>
  );
};

const ActividadDiagramas = () => {
  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: DiagramasSceneAR,
        }}
      />
      <TouchableOpacity>
        <Text style={styles.text}>Hola</Text>
      </TouchableOpacity>
      <Button color="#EC87C0" mode="contained">
        Desafío Creativo
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActividadDiagramas;

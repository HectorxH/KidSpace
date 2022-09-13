import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {RSize} from '../utils/responsive';
import Gatocargando from '../assets/inicio/gatocargando.json';

const CargaView = () => {
  return (
    <View>
      <LottieView style={styles.viewBG} source={Gatocargando} autoPlay loop />
      <View>
        <Text style={styles.subtitle}>Estamos despegando...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  viewBG: {
    position: 'absolute',
    alignSelf: 'center',
    width: RSize(1, 'h'),
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.06, 'h'),
    textAlign: 'center',
    color: '#063D69',
    marginTop: RSize(0.04, 'h'),
  },
});

export default CargaView;

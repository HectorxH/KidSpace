import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {RSize} from '../utils/responsive';
import {InicioViewProps} from '../types/navigation';
import {CommonActions} from '@react-navigation/native';
import LottieBackground from '../assets/inicio/background.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../hooks/useAuth';
// import Config from 'react-native-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import CargaView from './CargaView';

const InicioView = ({navigation}: InicioViewProps) => {
  const {user, refresh} = useAuth();
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      await refresh();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'MainMap'}],
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('User: ', user);
    if (user) {
      refreshUser();
    }
    // setTimeout(() => setLoading(false), 1000);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /*
  const testLogout = async () => {
    await logout();
    await AsyncStorage.removeItem('@notification');
    await axios.delete(`${Config.REACT_APP_BACKEND_URL}/logout`);
  };
  */

  if (user || loading) {
    return <CargaView />;
  } else {
    return (
      <View>
        <LottieView
          style={styles.viewBG}
          source={LottieBackground}
          autoPlay
          loop
        />
        <View>
          <Text style={styles.title}>¡Hola!</Text>
          <Text style={styles.subtitle}>
            Para iniciar tu viaje, necesitas escanear un código QR de invitación
          </Text>
          <Button
            style={styles.button}
            color="#8DB4E4"
            mode="contained"
            onPress={() => navigation.push('Qr')}>
            <Text style={styles.buttonText}>
              <Icon name="camera" size={RSize(0.07, 'h')} color="#FFFFFF" />{' '}
              Abrir la cámara
            </Text>
          </Button>
          {/*<Button onPress={testLogout}>!!!LOGOUT TEMPORAL!!!</Button>*/}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  viewBG: {
    position: 'absolute',
    width: RSize(1, 'w'),
  },
  button: {
    width: RSize(0.31, 'w'),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.04, 'h'),
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.15, 'h'),
    textAlign: 'center',
    color: '#ffffff',
    marginTop: RSize(0.05, 'h'),
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.06, 'h'),
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: RSize(0.1, 'w'),
    marginRight: RSize(0.1, 'w'),
    marginBottom: RSize(0.05, 'h'),
  },
});

export default InicioView;

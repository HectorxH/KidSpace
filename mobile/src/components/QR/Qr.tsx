import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {MainMapProps} from '../../types/navigation';

const Qr = ({navigation}: MainMapProps) => {
  const onSuccess = async (event: any) => {
    await AsyncStorage.setItem('@curso', event.data);
    navigation.navigate('FormularioView', {event});
  };

  return <QRCodeScanner onRead={onSuccess} />;
};

export default Qr;

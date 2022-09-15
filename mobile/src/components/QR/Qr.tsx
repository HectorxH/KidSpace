import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {MainMapProps} from '../../types/navigation';

const Qr = ({navigation}: MainMapProps) => {
  const onSuccess = (event: any) => {
    navigation.navigate('FormularioView', {event});
  };

  return <QRCodeScanner onRead={onSuccess} />;
};

export default Qr;

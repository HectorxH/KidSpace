import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActividadesProps, desafioTipo} from './types/navigation';
import Cuentos from './Cuentos';

const Actividades = ({navigation, route}: ActividadesProps) => {
  const actividad = route.params.actividad;
  const tipo = route.params.tipo;

  const cuentos: [desafioTipo, desafioTipo] = [
    'CuentoIntroductorio',
    'CuentoInteractivo',
  ];
  const desafios: [desafioTipo, desafioTipo] = [
    'DesafioIntroductorio',
    'DesafioCreativo',
  ];

  return (
    <View style={styles.container}>
      {cuentos.includes(tipo) ? (
        <Cuentos navigation={navigation} actividad={actividad} tipo={tipo} />
      ) : desafios.includes(tipo) ? (
        <View />
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Actividades;

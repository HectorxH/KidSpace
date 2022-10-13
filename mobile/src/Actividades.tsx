import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {ActividadesProps} from './types/navigation';
import ActividadComponent from './components/Actividades/ActividadComponent';
import ActividadesParams from './utils/ActividadesInit';
import {IActividadesComponentParams} from './types/story';

const Actividades = ({navigation, route}: ActividadesProps) => {
  const nombreActividad = route.params.actividad;
  const cantMonedas = route.params.cantMonedas;
  const userName = route.params.userName;
  const userLastName = route.params.userLastName;
  const curso = route.params.curso;
  const completadas = route.params.completadas;

  const actividadesComponentParams: IActividadesComponentParams =
    ActividadesParams(
      nombreActividad,
      userName,
      userLastName,
      curso,
      cantMonedas,
      completadas,
    );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.overlay}>
        <ActividadComponent
          actividadesComponentParams={actividadesComponentParams}
          navigation={navigation}
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
});

export default Actividades;

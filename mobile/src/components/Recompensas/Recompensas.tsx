import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {Button, Chip} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../../assets/imgs/handler/images';
import {imagesRecompensa} from '../../assets/recompensa/handler/imagesRecompensa';
import {RecompensasProps} from '../../types/navigation';
import LottieRecompensaBadge from '../../assets/recompensa/badge.json';
import LottieConfetti from '../../assets/recompensa/confetti.json';
import {RSize} from '../../utils/responsive';
import _ from 'lodash';
import {useAuth} from '../../hooks/useAuth';
import Config from 'react-native-config';
import {CommonActions} from '@react-navigation/native';

const actividadesIndividuales = {
  diseño1: 'La rueda de colores',
  diseño2: 'El mejor diseño',
  nutricion1: 'La salud ante todo',
  nutricion2: 'Buen provecho',
  informatica1: '¡Beep boop!',
  informatica2: 'Máquinas inteligentes',
  astronomia1: 'La Luna y el Sol',
  astronomia2: 'Observando el cielo',
};

const nombreActividades = {
  diagramas: 'Diagramas',
  materiales: 'Materiales',
  diseños: 'Diseños',
  diseño1: 'Teoría de colores',
  diseño2: 'Diseño gráfico en nuestro alrededor',
  nutricion1: 'Interpretando etiquetas de los alimentos',
  nutricion2: 'Analizando nuestra dieta',
  informatica1: 'Informática y algoritmos en nuestra vida',
  informatica2: '¿Qué es un computador?',
  astronomia1: 'Tierra, Luna y Sol',
  astronomia2: '¿Qué vemos en el cielo nocturno?',
};

const Recompensas = ({navigation, route}: RecompensasProps) => {
  const cantMonedas = route.params.cantMonedas;
  const nombreActividad = route.params.nombreActividad;
  const actividadesLog = route.params.actLog;
  const completadas = route.params.completadas;

  const {instance} = useAuth();

  let animationBadge: any = React.createRef();
  let animationConfetti: any = React.createRef();
  let loadingButton = false;
  const [fadeAnimFel] = useState(new Animated.Value(0));
  const [fadeAnimMon] = useState(new Animated.Value(0));
  const [fadeAnimTro] = useState(new Animated.Value(0));
  const [fadeAnimBut] = useState(new Animated.Value(0));

  useEffect(() => {
    animationBadge.current.play(0, 100);
    animationConfetti.current.play();
    Animated.timing(fadeAnimFel, {
      toValue: 1,
      duration: 1250,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnimMon, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(fadeAnimTro, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(fadeAnimBut, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }).start();
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkCompletada = () => {
    if (!(nombreActividad in actividadesIndividuales)) {
      return false;
    }
    console.log(completadas[nombreActividades[nombreActividad]]);
    if (completadas[nombreActividades[nombreActividad]] === 0) {
      return true;
    }
    return false;
  };

  const handleEndRecompensa = async () => {
    if (!loadingButton) {
      loadingButton = true;

      try {
        await instance
          .post(`${Config.REACT_APP_BACKEND_URL}/Estudiante/addMonedas`)
          .send({cantMonedas});
      } catch (e) {
        console.log(JSON.stringify(e));
        console.log('No fue posible a añadir monedas');
      }
      // let oldCantMonedas = await AsyncStorage.getItem('@monedas');
      // if (oldCantMonedas === null) {
      //   oldCantMonedas = '0';
      // }
      // await AsyncStorage.setItem(
      //   '@monedas',
      //   (parseInt(oldCantMonedas, 10) + cantMonedas).toString(),
      // );

      // let oldCompletadas = await AsyncStorage.getItem('@completadas');
      // if (oldCompletadas === null) {
      //   oldCompletadas = '[]';
      // }
      // oldCompletadas = JSON.parse(oldCompletadas);
      // // chequeamos que la actividad no este marcada como completada de antes
      // if (!oldCompletadas!.includes(nombreActividad)) {
      //   const newCompletadas = [...oldCompletadas!, nombreActividad];
      //   console.log(newCompletadas);
      //   await AsyncStorage.setItem(
      //     '@completadas',
      //     JSON.stringify(newCompletadas),
      //   );
      // }

      try {
        await AsyncStorage.getItem('@message', async (_err, actividades) => {
          let actividadesJson =
            actividades != null ? JSON.parse(actividades) : [];
          _.remove(actividadesJson, {nombreActividad: nombreActividad});
          await AsyncStorage.setItem(
            '@message',
            JSON.stringify(actividadesJson),
          );
        });
      } catch (e) {
        console.log(JSON.stringify(e));
      }
      try {
        await instance
          .post(`${Config.REACT_APP_BACKEND_URL}/Estadisticas/log`)
          .send({
            tipo: actividadesLog.tipo,
            actividad: actividadesLog.actividad,
            unidad: actividadesLog.unidad,
            steam: actividadesLog.steam,
            estudiante: actividadesLog.estudiante,
            curso: actividadesLog.curso,
            quizFinal: actividadesLog.quizFinal,
            duracion: actividadesLog.duracion,
            fecha: new Date(actividadesLog.fecha),
          });
      } catch (e) {
        console.log(JSON.stringify(e));
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'MainMap'}],
        }),
      );
    }
  };

  return (
    <View>
      <LottieView
        ref={animationConfetti}
        style={styles.viewBG}
        source={LottieConfetti}
        autoPlay
      />
      <View style={styles.badgeView}>
        <LottieView
          ref={animationBadge}
          source={LottieRecompensaBadge}
          loop={false}
        />
      </View>
      <Animated.View style={[styles.mainView, {opacity: fadeAnimFel}]}>
        <Text style={styles.blueText}> ¡Felicitaciones!</Text>
      </Animated.View>
      {cantMonedas !== 0 && (
        <Animated.View style={[styles.mainView, {opacity: fadeAnimMon}]}>
          <Chip style={styles.chip}>
            <View style={styles.viewLeft}>
              <Text style={styles.greyText}> Ganaste </Text>
            </View>
            <View style={styles.viewRight}>
              <Image style={styles.iconMoneda} source={images.moneda.uri} />
              <Text style={styles.blackText}>{cantMonedas} monedas</Text>
            </View>
          </Chip>
        </Animated.View>
      )}
      {checkCompletada() && (
        <Animated.View style={[styles.mainView, {opacity: fadeAnimTro}]}>
          <Chip style={styles.chip}>
            <View style={styles.viewLeft}>
              <Text style={styles.greyText}> ¡Nuevo logro! </Text>
            </View>
            <View style={styles.viewRight}>
              <Image
                style={styles.iconTrophy}
                source={imagesRecompensa.trophy.uri}
              />
              <Text style={styles.blackText}>
                {actividadesIndividuales[nombreActividad]}
              </Text>
            </View>
          </Chip>
        </Animated.View>
      )}
      <Animated.View style={[styles.buttonView, {opacity: fadeAnimBut}]}>
        <Button
          onPress={handleEndRecompensa}
          uppercase={false}
          style={styles.button}>
          <Text style={styles.buttonText}>Entendido</Text>
        </Button>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RSize(0.01, 'h'),
  },
  viewBG: {
    position: 'absolute',
    width: RSize(1, 'w'),
    height: RSize(1, 'h'),
  },
  badgeView: {
    justifyContent: 'center',
    height: RSize(0.4, 'h'),
    width: RSize(1, 'w'),
  },
  animation: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  chip: {
    backgroundColor: '#ededed',
    flexDirection: 'row',
    width: RSize(0.5, 'w'),
  },
  greyText: {
    fontFamily: 'Poppins-Regular',
    color: '#878787',
    fontSize: RSize(0.04, 'h'),
    justifyContent: 'flex-start',
  },
  blackText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    fontSize: RSize(0.04, 'h'),
    paddingLeft: 4,
  },
  blueText: {
    fontFamily: 'Poppins-Bold',
    color: '#5c9dec',
    fontSize: RSize(0.07, 'h'),
  },
  viewLeft: {
    minWidth: RSize(0.4, 'h'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewRight: {
    flexDirection: 'row',
  },
  iconMoneda: {
    resizeMode: 'cover',
    height: RSize(0.05, 'h'),
    width: RSize(0.05, 'h'),
  },
  iconTrophy: {
    resizeMode: 'cover',
    height: RSize(0.07, 'h'),
    width: RSize(0.05, 'h'),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: RSize(0.04, 'w'),
  },
  button: {
    backgroundColor: '#A1C96A',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});

export default Recompensas;

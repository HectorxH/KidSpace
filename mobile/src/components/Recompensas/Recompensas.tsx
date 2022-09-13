import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {Button, Chip} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../../assets/imgs/handler/images';
import {RecompensasProps} from '../../types/navigation';
import LottieRecompensaBadge from '../../assets/recompensa/badge.json';
import LottieConfetti from '../../assets/recompensa/confetti.json';
import {RSize} from '../../utils/responsive';

const Recompensas = ({navigation, route}: RecompensasProps) => {
  const cantMonedas = route.params.cantMonedas;
  let animationBadge: any = React.createRef();
  let animationConfetti: any = React.createRef();
  let loadingButton = false;
  const [fadeAnimFel] = useState(new Animated.Value(0));
  const [fadeAnimMon] = useState(new Animated.Value(0));
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
        toValue: 3,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(fadeAnimBut, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndRecompensa = async () => {
    if (!loadingButton) {
      loadingButton = true;
      let oldCantMonedas = await AsyncStorage.getItem('@monedas');
      if (oldCantMonedas === null) {
        oldCantMonedas = '0';
      }
      await AsyncStorage.setItem(
        '@monedas',
        (parseInt(oldCantMonedas, 10) + cantMonedas).toString(),
      );
      navigation?.dispatch(
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
      <Animated.View style={[styles.mainView, {opacity: fadeAnimMon}]}>
        <Chip style={styles.chip}>
          <View style={styles.viewLeft}>
            <Text style={styles.greyText}> Ganaste </Text>
          </View>
          <View style={styles.viewRight}>
            <Image style={styles.icon} source={images.moneda.uri} />
            <Text style={styles.blackText}>{cantMonedas} monedas</Text>
          </View>
        </Chip>
      </Animated.View>
      <Animated.View style={[styles.buttonView, {opacity: fadeAnimBut}]}>
        <Button onPress={handleEndRecompensa} style={styles.button}>
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
    backgroundColor: '#efefef',
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
  icon: {
    resizeMode: 'cover',
    height: RSize(0.05, 'h'),
    width: RSize(0.05, 'h'),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: RSize(0.07, 'w'),
  },
  button: {
    backgroundColor: '#A1C96A',
  },
  buttonText: {
    color: 'white',
  },
});

export default Recompensas;

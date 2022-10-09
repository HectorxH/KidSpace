/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, LogBox} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TiendaProps} from '../../types/navigation';
import {imagesTienda} from '../../assets/tienda/handler/imagesTienda';
import LottieView from 'lottie-react-native';
import LottieTiendaBG from '../../assets/tienda/tiendaInicioBG.json';
import {RSize} from '../../utils/responsive';
import {useAuth} from '../../hooks/useAuth';
import Config from 'react-native-config';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const windowHeight = Dimensions.get('window').height;

const defaultCompras = [
  Array.from({length: 31}, () => 0),
  Array.from({length: 39}, () => 0),
  Array.from({length: 11}, () => 0),
];

const Tienda = ({navigation, route}: TiendaProps) => {
  const [compras, setCompras] = useState(defaultCompras);
  const [loading, setLoading] = useState(true);
  const [moveOnLoad, setMoveOnLoad] = useState(false);
  const [moveTo, setMoveTo] = useState('');

  const {instance} = useAuth();

  const getCompras = async () => {
    try {
      const res = await instance.get(
        `${Config.REACT_APP_BACKEND_URL}/Estudiante/compras`,
      );
      setCompras(res.body.compras);
      setLoading(false);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  const navigateTo = (tipo: string) => {
    if (!loading) {
      navigation.push('TiendaItems', {
        tipo,
        setCantMonedas: route.params.setCantMonedas,
        cantMonedas: route.params.cantMonedas,
        compras,
        setCompras,
      });
    } else {
      setMoveOnLoad(true);
      setMoveTo(tipo);
    }
  };

  useEffect(() => {
    if (moveOnLoad) {
      navigateTo(moveTo);
    }
  }, [loading]);

  useEffect(() => {
    getCompras();
  }, []);

  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  let animationTiendaBG: any = React.createRef();
  return (
    <View>
      <LottieView
        ref={animationTiendaBG}
        style={styles.viewBG}
        source={LottieTiendaBG}
        autoPlay
        resizeMode="cover"
      />
      <View style={styles.view}>
        <Button
          color="#EC87C0"
          mode="contained"
          onPress={() => navigation.goBack()}>
          {back}
        </Button>
        <Text style={styles.title}> Tus Actividades:</Text>
      </View>
      <View style={styles.cards}>
        <Card
          elevation={5}
          style={styles.card}
          onPress={() => navigateTo('Ropa')}>
          <Card.Cover
            source={imagesTienda.portada_ropa.uri}
            style={{backgroundColor: 'white'}}
          />
          <Card.Title title="Ropa" titleStyle={styles.titleCard} />
        </Card>
        <Card style={styles.card} onPress={() => navigateTo('Accesorios')}>
          <Card.Cover
            source={imagesTienda.portada_accesorios.uri}
            style={{backgroundColor: 'white'}}
          />
          <Card.Title title="Accesorios" titleStyle={styles.titleCard} />
        </Card>
        <Card style={styles.card} onPress={() => navigateTo('Fondos')}>
          <Card.Cover
            source={imagesTienda.portada_fondos.uri}
            style={{backgroundColor: 'white'}}
          />
          <Card.Title title="Fondos" titleStyle={styles.titleCard} />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    margin: Math.round(windowHeight * 0.03),
  },
  viewBG: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Math.round(windowHeight * 0.06),
  },
  cards: {
    flexDirection: 'row',
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    width: RSize(1, 'w') / 3.23,
  },
  titleCard: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(1.5, 'h') / RSize(0.03, 'w'),
    color: '#5C9DEC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default Tienda;

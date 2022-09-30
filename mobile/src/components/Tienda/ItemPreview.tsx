import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Card} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import {imagesTienda} from '../../assets/tienda/handler/imagesTienda';
import LottieView from 'lottie-react-native';
import LottieSleepyCat from '../../assets/tienda/sleepyCat.json';

interface ItemPreviewProps {
  selectedItem: number;
  tipo: string;
  images: any;
}

const ItemPreview = (props: ItemPreviewProps) => {
  let animationSleepyCat: any = React.createRef();

  if (props.selectedItem !== -1) {
    return (
      <View
        style={{
          backgroundColor: '#ECECEC',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: RSize(0.15, 'h'),
          borderRadius: 10,
        }}>
        <Card elevation={5} style={styles.card}>
          <Card.Cover
            source={props.images[`i${props.selectedItem}`].uri}
            style={[
              {
                backgroundColor: 'white',
              },
              props.tipo !== 'Fondos'
                ? {marginHorizontal: RSize(0.1, 'h')}
                : {marginHorizontal: 0},
            ]}
          />
        </Card>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: RSize(0.1, 'w'),
      }}>
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
        }}
        resizeMode="stretch"
        source={imagesTienda.mesa.uri}>
        <LottieView
          ref={animationSleepyCat}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            translateY: RSize(-0.01, 'w'),
          }}
          source={LottieSleepyCat}
          autoPlay
          resizeMode="contain"
        />
        <View
          style={{
            position: 'absolute',
            left: RSize(0.05, 'h'),
            bottom: RSize(0.04, 'w'),
            paddingHorizontal: RSize(0.1, 'h'),
          }}>
          <Card style={{borderRadius: 20}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: RSize(0.55, 'h') / RSize(0.02, 'w'),
                padding: RSize(0.15, 'h') / RSize(0.01, 'w'),
              }}>
              Vendemos solo los mejores productos, miau. Selecciona lo que más
              te guste para ver su{' '}
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  color: '#5C9DEC',
                  fontSize: RSize(0.55, 'h') / RSize(0.02, 'w'),
                  padding: RSize(0.15, 'h') / RSize(0.01, 'w'),
                }}>
                vista previa.
              </Text>
            </Text>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: RSize(0.05, 'h'),
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
});

export default ItemPreview;

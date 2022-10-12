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
  let itemIndex = props.selectedItem;
  if (props.tipo === 'Accesorios' && props.selectedItem !== -1) {
    itemIndex += 1;
  }

  if (itemIndex !== -1) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Card elevation={5} style={styles.card}>
          <Card.Cover
            source={props.images[`i${itemIndex}`].uri}
            style={[
              {
                backgroundColor: 'white',
              },
              props.tipo !== 'Fondos'
                ? {marginHorizontal: '20%'}
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        //marginBottom: 100,
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
            //alignItems: 'center',
            //transform: [{translateY: -10}],
          }}
          source={LottieSleepyCat}
          autoPlay
          resizeMode="contain"
        />
        <View
          style={{
            alignItems: 'center',
            maxHeight: '60%',
            //position: 'absolute',
            //left: RSize(0.01, 'w'),
            //bottom: RSize(-0.5, 'h'),
          }}>
          <Card style={{borderRadius: 20}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-SemiBold',
                fontSize: RSize(0.7, 'w') / RSize(0.1, 'h'),
                padding: RSize(0.01, 'w') / RSize(0.1, 'h'),
              }}>
              Vendemos solo los mejores productos, miau. Selecciona lo que más
              te guste para ver su{' '}
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  color: '#5C9DEC',
                  fontSize: RSize(0.7, 'w') / RSize(0.1, 'h'),
                  padding: RSize(0.2, 'w') / RSize(0.1, 'h'),
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
    margin: 0,
    backgroundColor: 'white',
    width: '70%',
  },
});

export default ItemPreview;

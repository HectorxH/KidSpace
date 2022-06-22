import React from 'react';
import {View, StyleSheet, StatusBar, Text, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../assets/images/images';
import {ResultadoFinalProps} from '../../types/navigation';

function ResultadoFinal({navigation}: ResultadoFinalProps) {
  const headerTitle = ' Resultado final ';
  const buttonText = 'Responder el quiz';

  function Terminar() {
    navigation?.push('FinalQuiz');
  }
  return (
    <View style={styles.verticalContainer}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <Icon name="star" size={RSize(0.035)} color="white" />
          {headerTitle}
          <Icon name="star" size={RSize(0.035)} color="white" />
        </Text>
      </View>
      <View style={styles.horizontalContainer}>
        <View style={styles.body}>
          <View style={styles.images}>
            <View style={styles.container}>
              <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={Images.character.extras.grafico_circular}
              />
            </View>
            <View style={styles.container}>
              <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={Images.character.extras.grafico_barras}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              color="#A1C96A"
              style={styles.buttonStyle}
              onPress={() => Terminar()}>
              <Text style={styles.textStyle}>{buttonText}</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verticalContainer: {
    height: '100%',
    flexDirection: 'column',
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: RSize(0.05),
  },
  header: {
    padding: RSize(0.002),
    justifyContent: 'center',
    backgroundColor: '#FF8A00',
    elevation: RSize(0.01),
  },
  body: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontSize: RSize(0.035),
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    color: 'white',
  },
  images: {
    marginVertical: RSize(0.02),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    width: '40%',
    // height: '80%',
    justifyContent: 'space-between',
    // borderRadius: 1,
    // elevation: 7,
    // backgroundColor: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    borderRadius: RSize(0.02),
    justifyContent: 'center',
    paddingHorizontal: RSize(0.04),
  },
  textStyle: {
    fontSize: RSize(0.03),
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  imageStyle: {
    height: '90%',
    width: '100%',
    alignSelf: 'center',
  },
});

export default ResultadoFinal;

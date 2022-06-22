import React from 'react';
import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import Images from '../../assets/images/images';
import {RSize} from '../../utils/responsive';
import PainLayout from '../../utils/PainLayout';
import {ConclusionStoryProps} from '../../types/navigation';

const ConclusionStory = ({navigation}: ConclusionStoryProps) => {
  const message = {
    grid: [10, 10],
    start: [4, 1],
    end: [9, 8],
    text: [
      {
        message:
          '¡Muy bien!\n\nCon la tabla que creaste Diego puede hacer varios gráficos - por ejemplo, *gráfico de barras* y *gráfico circular*.',
        grid: [20, 20],
        start: [1, 0],
        end: [19, 17],
      },
    ],
  };

  const character = {
    name: 'Diego',
    mood: 'happy',
    grid: [10, 10],
    start: [0, 0],
    end: [4, 10],
  };

  const button = {
    text: 'Ver los gráficos',
    icon: 'chart-pie',
    style: 'row-reverse',
    color: '#FF8A00',
    grid: [10, 10],
    start: [4.8, 7.5],
    end: [8.2, 9],
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        resizeMode="cover"
        source={Images.background.bodega}
        style={styles.backgroundImageLeft}>
        <View style={styles.overlay}>
          <PainLayout
            object={character}
            objectType="character"
            navigation={navigation}
          />
        </View>
        <View style={styles.overlay}>
          <PainLayout
            object={message}
            objectType="message"
            navigation={navigation}
          />
        </View>
        <View style={styles.overlay}>
          <PainLayout
            object={button}
            objectType="button"
            navigation={navigation}
          />
        </View>
      </ImageBackground>
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
  textBody: {
    flex: 7,
  },
  backgroundImageLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
});

export default ConclusionStory;

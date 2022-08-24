import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import Items from './components/Cuentos/Items';
import TextBoxes from './components/Cuentos/TextBoxes';
import Texts from './components/Cuentos/Texts';
// import Questions from './components/Cuentos/Questions';
import StoryNavigation from './components/StoryNavigation';
import Images from './assets/images/images';
import Stories from './assets/stories/stories';
import {CuentosProps} from './types/navigation';

const Cuentos = ({navigation, route}: CuentosProps) => {
  const actividad = route.params.actividad;
  const tipo = route.params.tipo;
  const story = Stories[actividad][tipo];
  const [pageNumber, setPageNumber] = useState(0);
  const [canMove, setCanMove] = useState(0);

  const tempAux = 1;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        resizeMode="cover"
        source={Images.background[story[pageNumber].background]}
        style={styles.backgroundImage}>
        {/* Personajes/Imagenes */}
        <View style={styles.overlay}>
          <Items images={story[pageNumber].items} />
        </View>
        {/* Cuadros de texto */}
        <View style={styles.overlay}>
          <TextBoxes boxes={story[pageNumber].textBoxes} />
        </View>
        {/* Textos */}
        <View style={styles.overlay}>
          <Texts texts={story[pageNumber].texts} />
        </View>
        {/* Burbujas / otras imagenes */}
        <View style={styles.overlay}>
          <Items images={story[pageNumber].bubbles} />
        </View>
        {/* Alternativas/Botones */}
        {/* <View style={styles.overlay}>
          <Questions alternativas={story[pageNumber].alternativas} />
        </View> */}
      </ImageBackground>
      {canMove === 1 ||
      tempAux === 1 ||
      story[pageNumber].questions === 'none' ? (
        <StoryNavigation
          storyLength={story.length}
          pageNumber={[pageNumber, setPageNumber]}
          canMove={[canMove, setCanMove]}
          navigation={navigation}
        />
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
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Cuentos;

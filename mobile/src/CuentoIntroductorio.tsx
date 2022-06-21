import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import StorySide from './components/IntroductoryStory/StorySide';
import CharacterSide from './components/IntroductoryStory/CharacterSide';
import BubbleSide from './components/IntroductoryStory/BubblesSide';
import StoryNavigation from './components/StoryNavigation';
import Images from './assets/images/images';
import Stories from './assets/stories/stories';

const CuentoIntroductorio = (props: {actividad: any}) => {
  const actividad = props.actividad;
  const story = Stories[actividad].introductory;
  const [pageNumber, setPageNumber] = useState(0);
  const [canMove, setCanMove] = useState(0);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        resizeMode="cover"
        source={Images.background[story[pageNumber].background]}
        style={
          story[pageNumber].characterPosition === 'left'
            ? styles.backgroundImageLeft
            : styles.backgroundImageRight
        }>
        <CharacterSide
          character={story[pageNumber].character}
          mood={story[pageNumber].mood}
        />
        <StorySide
          message={story[pageNumber].message}
          characterPosition={story[pageNumber].characterPosition}
        />
        <View style={styles.overlay}>
          <BubbleSide
            bubble={story[pageNumber].bubble}
            characterPosition={story[pageNumber].characterPosition}
          />
        </View>
      </ImageBackground>
      <StoryNavigation
        storyLength={story.length}
        pageNumber={[pageNumber, setPageNumber]}
        canMove={[canMove, setCanMove]}
      />
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
  backgroundImageLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backgroundImageRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
});

export default CuentoIntroductorio;

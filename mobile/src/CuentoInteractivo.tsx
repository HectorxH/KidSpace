import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import StorySide from './components/InteractiveStory/StorySide';
import CharacterSide from './components/InteractiveStory/CharacterSide';
import BubbleSide from './components/InteractiveStory/BubbleSide';
import StoryNavigation from './components/StoryNavigation';
import Images from './assets/images/images';
import Stories from './assets/stories/stories';

const CuentoInteractivo = (props: {actividad: any}) => {
  const actividad = props.actividad;
  const story = Stories[actividad].interactive;
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
        <View style={styles.overlay}>
          <CharacterSide
            character={story[pageNumber].character}
            mood={story[pageNumber].mood}
            characterPosition={story[pageNumber].characterPosition}
          />
        </View>
        <View style={styles.overlay}>
          <StorySide
            message={story[pageNumber].message}
            messagePosition={story[pageNumber].messagePosition}
            messageExtra={story[pageNumber].messageExtra}
            messageBubble={story[pageNumber].messageBubble}
            messageAnswers={story[pageNumber].messageAnswers}
            rightAnswer={story[pageNumber].rightAnswer}
            canMove={[canMove, setCanMove]}
          />
        </View>
        <View style={styles.overlay}>
          <BubbleSide
            bubble={story[pageNumber].bubble}
            characterPosition={story[pageNumber].characterPosition}
            bubblePosition={story[pageNumber].bubblePosition}
          />
        </View>
      </ImageBackground>
      {canMove === 1 || story[pageNumber].rightAnswer === 'none' ? (
        <StoryNavigation
          storyLength={story.length}
          pageNumber={[pageNumber, setPageNumber]}
          canMove={[canMove, setCanMove]}
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

export default CuentoInteractivo;

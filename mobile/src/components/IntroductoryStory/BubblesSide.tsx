import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';
import {CharacterPosition} from '../../types/story';

interface BubbleSideProps {
  bubble: string;
  characterPosition: CharacterPosition;
}

const BubbleSide = ({bubble, characterPosition}: BubbleSideProps) => {
  return (
    <View style={styles.bubbleVContainer}>
      <View
        style={
          characterPosition === 'left'
            ? styles.bubbleHContainerLeft
            : styles.bubbleHContainerRight
        }>
        <View style={styles.smallBubbleHPadding} />
        <View style={styles.bubbleContainer}>
          <Image
            style={styles.bubbleImage}
            resizeMode="contain"
            source={Images.bubbles[bubble]}
          />
        </View>
        <View style={styles.bigBubbleHPadding} />
      </View>
      <View style={styles.bubbleVPadding} />
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleVContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bubbleVPadding: {
    flex: 2,
    // backgroundColor: 'black',
  },
  bubbleHContainerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  bubbleHContainerLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  smallBubbleHPadding: {
    flex: 1,
    // backgroundColor: 'white',
  },
  bigBubbleHPadding: {
    flex: 2,
    // backgroundColor: 'red',
  },
  bubbleContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  bubbleImage: {
    height: '100%',
    alignSelf: 'center',
  },
});

export default BubbleSide;

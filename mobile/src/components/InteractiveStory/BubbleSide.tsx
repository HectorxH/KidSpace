import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';

const BubbleSide = (props: {
  bubble: any;
  characterPosition: any;
  bubblePosition: any;
}) => {
  const bubble = props.bubble;
  const characterPosition = props.characterPosition;
  const bubblePosition = props.bubblePosition;

  return (
    <View style={styles.containerLeft}>
      {characterPosition !== 'none' || bubblePosition !== 'center' ? (
        <View
          style={
            bubble !== 'none'
              ? characterPosition === 'left'
                ? styles.containerLeft
                : styles.containerRight
              : {}
          }>
          <View style={styles.pad} />
          <View style={styles.pad} />
          <View
            style={
              bubblePosition === 'top'
                ? styles.containerTop
                : bubblePosition === 'bottom'
                ? styles.containerBottom
                : {}
            }>
            <View style={styles.bubbleContainer}>
              <Image
                style={styles.bubbleImage}
                resizeMode="contain"
                source={Images.bubbles[bubble]}
              />
            </View>
            <View style={styles.pad} />
          </View>
          <View style={styles.storyPad} />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  containerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  storyPad: {
    flex: 7,
  },
  containerTop: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  containerBottom: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  bubbleContainer: {
    flex: 1,
    // backgroundColor: 'black',
  },
  bubbleImage: {
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pad: {
    flex: 1,
  },
});

export default BubbleSide;

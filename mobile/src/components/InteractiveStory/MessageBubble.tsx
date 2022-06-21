import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';

const MessageBubble = (props: {messageBubble: any}) => {
  const messageBubble = props.messageBubble;

  return (
    <View style={styles.container}>
      {messageBubble !== 'none' ? (
        <View style={styles.storyBubbleBox}>
          <Image
            style={styles.bubbleImage}
            resizeMode="contain"
            source={Images.bubbles[messageBubble]}
          />
        </View>
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
  storyBubbleBox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bubbleImage: {
    height: '100%',
    alignSelf: 'center',
  },
});

export default MessageBubble;

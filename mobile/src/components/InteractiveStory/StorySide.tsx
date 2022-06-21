import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MessageBubble from './MessageBubble';
import Answers from './Answers';
import {ReactStateSetter} from '../../types/others';

interface StorySideProps {
  message: string;
  messagePosition: string;
  messageExtra: string;
  messageBubble: string;
  messageAnswers: [string, string, string] | 'none';
  rightAnswer: string;
  canMove: [number, ReactStateSetter<number>];
}

const StorySide = (props: StorySideProps) => {
  const message = props.message.split('*');
  const messagePosition = props.messagePosition;
  const messageExtra = props.messageExtra;
  const messageBubble = props.messageBubble;
  const messageAnswers = props.messageAnswers;
  const rightAnswer = props.rightAnswer;
  const [canMove, setCanMove] = props.canMove;

  return (
    <View style={styles.HorizontalContainer}>
      {/* Left padding */}
      <View style={styles.storyPad} />
      <View
        style={
          (messageExtra === 'answers' && messagePosition === 'center') ||
          messagePosition === 'right'
            ? styles.storyPadLeftRight
            : {}
        }
      />
      {/* ------------------ */}
      <View style={styles.VerticalContainer}>
        {/* Top padding */}
        <View style={styles.storyPad} />
        {/* ---------------- */}
        <View
          style={
            messageExtra === 'none'
              ? styles.storyContainerNormal
              : styles.storyContainerExtra
          }>
          <View style={styles.storyBox}>
            <View style={styles.storyTextBox}>
              <View style={styles.storyPad} />
              <View style={styles.textContainer}>
                <Text style={styles.baseText}>
                  {message.map((word, index) => {
                    return (
                      <Text
                        style={
                          index % 2 === 1 ? styles.oddText : styles.evenText
                        }
                        key={word}>
                        {word}
                      </Text>
                    );
                  })}
                </Text>
              </View>
              <View style={styles.storyPad} />
            </View>
            {messageBubble !== 'none' ? (
              <View style={styles.storyExtraBox}>
                <MessageBubble messageBubble={messageBubble} />
              </View>
            ) : (
              <View />
            )}
            {messageAnswers !== 'none' ? (
              <View style={styles.storyExtraBox} />
            ) : (
              <View />
            )}
          </View>
        </View>
        {/* Bottom padding */}
        <View style={styles.storyPad} />
        <View style={messageExtra === 'answers' ? styles.storyPad2 : {}} />
        {/* ---------------- */}
        {messageAnswers !== 'none' ? (
          <View style={styles.storyAnswerOverlay}>
            <Answers
              messageAnswers={messageAnswers}
              rightAnswer={rightAnswer}
              canMove={[canMove, setCanMove]}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
      {/* Right padding */}
      <View style={styles.storyPad} />
      <View
        style={
          (messageExtra === 'answers' && messagePosition === 'center') ||
          messagePosition === 'left'
            ? styles.storyPadLeftRight
            : {}
        }
      />
      {/* ------------------ */}
    </View>
  );
};

const styles = StyleSheet.create({
  HorizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  VerticalContainer: {
    flex: 6,
    flexDirection: 'column',
  },
  storyPad: {
    flex: 1,
  },
  storyPad2: {
    flex: 2,
  },
  storyPadLeftRight: {
    flex: 2,
  },
  storyContainerNormal: {
    flex: 3,
    flexDirection: 'row',
  },
  storyContainerExtra: {
    flex: 6,
    flexDirection: 'row',
  },
  storyBox: {
    flex: 6,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    // alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'black',
    flexDirection: 'column',
  },
  storyTextBox: {
    flex: 10,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 30,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  storyExtraBox: {
    flex: 8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  storyAnswerOverlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  baseText: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Poppins',
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
});

export default StorySide;

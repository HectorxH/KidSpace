import React from 'react';
import {View, StyleSheet, Image, Text, useWindowDimensions} from 'react-native';
import Images from '../../assets/images/images';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';

interface FeedbackJoseProps {
  feedbackJose: boolean;
  joseItem: string;
  joseMessage: string;
}

const FeedbackJose = ({
  feedbackJose,
  joseItem,
  joseMessage,
}: FeedbackJoseProps) => {
  const {fontScale} = useWindowDimensions();
  const message = joseMessage;
  if (feedbackJose === false) {
    return null;
  }
  const imageSource = Images.items[joseItem];
  return (
    <View style={styles.container}>
      <View style={styles.imageOverlay}>
        <Layout
          position={{start: [17, 5], end: [20, 20]}}
          ObjectView={
            <Image
              style={styles.image}
              resizeMode="cover"
              source={imageSource}
            />
          }
        />
      </View>
      <View style={styles.overlay}>
        <Layout
          position={{start: [13, 4.5], end: [17, 10]}}
          ObjectView={<View style={styles.textBox} />}
        />
      </View>
      <View style={styles.overlay}>
        <Layout
          position={{start: [13.2, 4.7], end: [16.8, 9.8]}}
          ObjectView={
            <View style={styles.textOverlay}>
              <Text
                style={[
                  styles.baseText,
                  {
                    fontSize: styles.baseText.fontSize / fontScale,
                  },
                ]}>
                {message}
              </Text>
            </View>
          }
        />
      </View>
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
  imageOverlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  textBox: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '100%',
    flexDirection: 'column',
    borderRadius: RSize(0.03, 'w'),
    borderWidth: 0,
  },
  image: {
    height: '100%',
    width: '100%',
    opacity: 1,
  },
  textOverlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  baseText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    // fontSize: RSize(4, 'h') / RSize(0.07, 'w'),
    fontWeight: 'normal',
    elevation: 0,
  },
});

export default FeedbackJose;

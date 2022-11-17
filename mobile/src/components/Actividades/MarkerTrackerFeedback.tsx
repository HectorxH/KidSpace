import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {IMarkerTrackerFeedbackParams} from '../../types/story';
import Layout from '../Utils/Layout';
import {RSize} from '../../utils/responsive';

interface MarkerTrackerFeedbackProps {
  markerTrackerFeedbackParams: IMarkerTrackerFeedbackParams;
}

const MarkerTrackerFeedback = (props: MarkerTrackerFeedbackProps) => {
  const {fontScale} = useWindowDimensions();
  const {
    pageNumber,
    activeTrackerIndex,
    markerTrackingState,
    activeTracker,
    toggleDefaultValue,
    toggleValues,
    trackerMessages,
    trackerFeedbacks,
  } = props.markerTrackerFeedbackParams;
  if (markerTrackingState[pageNumber].length === 0) {
    return null;
  }
  if (
    toggleDefaultValue[pageNumber] === true ||
    toggleValues[pageNumber][0] === 1
  ) {
    return null;
  }

  const displayMessage =
    markerTrackingState[pageNumber][activeTrackerIndex[pageNumber]] ===
    'tracking'
      ? trackerFeedbacks[pageNumber] === ''
        ? `¡Muy bien! ${activeTracker[pageNumber]} es la tarjeta correcta`
        : trackerFeedbacks[pageNumber]
      : 'Apunta con la cámara a la tarjeta correcta';
  // 'lastKnownPose'
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [9.5, 1],
            end: [19, 3.5],
          }}
          ObjectView={
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.baseText,
                  {fontSize: styles.baseText.fontSize / fontScale},
                ]}>
                {trackerMessages[pageNumber]}
              </Text>
            </View>
          }
        />
      </View>
      {/* {markerTrackingState[pageNumber][activeTrackerIndex[pageNumber]] ===
        'tracking' && ( */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [1, 16.5],
            end: [12, 19],
          }}
          ObjectView={
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.baseText,
                  {fontSize: styles.baseText.fontSize / fontScale},
                ]}>
                {displayMessage}
                {/* {`¡Muy bien! ${activeTracker[pageNumber]} es la tarjeta correcta`} */}
              </Text>
            </View>
          }
        />
      </View>
      {/* )} */}
      {/* {markerTrackingState[pageNumber][activeTrackerIndex[pageNumber]] !==
        'tracking' && (
        <View style={styles.overlay}>
          <Layout
            position={{
              start: [1, 16.5],
              end: [12, 19],
            }}
            ObjectView={
              <View style={styles.headerContainer}>
                <Text
                  style={[
                    styles.baseText,
                    {fontSize: styles.baseText.fontSize / fontScale},
                  ]}>
                  Apunta con la cámara a la tarjeta correcta
                </Text>
              </View>
            }
          />
        </View>
      )} */}
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
  headerContainer: {
    opacity: 0.7,
    width: '100%',
    height: '100%',
    borderRadius: RSize(0.05, 'h'),
    backgroundColor: '#5C9DEC',
    justifyContent: 'center',
  },
  baseText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'normal',
    elevation: 0,
  },
});

export default MarkerTrackerFeedback;

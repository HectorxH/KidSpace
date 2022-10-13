import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Layout from '../Utils/Layout';
import LottieView from 'lottie-react-native';
import Lottie from 'lottie-react-native';
import {ILottie} from '../../types/activity';
import tortuga from '../../assets/lotties/tortugaInfo2.json';

interface LottieComponentProps {
  lotties: ILottie[] | never[];
}

const LottieComponent = ({lotties}: LottieComponentProps) => {
  const animationRef = useRef<Lottie>(null);

  useEffect(() => {
    if (lotties.length > 0 && lotties[0].start === true) {
      animationRef.current?.play();
    }
  }, [lotties]);

  if (lotties.length === 0) {
    return null;
  }
  console.log(lotties);
  return (
    <View style={styles.container}>
      {lotties.map((lottie: ILottie) => {
        return (
          <View
            style={styles.overlay}
            key={
              lottie.position.start[0].toString() +
              lottie.position.start[1].toString() +
              lottie.position.end[0].toString() +
              lottie.position.end[1].toString() +
              'lottie'
            }>
            <Layout
              position={lottie.position}
              ObjectView={
                <View style={styles.lottie}>
                  <LottieView
                    ref={animationRef}
                    style={styles.viewBG}
                    source={tortuga}
                    autoPlay={lottie.start}
                    loop={false}
                    speed={1.5}
                  />
                </View>
              }
            />
          </View>
        );
      })}
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
  lottie: {
    flex: 1,
  },
  viewBG: {
    // position: 'absolute',
    alignSelf: 'center',
  },
});

export default LottieComponent;

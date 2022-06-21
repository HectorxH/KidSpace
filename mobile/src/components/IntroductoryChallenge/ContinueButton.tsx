import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const ContinueButton = (props) => {
  const answersCount = props.answersCount;
  const answersNum = props.answersNum;

  function Continue() {}
  return (
    <View style={styles.horizontalContainer}>
      <View style={styles.leftPad} />
      <View style={styles.verticalContainer}>
        <View style={styles.topPad} />
        <View style={styles.buttonBox}>
          <Button
            icon="arrow-right"
            labelStyle={styles.iconStyle}
            contentStyle={styles.iconContentStyle}
            mode="contained"
            color={answersCount < answersNum ? '#BBBBBB' : '#A1C96A'}
            style={styles.buttonStyle}
            onPress={() => Continue()}>
            <Text style={styles.textStyle}>Avanzar</Text>
          </Button>
        </View>
        <View style={styles.bottomPad} />
      </View>
      <View style={styles.rightPad} />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  leftPad: {
    flex: 1,
  },
  rightPad: {
    flex: 20,
  },
  verticalContainer: {
    flex: 10,
    flexDirection: 'column',
  },
  topPad: {
    flex: 1,
  },
  bottomPad: {
    flex: 70,
  },
  buttonBox: {
    flex: 15,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonStyle: {
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    height: '100%',
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins',
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: 24,
    justifyContent: 'center',
    color: 'white',
  },
  iconContentStyle: {
    flexDirection: 'row-reverse',
  },
});

export default ContinueButton;

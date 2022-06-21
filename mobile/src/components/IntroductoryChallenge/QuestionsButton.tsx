import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

const ToggleButton = (props) => {
  const toggleQuestions = props.toggleQuestions;
  const setToggleQuestions = props.setToggleQuestions;

  function toggle() {
    if (toggleQuestions === true) {
      setToggleQuestions(false);
    } else {
      setToggleQuestions(true);
    }
  }
  return (
    <View style={styles.horizontalContainer}>
      <View style={styles.leftPad} />
      <View style={styles.verticalContainer}>
        <View style={styles.topPad} />
        <View style={styles.buttonBox}>
          <Button
            icon={toggleQuestions === false ? 'magnify' : 'cube'}
            labelStyle={styles.iconStyle}
            mode="contained"
            color="#FF8A00"
            style={styles.buttonStyle}
            onPress={() => toggle()}>
            <Text style={styles.textStyle}>
              {toggleQuestions === false ? 'Preguntas' : 'Volver'}
            </Text>
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
    flexDirection: 'row',
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
});

export default ToggleButton;

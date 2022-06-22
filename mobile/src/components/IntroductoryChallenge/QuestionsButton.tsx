import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ButtonSetting} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

interface ToggleButtonProps {
  toggleQuestions: [boolean, ReactStateSetter<boolean>];
  settings: ButtonSetting;
  answersCounts: [number, ReactStateSetter<number>];
}

const ToggleButton = (props: ToggleButtonProps) => {
  const [toggleQuestions, setToggleQuestions] = props.toggleQuestions;
  const [, setAnswersCount] = props.answersCounts;
  const settings = props.settings;

  function toggle() {
    if (toggleQuestions === true) {
      setAnswersCount(0);
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
            icon={
              toggleQuestions === false
                ? settings.buttonIconNormal
                : settings.buttonIconAlt
            }
            labelStyle={styles.iconStyle}
            mode="contained"
            color={settings.buttonColorNormal}
            style={styles.buttonStyle}
            onPress={() => toggle()}>
            <Text style={styles.textStyle}>
              {toggleQuestions === false
                ? settings.buttonTextNormal
                : settings.buttonTextAlt}
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
    flex: 11,
    justifyContent: 'center',
  },
  buttonStyle: {
    borderRadius: RSize(0.05, 'h'),
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.05, 'h'),
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: RSize(0.07, 'h'),
    justifyContent: 'center',
    color: 'white',
  },
});

export default ToggleButton;

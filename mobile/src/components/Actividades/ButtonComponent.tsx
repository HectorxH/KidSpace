import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ButtonSetting} from '../../types/activity';
import {RSize} from '../../utils/responsive';

interface ButtonComponentProps {
  onPressFunction(): void;
  settings: ButtonSetting;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {onPressFunction, settings} = props;
  return (
    <View style={styles.container}>
      <Button
        icon={settings.buttonIcon}
        labelStyle={styles.iconStyle}
        mode="contained"
        color={settings.buttonColor}
        style={styles.buttonStyle}
        onPress={onPressFunction}>
        <Text style={styles.textStyle}>{settings.buttonText}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ButtonComponent;

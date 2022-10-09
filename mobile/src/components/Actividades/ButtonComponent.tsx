import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ButtonSetting} from '../../types/activity';
import {RSize} from '../../utils/responsive';

interface ButtonComponentProps {
  onPressFunction(): void;
  settings: ButtonSetting;
  disabled: boolean;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {fontScale} = useWindowDimensions();
  const {onPressFunction, settings} = props;
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={'gray'}
        disabled={props.disabled}
        style={[styles.buttonStyle, {backgroundColor: settings.buttonColor}]}
        onPress={onPressFunction}>
        <Text
          style={[
            styles.textStyle,
            {fontSize: styles.textStyle.fontSize / fontScale},
          ]}>
          {settings.buttonIcon !== '' && (
            <Icon
              name={settings.buttonIcon}
              size={styles.iconStyle.fontSize / fontScale}
              color={styles.textStyle.color}
            />
          )}
          {settings.buttonText}
        </Text>
      </TouchableHighlight>
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

    height: '100%',
    width: '100%',
    // backgroundColor: 'gray',
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: 19,
    justifyContent: 'center',
    color: 'white',
  },
});

export default ButtonComponent;

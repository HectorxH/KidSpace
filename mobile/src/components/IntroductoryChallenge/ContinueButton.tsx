import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ButtonSetting} from '../../types/activity';
import {RootStackParamList} from '../../types/navigation';

interface ContinueButtonProps {
  answersCount: number;
  answersNum: number;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Desafio'>;
  settings: ButtonSetting;
  tipo: string;
}

const ContinueButton = (props: ContinueButtonProps) => {
  const answersCount = props.answersCount;
  const answersNum = props.answersNum;
  const navigation = props.navigation;
  const settings = props.settings;
  const tipo = props.tipo;
  const contentStyle = StyleSheet.create({
    iconContentStyle: {flexDirection: settings.buttonIconPosNormal},
  });

  function Continue() {
    if (answersCount >= answersNum) {
      if (tipo === 'introductory') {
        navigation.push('CuentoInteractivo', {
          actividad: 'diagramas',
        });
      }
      if (tipo === 'interactive') {
        navigation.push('FinalQuiz');
      }
    }
  }
  return (
    <View style={styles.horizontalContainer}>
      <View style={styles.leftPad} />
      <View style={styles.verticalContainer}>
        <View style={styles.topPad} />
        <View style={styles.buttonBox}>
          <Button
            icon={settings.buttonIconNormal}
            labelStyle={styles.iconStyle}
            contentStyle={contentStyle.iconContentStyle}
            mode="contained"
            color={
              answersCount < answersNum
                ? settings.buttonColorNormal
                : settings.buttonColorAlt
            }
            // disabled={answersCount < answersNum ? true : false}
            style={styles.buttonStyle}
            onPress={() => Continue()}>
            <Text style={styles.textStyle}>{settings.buttonTextNormal}</Text>
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
  iconContentStyle: {},
});

export default ContinueButton;

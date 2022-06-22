import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {ButtonSetting} from '../../types/activity';
import {RootStackParamList} from '../../types/navigation';
import {RSize} from '../../utils/responsive';
import {ReactStateSetter} from '../../types/others';

interface ContinueButtonProps {
  answersCount: number;
  answersNum: number;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'Desafio' | 'Conclusion'
  >;
  settings: ButtonSetting;
  tipo: string;
  setNumPag: ReactStateSetter<number> | undefined;
}

const ContinueButton = (props: ContinueButtonProps) => {
  const answersCount = props.answersCount;
  const answersNum = props.answersNum;
  const navigation = props.navigation;
  const settings = props.settings;
  const tipo = props.tipo;
  const setNumPag = props.setNumPag;
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
        navigation.push('Conclusion', {actividad: 'diagramas', tipo: tipo});
      }
      if (tipo === 'conclusion' && setNumPag !== undefined) {
        setNumPag(1);
      }
      if (tipo === 'conclusion2') {
        navigation.push('ConclusionStory');
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
  iconContentStyle: {},
});

export default ContinueButton;

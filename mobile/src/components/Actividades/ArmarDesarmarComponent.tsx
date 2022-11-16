import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';
import Layout from '../Utils/Layout';
import {Text} from 'react-native-paper';
import {IModels} from '../../types/activity';

interface ArmarDesarmarComponentProps {
  armarDesarmarToggle: [number, ReactStateSetter<number>];
  pageNumber: number;
  objectNumber: number;
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  selectedPageOrder: [number, ReactStateSetter<number>];
  activeModelIndex: number;
  models3d: IModels[][];
  useAlt: [boolean[][], ReactStateSetter<boolean[][]>];
}

const ArmarDesarmarComponent = (props: ArmarDesarmarComponentProps) => {
  const {fontScale} = useWindowDimensions();
  const [useAlt, setUseAlt] = props.useAlt;

  function buttonPressed() {
    console.log('presionado');
    let newUseAlt = [...useAlt];
    if (newUseAlt[props.pageNumber][props.activeModelIndex] === true) {
      newUseAlt[props.pageNumber][props.activeModelIndex] = false;
    } else {
      newUseAlt[props.pageNumber][props.activeModelIndex] = true;
    }
    setUseAlt(newUseAlt);
  }

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [0, 6],
            end: [5, 9],
          }}
          ObjectView={
            <TouchableHighlight
              underlayColor={'gray'}
              style={styles.normalButton}
              onPress={() => buttonPressed()}>
              <Text
                style={[
                  styles.buttonText,
                  {fontSize: styles.buttonText.fontSize / fontScale},
                ]}>
                {useAlt[props.pageNumber][props.activeModelIndex] === false
                  ? 'Desarmar'
                  : 'Armar'}
              </Text>
            </TouchableHighlight>
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
  normalButton: {
    borderBottomRightRadius: RSize(0.02, 'h'),
    borderTopRightRadius: RSize(0.02, 'h'),
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#5C9DEC',
    opacity: 0.8,
    width: '100%',
    height: '100%',
  },
  selectedButton: {
    borderBottomRightRadius: RSize(0.02, 'h'),
    borderTopRightRadius: RSize(0.02, 'h'),
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#5C9DEC',
    opacity: 1,
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    textTransform: 'none',
    fontSize: 18,
    alignSelf: 'center',
  },
  texturesSpace: {
    borderBottomLeftRadius: RSize(0.02, 'h'),
    borderTopLeftRadius: RSize(0.02, 'h'),
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#5C9DEC',
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: RSize(0.03, 'h'),
    alignSelf: 'center',
    opacity: 1,
  },
  textureButton: {
    borderWidth: 0,
    borderRadius: RSize(0.03, 'h'),
    justifyContent: 'center',
    // borderRadius: RSize(0.03, 'h'),
    // backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  selectedTextureButton: {
    borderWidth: 3,
    borderColor: '#5C9DEC',
    justifyContent: 'center',
    borderRadius: RSize(0.03, 'h'),
    // backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  continueButton: {
    borderWidth: 0,
    justifyContent: 'center',
    borderRadius: RSize(0.03, 'h'),
    backgroundColor: '#A1C96A',
    width: '100%',
    height: '100%',
  },
  continueButtonDisabled: {
    borderWidth: 0,
    justifyContent: 'center',
    borderRadius: RSize(0.03, 'h'),
    backgroundColor: '#BBBBBB',
    width: '100%',
    height: '100%',
  },
});

export default ArmarDesarmarComponent;

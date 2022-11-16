import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Layout from '../Utils/Layout';
import {Text} from 'react-native-paper';

interface TemperaturaSelectorComponentProps {
  temperaturaSelectorToggle: [number, ReactStateSetter<number>];
  pageNumber: number;
  objectNumber: number;
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  selectedPageOrder: [number, ReactStateSetter<number>];
  temperaturasList: string[][][];
}

const TemperaturaSelectorComponent = (
  props: TemperaturaSelectorComponentProps,
) => {
  const {fontScale} = useWindowDimensions();
  const selectedPageOrder = props.selectedPageOrder[0];
  const [selectedMaterial, setSelectedMaterial] = props.selectedMaterial;
  const [modelMaterial, setModelMaterial] = props.modelMaterial;

  const activeMaterial =
    selectedMaterial[props.pageNumber][props.objectNumber][selectedPageOrder];

  const selectedModelMaterials = props.selectedModelMaterials;
  const firstMaterial = selectedModelMaterials.materialChoices[0][0];
  const lastMaterial =
    selectedModelMaterials.materialChoices[0][
      selectedModelMaterials.materialChoices[0].length - 1
    ];
  // function buttonPressed(v: string) {
  //   let selectedMaterials = props.selectedMaterial[0];
  //   selectedMaterials[props.pageNumber][props.objectNumber][selectedPageOrder] =
  //     v;
  //   props.selectedMaterial[1](selectedMaterials);

  //   let newTexture = '';
  //   for (
  //     let i = 0;
  //     i < props.selectedModelMaterials.materialOrder.length;
  //     i++
  //   ) {
  //     newTexture +=
  //       props.selectedMaterial[0][props.pageNumber][props.objectNumber][i];
  //     if (i !== props.selectedModelMaterials.materialOrder.length - 1) {
  //       newTexture += '_';
  //     }
  //   }
  //   let modelMaterials = [...props.modelMaterial[0]];
  //   modelMaterials[props.pageNumber][props.objectNumber] = newTexture;
  //   props.modelMaterial[1](modelMaterials);
  // }

  function subirTemperatura() {
    let selectedMaterialIndex = 0;
    let selectedMaterials = [...selectedMaterial];
    let modelMaterials = [...modelMaterial];
    if (activeMaterial !== 'default') {
      selectedMaterialIndex =
        selectedModelMaterials.materialChoices[0].indexOf(activeMaterial);
    }
    if (
      selectedMaterialIndex + 1 <
      selectedModelMaterials.materialChoices[0].length
    ) {
      let newTexture =
        selectedModelMaterials.materialChoices[0][selectedMaterialIndex + 1];

      selectedMaterials[props.pageNumber][props.objectNumber][0] = newTexture;
      modelMaterials[props.pageNumber][props.objectNumber] = newTexture;
    }

    setSelectedMaterial(selectedMaterials);
    setModelMaterial(modelMaterials);
  }

  function bajarTemperatura() {
    let selectedMaterialIndex = 0;
    let selectedMaterials = [...selectedMaterial];
    let modelMaterials = [...modelMaterial];
    if (activeMaterial !== 'default') {
      selectedMaterialIndex =
        selectedModelMaterials.materialChoices[0].indexOf(activeMaterial);
    }
    if (selectedMaterialIndex > 0) {
      let newTexture =
        selectedModelMaterials.materialChoices[0][selectedMaterialIndex - 1];

      selectedMaterials[props.pageNumber][props.objectNumber][0] = newTexture;
      modelMaterials[props.pageNumber][props.objectNumber] = newTexture;
    }
    setSelectedMaterial(selectedMaterials);
    setModelMaterial(modelMaterials);
  }

  return (
    <View style={styles.container}>
      {/* Botones subir y bajar temperatura */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [0.5, 6],
            end: [5.5, 9],
          }}
          ObjectView={
            <TouchableHighlight
              underlayColor={'gray'}
              style={[
                styles.subirTempButton,
                activeMaterial === lastMaterial ? {opacity: 0.5} : {},
              ]}
              disabled={activeMaterial === lastMaterial}
              onPress={() => subirTemperatura()}>
              <View>
                <Text
                  style={[
                    styles.buttonText,
                    {fontSize: styles.buttonText.fontSize / fontScale},
                  ]}>
                  <Icon
                    name={'arrow-up'}
                    size={RSize(0.05, 'h')}
                    color={'#ffffff'}
                  />
                  {' Subir °C'}
                </Text>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [0.5, 12],
            end: [5.5, 15],
          }}
          ObjectView={
            <TouchableHighlight
              underlayColor={'gray'}
              style={[
                styles.bajarTempButton,
                activeMaterial === 'default' || activeMaterial === firstMaterial
                  ? {opacity: 0.5}
                  : {},
              ]}
              disabled={
                activeMaterial === 'default' || activeMaterial === firstMaterial
              }
              onPress={() => bajarTemperatura()}>
              <View>
                <Text
                  style={[
                    styles.buttonText,
                    {fontSize: styles.buttonText.fontSize / fontScale},
                  ]}>
                  <Icon
                    name={'arrow-down'}
                    size={RSize(0.05, 'h')}
                    color={'#ffffff'}
                  />
                  {' Bajar °C'}
                </Text>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
      {/* Cuadro temperatura  */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [14, 1],
            end: [20, 19],
          }}
          ObjectView={<View style={styles.temperaturasSpace} />}
        />
      </View>
      {/* texto Temperatura */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [15, 2],
            end: [20, 4],
          }}
          ObjectView={
            <Text
              style={[
                styles.buttonText,
                {fontSize: styles.buttonText.fontSize / fontScale},
              ]}>
              {'Temperatura'}
            </Text>
          }
        />
      </View>
      {/* Barra temperatura blanca  */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [18.4, 5],
            end: [19.4, 18],
          }}
          ObjectView={<View style={styles.barraTemperatura} />}
        />
      </View>
      {/* circulo rojo  */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [17.9, 14.5],
            end: [19.9, 18],
          }}
          ObjectView={<View style={styles.circulo} />}
        />
      </View>
      {/* Barra temperatura rojab */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [
              18.4,
              activeMaterial === 'default' || activeMaterial === 'betelgeuse'
                ? 13
                : activeMaterial === 'sun'
                ? 11
                : activeMaterial === 'sirius'
                ? 8
                : 6,
            ],
            end: [19.4, 18],
          }}
          ObjectView={
            <View
              style={[styles.barraTemperatura, {backgroundColor: '#EA6A6A'}]}
            />
          }
        />
      </View>
      {/* Texto con la temperatura */}
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [
              14.2,
              activeMaterial === 'default' || activeMaterial === 'betelgeuse'
                ? 13
                : activeMaterial === 'sun'
                ? 11
                : activeMaterial === 'sirius'
                ? 8
                : 6,
            ],
            end: [
              18,
              activeMaterial === 'default' || activeMaterial === 'betelgeuse'
                ? 16
                : activeMaterial === 'sun'
                ? 14
                : activeMaterial === 'sirius'
                ? 11
                : 9,
            ],
          }}
          ObjectView={<View style={styles.textBox} />}
        />
      </View>
      <View style={styles.overlay}>
        <Layout
          position={{
            start: [
              14.2,
              activeMaterial === 'default' || activeMaterial === 'betelgeuse'
                ? 13
                : activeMaterial === 'sun'
                ? 11
                : activeMaterial === 'sirius'
                ? 8
                : 6,
            ],
            end: [
              18,
              activeMaterial === 'default' || activeMaterial === 'betelgeuse'
                ? 16
                : activeMaterial === 'sun'
                ? 14
                : activeMaterial === 'sirius'
                ? 11
                : 9,
            ],
          }}
          ObjectView={
            <View style={styles.box}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize: styles.buttonText.fontSize / fontScale,
                    color: '#000000',
                  },
                ]}>
                {activeMaterial === 'default' || activeMaterial === 'betelgeuse'
                  ? '3.500 °C'
                  : activeMaterial === 'sun'
                  ? '7.500 °C'
                  : activeMaterial === 'sirius'
                  ? '11.500 °C'
                  : '25.000 °C'}
              </Text>
            </View>
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
  subirTempButton: {
    borderRadius: RSize(0.02, 'h'),
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#EC87C0',
    opacity: 1,
    width: '100%',
    height: '100%',
  },
  bajarTempButton: {
    borderRadius: RSize(0.02, 'h'),
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
  temperaturasSpace: {
    borderBottomLeftRadius: RSize(0.02, 'h'),
    borderTopLeftRadius: RSize(0.02, 'h'),
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: '#5C9DEC',
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  barraTemperatura: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    opacity: 1,
    backgroundColor: '#ffffff',
  },
  textBox: {
    width: '100%',
    height: '100%',
    borderRadius: RSize(0.03, 'w'),
    opacity: 1,
    backgroundColor: '#ffffff',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
  },
  circulo: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
    opacity: 1,
    backgroundColor: '#EA6A6A',
  },
});

export default TemperaturaSelectorComponent;

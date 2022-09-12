import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';
import Layout from '../Utils/Layout';
import {Button, Text} from 'react-native-paper';

interface MaterialSelectorComponentProps {
  materialSelectorToggle: [number, ReactStateSetter<number>];
  pageNumber: number;
  objectNumber: number;
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
}

const MaterialSelectorComponent = (props: MaterialSelectorComponentProps) => {
  const [selectedPageOrder, setSelectedPageOrder] = useState<number>(0);
  console.log();
  console.log('aqui llego pt 1:');
  console.log(
    props.selectedModelMaterials.materialOrder.length,
    props.selectedModelMaterials.materialChoices.length,
  );
  if (
    props.selectedModelMaterials.materialOrder.length === 0 ||
    props.selectedModelMaterials.materialChoices.length === 0
  ) {
    return null;
  }
  console.log('aqui llego :c');
  function buttonPressed(v: string) {
    console.log(v);
    let selectedMaterials = props.selectedMaterial[0];
    selectedMaterials[props.pageNumber][props.objectNumber][selectedPageOrder] =
      v;
    props.selectedMaterial[1](selectedMaterials);
    let newTexture = '';
    for (
      let i = 0;
      i < props.selectedModelMaterials.materialOrder.length;
      i++
    ) {
      newTexture +=
        props.selectedMaterial[0][props.pageNumber][props.objectNumber][i];
      if (i !== props.selectedModelMaterials.materialOrder.length - 1) {
        newTexture += '_';
      }
    }
    let modelMaterials = [...props.modelMaterial[0]];
    modelMaterials[props.pageNumber][props.objectNumber] = newTexture;
    props.modelMaterial[1](modelMaterials);
  }
  function changePage() {
    if (
      selectedPageOrder ===
      props.selectedModelMaterials.materialOrder.length - 1
    ) {
      setSelectedPageOrder(0);
      props.materialSelectorToggle[1](0);
    } else {
      setSelectedPageOrder(selectedPageOrder + 1);
    }
  }
  return (
    <View style={styles.container}>
      {props.selectedModelMaterials.materialOrder.map(
        (material: string, index) => {
          return (
            <View style={styles.overlay} key={material + index.toString()}>
              <View style={styles.overlay}>
                <Layout
                  position={{
                    start: [0, 5 + 3 * index],
                    end: [5, 7 + 3 * index],
                  }}
                  ObjectView={
                    <View
                      style={
                        index === selectedPageOrder
                          ? styles.selectedButton
                          : styles.normalButton
                      }>
                      <Text style={styles.buttonText}>
                        {(index + 1).toString() + ' - ' + material}
                      </Text>
                    </View>
                  }
                />
              </View>
            </View>
          );
        },
      )}

      <View style={styles.overlay}>
        <View style={styles.overlay}>
          <Layout
            position={{
              start: [15, 1],
              end: [20, 19],
            }}
            ObjectView={<View style={styles.texturesSpace} />}
          />
        </View>
        <View style={styles.overlay}>
          <Layout
            position={{
              start: [15, 2],
              end: [20, 3],
            }}
            ObjectView={
              <Text style={styles.buttonText}>
                {props.selectedModelMaterials.materialOrder[selectedPageOrder]}
              </Text>
            }
          />
        </View>

        {props.selectedModelMaterials.materialChoices[selectedPageOrder].map(
          (v: string, index: number) => {
            return (
              <View style={styles.overlay} key={v + '_' + index.toString()}>
                <Layout
                  position={{
                    start: [
                      15.25 + 2.375 * (index % 2),
                      4 + 4.5 * (index / 2) * (1 - (index % 2)),
                    ],
                    end: [
                      17.375 + 2.375 * (index % 2),
                      8 + 4.5 * (index / 2) * (1 - (index % 2)),
                    ],
                  }}
                  ObjectView={
                    <Button
                      mode="contained"
                      // color={'black'}
                      style={styles.textureButton}
                      onPress={() => buttonPressed(v)}>
                      <Text style={styles.buttonText}>{v}</Text>
                    </Button>
                  }
                />
              </View>
            );
          },
        )}

        <View style={styles.overlay}>
          <Layout
            position={{
              start: [16.25, 15],
              end: [18.75, 18.5],
            }}
            ObjectView={
              <Button
                mode="contained"
                // color={'black'}
                style={styles.textureButton}
                onPress={() => changePage()}>
                <Text style={styles.buttonText}>{'Listo'}</Text>
              </Button>
            }
          />
        </View>
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
    opacity: 0.5,
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
    fontSize: RSize(0.05, 'h'),
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
  textureButton: {
    borderWidth: 0,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
});

export default MaterialSelectorComponent;

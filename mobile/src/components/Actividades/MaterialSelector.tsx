import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ReactStateSetter} from '../../types/others';
import {IModels} from '../../types/activity';
import MaterialSelectorComponent from './MaterialSelectorComponent';

interface MaterialSelectorProps {
  materialSelectorToggle: [number, ReactStateSetter<number>];
  pageNumber: number;
  modelMaterial: [string[][], ReactStateSetter<string[][]>]; // este contiene el string con la textura completa de cada objeto 3d por cada pagina
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>]; // este contiene el string con la textura separada por campo de cada objeto 3d por cada pagina
  selectedModelMaterials: {
    materialOrder: string[];
    materialChoices: string[][];
  };
  activeModelIndex: number;
  models3d: IModels[];
}

const MaterialSelector = (props: MaterialSelectorProps) => {
  if (
    props.models3d.length < props.activeModelIndex ||
    typeof props.models3d[props.activeModelIndex].ARMaterials === 'undefined' ||
    props.materialSelectorToggle[0] === 0
  ) {
    return null;
  }
  console.log('material selector');
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <MaterialSelectorComponent
          objectNumber={props.activeModelIndex}
          materialSelectorToggle={props.materialSelectorToggle}
          pageNumber={props.pageNumber}
          modelMaterial={props.modelMaterial}
          selectedMaterial={props.selectedMaterial}
          selectedModelMaterials={props.selectedModelMaterials}
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
});

export default MaterialSelector;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialSelectorComponent from './MaterialSelectorComponent';
import {IMaterialSelectorParams} from '../../types/story';

interface TemperaturaSelectorProps {
  materialSelectorParams: IMaterialSelectorParams;
}

const TemperaturaSelector = (props: TemperaturaSelectorProps) => {
  const {
    pageNumber,
    activeModelIndex,
    models3d,
    materialSelectorToggle,
    modelMaterial,
    selectedMaterial,
    selectedModelMaterials,
    selectedPageOrder,
  } = props.materialSelectorParams;
  if (
    models3d[pageNumber].length === 0 ||
    models3d[pageNumber].length < activeModelIndex ||
    typeof models3d[pageNumber][activeModelIndex].ARMaterials === 'undefined'
  ) {
    return null;
  }
  console.log('temperatura selector');
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <MaterialSelectorComponent
          objectNumber={activeModelIndex}
          materialSelectorToggle={materialSelectorToggle}
          pageNumber={pageNumber}
          modelMaterial={modelMaterial}
          selectedMaterial={selectedMaterial}
          selectedModelMaterials={selectedModelMaterials}
          selectedPageOrder={selectedPageOrder}
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

export default TemperaturaSelector;

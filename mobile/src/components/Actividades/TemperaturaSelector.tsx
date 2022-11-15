import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ITemperaturaSelectorParams} from '../../types/story';
import TemperaturaSelectorComponent from './TemperaturaSelectorComponent';

interface TemperaturaSelectorProps {
  temperaturaSelectorParams: ITemperaturaSelectorParams;
}

const TemperaturaSelector = (props: TemperaturaSelectorProps) => {
  const {
    pageNumber,
    activeModelIndex,
    models3d,
    temperaturaSelectorToggle,
    modelMaterial,
    selectedMaterial,
    selectedModelMaterials,
    selectedPageOrder,
    temperaturasList,
    toggleValues,
    nPlacedItems,
  } = props.temperaturaSelectorParams;
  if (
    models3d[pageNumber].length === 0 ||
    nPlacedItems[pageNumber] === 0 ||
    models3d[pageNumber].length < activeModelIndex ||
    typeof models3d[pageNumber][activeModelIndex].ARMaterials === 'undefined' ||
    temperaturaSelectorToggle[0] === 0 ||
    toggleValues[pageNumber][0] === 1
  ) {
    return null;
  }
  console.log('temperatura selector');
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <TemperaturaSelectorComponent
          objectNumber={activeModelIndex}
          temperaturaSelectorToggle={temperaturaSelectorToggle}
          pageNumber={pageNumber}
          modelMaterial={modelMaterial}
          selectedMaterial={selectedMaterial}
          selectedModelMaterials={selectedModelMaterials}
          selectedPageOrder={selectedPageOrder}
          temperaturasList={temperaturasList}
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

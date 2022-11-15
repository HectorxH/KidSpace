import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IArmarDesarmarParams} from '../../types/story';
import ArmarDesarmarComponent from './ArmarDesarmarComponent';

interface ArmarDesarmarProps {
  armarDesarmarParams: IArmarDesarmarParams;
}

const ArmarDesarmar = (props: ArmarDesarmarProps) => {
  const {
    pageNumber,
    activeModelIndex,
    models3d,
    armarDesarmarToggle,
    modelMaterial,
    selectedMaterial,
    selectedModelMaterials,
    selectedPageOrder,
    useAlt,
    toggleValues,
  } = props.armarDesarmarParams;
  if (
    models3d[pageNumber].length === 0 ||
    // models3d[pageNumber].length < activeModelIndex ||
    armarDesarmarToggle[0] === 0 ||
    toggleValues[pageNumber][0] === 1
  ) {
    return null;
  }
  console.log('desarmar selector');
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <ArmarDesarmarComponent
          objectNumber={activeModelIndex}
          armarDesarmarToggle={armarDesarmarToggle}
          pageNumber={pageNumber}
          modelMaterial={modelMaterial}
          selectedMaterial={selectedMaterial}
          selectedModelMaterials={selectedModelMaterials}
          selectedPageOrder={selectedPageOrder}
          models3d={models3d}
          activeModelIndex={activeModelIndex}
          useAlt={useAlt}
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

export default ArmarDesarmar;

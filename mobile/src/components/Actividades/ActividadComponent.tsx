import React, {useState, useRef} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

import StoryComponent from './StoryComponent';
import ToggleButton from './ToggleButton';
import ActNavigation from './ActNavigation';
// import MaterialSelector from './MaterialSelector';

import Images from '../../assets/images/images';

import {Actividad} from '../../types/activity';
import {Vec3} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
import {RootStackParamList} from '../../types/navigation';

import DesafioIntroductorioSceneAR from '../ARScenes/DesafioIntroductorioAR';
import Inventario from '../inventario/inventario';
import MaterialSelector from './MaterialSelector';

interface ActividadComponentProps {
  actividades: Actividad;
  nombreActividad: string;
  cantMonedas: number;
  dragAnswers: [string[], ReactStateSetter<string[]>];
  rightDragAnswer: string[];
  pageNumber: [number, ReactStateSetter<number>];
  userAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswers: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  pickedAnswersDropdown: [number[][][], ReactStateSetter<number[][][]>];
  userAnswersQuiz: [number[][], ReactStateSetter<number[][]>];
  pickedAnswersQuiz: [number[][][], ReactStateSetter<number[][][]>];
  modelMaterial: [string[][], ReactStateSetter<string[][]>];
  selectedMaterial: [string[][][], ReactStateSetter<string[][][]>];
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const ActividadComponent = (props: ActividadComponentProps) => {
  const {
    actividades,
    nombreActividad,
    cantMonedas,
    dragAnswers,
    rightDragAnswer,
    userAnswers,
    userAnswersDropdown,
    userAnswersQuiz,
    pickedAnswers,
    pickedAnswersDropdown,
    pickedAnswersQuiz,
    modelMaterial,
  } = props;
  const [pageNumber, setPageNumber] = props.pageNumber;

  const actividad = actividades[pageNumber];
  const [models, setModels] = useState<number[]>([]);
  const [positions, setPositions] = useState<Vec3[]>([]);
  let sceneNav = useRef<ViroARSceneNavigator>(null);

  const useAR = typeof actividad.AR !== 'undefined' ? true : false;

  const models3d =
    typeof actividad.AR !== 'undefined' ? actividad.AR.models : [];

  const toggleButtons =
    typeof actividad.toggleButton !== 'undefined' ? actividad.toggleButton : [];
  const toggleDefaultValue =
    typeof actividad.toggleButton !== 'undefined'
      ? actividad.toggleButton[0].value
      : true;

  const [toggleValues, setToggleValues] = useState<number[]>(
    toggleButtons.map(b => (b.value === true ? 1 : 0)),
  );

  const [materialSelectorToggle, setMaterialSelectorToggle] =
    useState<number>(0);

  const [selectedModelMaterials, setSelectedModelMaterials] = useState<{
    materialOrder: string[];
    materialChoices: string[][];
  }>({materialOrder: [], materialChoices: [[]]});

  const [activeModelIndex, setActiveModelIndex] = useState<number>(0);

  // Vars inventario
  const [placedItems, setPlacedItems] = useState<number[]>(
    models3d.map((_item, index) => (models.includes(index) ? 1 : 0)),
  );
  const [nPlacedItems, setNPlacedItems] = useState<number>(models.length);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={Images.background[actividad.background]}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          {useAR === true && (
            <View style={styles.overlay}>
              <ViroARSceneNavigator
                worldAlignment={'Camera'}
                numberOfTrackedImages={4}
                ref={sceneNav}
                initialScene={{
                  // @ts-ignore
                  scene: DesafioIntroductorioSceneAR,
                }}
                viroAppProps={{
                  items: models3d,
                  models: [...models],
                  actividad: nombreActividad,
                  positions: [positions, setPositions],
                  materialSelectorToggle: [
                    materialSelectorToggle,
                    setMaterialSelectorToggle,
                  ],
                  setSelectedModelMaterials: setSelectedModelMaterials,
                  modelMaterial: modelMaterial[0][pageNumber],
                  setActiveModelIndex: setActiveModelIndex,
                }}
              />
            </View>
          )}
          {(toggleDefaultValue === true || toggleValues[0] === 1) && (
            <View style={styles.overlay}>
              <StoryComponent
                story={actividad}
                pageNumber={pageNumber}
                dragAnswers={dragAnswers}
                userAnswers={userAnswers}
                pickedAnswers={pickedAnswers}
                userAnswersDropdown={userAnswersDropdown}
                pickedAnswersDropdown={pickedAnswersDropdown}
                userAnswersQuiz={userAnswersQuiz}
                pickedAnswersQuiz={pickedAnswersQuiz}
              />
            </View>
          )}
          {useAR === true && (
            <View style={styles.overlay}>
              <Inventario
                items={models3d}
                models={[models, setModels]}
                positions={[positions, setPositions]}
                placedItems={[placedItems, setPlacedItems]}
                nPlacedItems={[nPlacedItems, setNPlacedItems]}
                visible={
                  !(toggleDefaultValue === true || toggleValues[0] === 1) ||
                  toggleDefaultValue === true
                }
                sceneNav={sceneNav}
                showInventory={
                  !(
                    // toggleDefaultValue === true ||
                    (models3d.length === models.length)
                  )
                }
              />
            </View>
          )}
          {(toggleDefaultValue === true ||
            models3d.length === models.length) && (
            <View style={styles.overlay}>
              <ToggleButton
                toggleButtons={toggleButtons}
                toggleQuestions={[toggleValues, setToggleValues]}
              />
            </View>
          )}
          {useAR === true && materialSelectorToggle === 1 && (
            <View style={styles.overlay}>
              <MaterialSelector
                materialSelectorToggle={[
                  materialSelectorToggle,
                  setMaterialSelectorToggle,
                ]}
                pageNumber={pageNumber}
                modelMaterial={props.modelMaterial}
                selectedMaterial={props.selectedMaterial}
                selectedModelMaterials={selectedModelMaterials}
                activeModelIndex={activeModelIndex}
                models3d={models3d}
              />
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.overlay}>
        <ActNavigation
          actividades={actividades}
          cantMonedas={cantMonedas}
          storyLength={actividades.length}
          dragAnswers={dragAnswers}
          rightDragAnswer={rightDragAnswer}
          userAnswers={userAnswers[0]}
          userAnswersDropdown={userAnswersDropdown[0]}
          userAnswersQuiz={userAnswersQuiz[0]}
          models={[models, setModels]}
          placedItems={[placedItems, setPlacedItems]}
          nPlacedItems={[nPlacedItems, setNPlacedItems]}
          positions={[positions, setPositions]}
          pageNumber={[pageNumber, setPageNumber]}
          navigation={props.navigation}
          jumpVisibility={toggleDefaultValue === true || toggleValues[0] === 1}
          toggleValues={[toggleValues, setToggleValues]}
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
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActividadComponent;

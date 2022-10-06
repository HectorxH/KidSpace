import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import Images from '../../assets/images/images';
import {IModels, Vec3} from '../../types/activity';
import {IInventarioParams} from '../../types/story';
import {RSize} from '../../utils/responsive';

interface InventarioProps {
  inventarioParams: IInventarioParams;
  sceneNav: React.RefObject<ViroARSceneNavigator>;
}

const Inventario = (props: InventarioProps) => {
  const {
    pageNumber,
    models3d,
    setMaterialSelectorToggle,
    hideInventory,
    toggleDefaultValue,
    toggleValues,
  } = props.inventarioParams;
  const sceneNav = props.sceneNav;
  const [placedItems, setPlacedItems] = props.inventarioParams.placedItems;
  const [nPlacedItems, setNPlacedItems] = props.inventarioParams.nPlacedItems;
  const [positions, setPositions] = props.inventarioParams.positions;
  const [models, setModels] = props.inventarioParams.models;

  const visible =
    !(
      toggleDefaultValue[pageNumber] === true ||
      toggleValues[pageNumber][0] === 1
    ) || toggleDefaultValue[pageNumber] === true;
  const showInventory =
    models3d[pageNumber].length !== models[pageNumber].length &&
    hideInventory[pageNumber] === false;

  function modelHandler(index: number) {
    updatePosition();
    let newPlacedItems = [...placedItems];
    let newNPlacedItems = [...nPlacedItems];
    let newModels = [...models];

    newPlacedItems[pageNumber][index] = 1;
    newNPlacedItems[pageNumber] = newNPlacedItems[pageNumber] + 1;
    newModels[pageNumber].push(index);

    setPlacedItems(newPlacedItems);
    setNPlacedItems(newNPlacedItems);
    setModels(newModels);
  }

  function handlePickUp() {
    let newPlacedItems = [...placedItems];
    let newNPlacedItems = [...nPlacedItems];
    let newModels = [...models];
    let newPositions = [...positions];

    newPlacedItems[pageNumber] = models3d[pageNumber].map(() => 0);
    newNPlacedItems[pageNumber] = 0;
    newModels[pageNumber] = [];
    newPositions[pageNumber] = [];

    setPlacedItems(newPlacedItems);
    setNPlacedItems(newNPlacedItems);
    setModels(newModels);
    setPositions(newPositions);
    setMaterialSelectorToggle(0);
  }

  function updatePosition() {
    sceneNav.current
      ?._unproject([RSize(1, 'w'), RSize(1, 'h'), 0.05])
      .then(({position}: {position: Vec3}) => {
        let newPositions = [...positions];
        newPositions[pageNumber].push(position);
        setPositions(newPositions);
      })
      .catch(console.log);
    // setPositions([...positions, [0, 0, -1]]);
  }

  if (!visible) {
    return null;
  }
  if (models3d.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickUpContainer}>
        <IconButton
          icon="archive-refresh"
          size={RSize(0.075, 'h')}
          color="white"
          onPress={handlePickUp}
        />
      </View>
      {showInventory && (
        <View style={styles.inventoryBox}>
          <View style={styles.titleBox}>
            <Text style={styles.text}>Inventario</Text>
          </View>
          <SafeAreaView style={styles.itemsBox}>
            <ScrollView fadingEdgeLength={10} persistentScrollbar>
              {models3d[pageNumber].map((item: IModels, index: number) => {
                if (placedItems[pageNumber][index] !== 0) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    onPress={() => modelHandler(index)}
                    style={styles.itemContainer}
                    key={index + 100}>
                    <Image
                      style={styles.iconImage}
                      resizeMode="contain"
                      source={Images.icons[item.model].square}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickUpContainer: {
    flexDirection: 'column-reverse',
    width: '12%',
  },
  container: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  off: {
    flex: 0,
  },
  inventoryBox: {
    width: '12%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: RSize(0.04, 'h'),
    borderBottomLeftRadius: RSize(0.04, 'h'),
    flexDirection: 'column',
  },
  titleBox: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemsBox: {
    flex: 9,
    flexDirection: 'column',
    paddingBottom: RSize(0.04, 'h'),
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical: RSize(0.035, 'h'),
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: '#5C9DEC',
    fontSize: RSize(0.03, 'h'),
  },
  iconImage: {
    width: '80%',
    height: 'auto',
    aspectRatio: 1,
    borderRadius: RSize(0.1, 'h'),
  },
});

export default Inventario;

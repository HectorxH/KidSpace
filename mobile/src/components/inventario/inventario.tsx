import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React, {useState} from 'react';
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
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

interface InventarioProps {
  items: IModels[];
  models: [number[], ReactStateSetter<number[]>];
  visible: boolean;
  showInventory: boolean;
  positions: [Vec3[], ReactStateSetter<Vec3[]>];
  sceneNav: React.RefObject<ViroARSceneNavigator>;
}

const Inventario = (props: InventarioProps) => {
  const items = props.items;
  const [models, setModels] = props.models;
  const [placedItems, setPlacedItems] = useState(
    items.map((_item, index) => (models.includes(index) ? 1 : 0)),
  );
  const [nPlacedItems, setNPlacedItems] = useState(models.length);
  const visible = props.visible;
  const showInventory = props.showInventory;
  const sceneNav = props.sceneNav;
  const [positions, setPositions] = props.positions;

  console.log(models);

  function modelHandler(index: number) {
    updatePosition();
    let aux = [...placedItems];
    aux[index] = 1;
    setPlacedItems(aux);
    setNPlacedItems(nPlacedItems + 1);
    let aux2 = [...models];
    aux2.push(index);
    setModels(aux2);
  }

  function handlePickUp() {
    setPlacedItems(items.map(() => 0));
    setNPlacedItems(0);
    setModels([]);
    setPositions([]);
  }

  function updatePosition() {
    sceneNav.current
      ?._unproject([RSize(1, 'w'), RSize(1, 'h'), 0.05])
      .then(({position}: {position: Vec3}) => {
        setPositions([...positions, position]);
      })
      .catch(console.log);
    // setPositions([...positions, [0, 0, -1]]);
  }
  if (!visible) {
    return null;
  }
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickUpContainer}>
        <IconButton
          icon="archive-refresh"
          size={RSize(0.075, 'h')}
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
              {items.map((item: IModels, index: number) => {
                if (placedItems[index] !== 0) {
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

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Images from '../../assets/images/images';
import {IItem} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';

interface InventarioProps {
  items: IItem[];
  models: [ImageSourcePropType[], ReactStateSetter<ImageSourcePropType[]>];
}

const Inventario = (props: InventarioProps) => {
  const items = props.items;
  const [placedItems, setPlacedItems] = useState(items.map(() => 0));
  const [nPlacedItems, setNPlacedItems] = useState(0);
  const [models, setModels] = props.models;

  function modelHandler(index: any) {
    let aux = [...placedItems];
    aux[index] = 1;
    setPlacedItems(aux);
    setNPlacedItems(nPlacedItems + 1);
    let aux2 = [...models];
    aux2.push(index);
    setModels(aux2);
  }
  return (
    <View style={nPlacedItems !== items.length ? styles.container : styles.off}>
      <View style={styles.screenPad} />
      <View style={styles.inventoryBox}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Inventario</Text>
        </View>
        <View style={styles.itemsBox}>
          <ScrollView>
            {items.map((item: IItem, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => modelHandler(index)}
                  style={styles.itemContainer}
                  key={index + 100}>
                  {placedItems[index] === 0 &&
                  Images.icons[item.model].square !== undefined ? (
                    <Image
                      style={styles.iconImage}
                      resizeMode="contain"
                      source={
                        Images.icons[item.model].square as ImageSourcePropType
                      }
                    />
                  ) : (
                    <View />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  off: {
    flex: 0,
  },
  screenPad: {
    flex: 6,
  },
  inventoryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'column',
  },
  titleBox: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemsBox: {
    flex: 9,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: 'black',
  },
  itemContainer: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    color: '#5C9DEC',
    fontSize: 20,
  },
  iconImage: {
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default Inventario;

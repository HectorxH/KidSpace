import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Images from '../../assets/images/images';
import {IItem} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

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
      <View style={styles.inventoryBox}>
        <View style={styles.titleBox}>
          <Text style={styles.text}>Inventario</Text>
        </View>
        <SafeAreaView style={styles.itemsBox}>
          <ScrollView fadingEdgeLength={10} persistentScrollbar>
            {items.map((item: IItem, index: number) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row-reverse',
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

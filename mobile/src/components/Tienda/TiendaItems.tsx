import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {images} from '../../assets/imgs/handler/images';
import {Button, Card, Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {backgroundImages} from '../../assets/perfil/12background/handler/backgroundImages';
// import {accesoriesImages} from '../../assets/perfil/11accesories/handler/accesoriesImages';
// import {clothesImages} from '../../assets/perfil/10clothes/handler/clothesImages';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {imagesTienda} from '../../assets/tienda/handler/imagesTienda';
import {TiendaItemsProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';
import ItemPreview from './ItemPreview';
import {useAuth} from '../../hooks/useAuth';
import Config from 'react-native-config';

// const {i0: _, ...newAccesoriesImages} = accesoriesImages;

const TiendaItems = ({navigation, route}: TiendaItemsProps) => {
  const {tipo, cantMonedas, compras, setCompras, tipoImages, numImages} =
    route.params;
  const [selectedItem, setSelectedItem] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMonedas, setCurrentMonedas] = useState(cantMonedas);
  const [noDisponibles, setNoDisponibles] = useState(compras);
  const [visible, setVisible] = useState(false);

  const {instance} = useAuth();

  const handleComprarClick = async (costo: number) => {
    currentMonedas - costo >= 0 ? setModalVisible(true) : setVisible(true);
  };

  const handleSave = async (costo: number) => {
    let newCantMonedas = currentMonedas - costo;
    try {
      await instance
        .post(`${Config.REACT_APP_BACKEND_URL}/Estudiante/addMonedas`)
        .send({cantMonedas: -costo});
    } catch (e) {
      console.log(JSON.stringify(e));
      console.log('No fue posible a restar monedas');
    }
    // await AsyncStorage.setItem('@monedas', newCantMonedas.toString());
    setModalVisible(false);
    noDisponibles[numImages][selectedItem] = 1;
    setNoDisponibles(noDisponibles);
    setCompras(noDisponibles);
    setSelectedItem(-1);
    try {
      await instance
        .post(`${Config.REACT_APP_BACKEND_URL}/Estudiante/compras`)
        .send({compras: noDisponibles});
    } catch (e) {
      console.log(JSON.stringify(e));
    }

    route.params.setCantMonedas(newCantMonedas);
    setCurrentMonedas(newCantMonedas);
  };

  const selectCard = (id: number) => {
    if (noDisponibles[numImages][id] === 0) {
      setSelectedItem(id);
    }
  };

  const setOpacity = (costo: number) => {
    if (currentMonedas - costo < 0) {
      return 0.2;
    } else {
      return 1;
    }
  };

  const CompraModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.background}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleModal}>¿Confirmar la compra?</Text>
              <Text style={styles.paragraph}>
                Se descontaran las monedas de tu balance.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={styles.buttonModal}
                  color="#EC87C0"
                  mode="contained"
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textModalButton}>Salir</Text>
                </Button>
                <Button
                  style={styles.buttonModal}
                  color="#A1C96A"
                  mode="contained"
                  onPress={() => handleSave(200)}>
                  <Text style={styles.textModalButton}>Confirmar</Text>
                </Button>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View key={index} style={styles.part}>
        <Card
          style={[
            {borderRadius: 10},
            noDisponibles[numImages][index] === 1
              ? styles.opcionNoDisponible
              : styles.opcionDisponible,
          ]}
          key={index}
          onPress={() => selectCard(index)}>
          <Image
            key={index}
            style={styles.opcion}
            source={tipoImages[item].uri}
          />
          <Precio />
        </Card>
      </View>
    );
  };

  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  return (
    <View style={styles.container}>
      <CompraModal />
      <View
        style={{
          flex: 0.6,
          flexDirection: 'column',
        }}>
        <ImageBackground
          key="background"
          style={{width: '100%', height: '100%'}}
          source={imagesTienda.background.uri}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 8,
              }}>
              <Button
                color="#EC87C0"
                mode="contained"
                onPress={() => {
                  navigation.navigate('Tienda', {
                    setCantMonedas: route.params.setCantMonedas,
                    cantMonedas: currentMonedas,
                  });
                }}>
                {back}
              </Button>
              <Chip
                style={{
                  backgroundColor: '#ededed',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: 18,
                    width: 18,
                  }}
                  source={images.moneda.uri}
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    alignSelf: 'center',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  {currentMonedas}
                </Text>
              </Chip>
            </View>
            <ItemPreview
              selectedItem={selectedItem}
              images={tipoImages}
              tipo={tipo}
            />
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={[
                {
                  padding: '3%',
                  backgroundColor: '#A1C96A',
                  margin: 4,
                  alignSelf: 'center',
                  borderRadius: 10,
                  opacity: setOpacity(200),
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              onPress={() => handleComprarClick(200)}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#ffffff',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 18,
                }}>
                Comprar
              </Text>
              <Image
                style={{
                  resizeMode: 'cover',
                  height: 30,
                  width: 30,
                  marginLeft: 4,
                  alignSelf: 'center',
                }}
                source={images.moneda.uri}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                200
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 2.5 / 4,
          flexDirection: 'column',
          backgroundColor: '#ECECEC',
        }}>
        <View
          style={{
            flex: 1 / 6,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#063D69',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 32,
            }}>
            {tipo}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#ECECEC',
          }}
          onStartShouldSetResponder={() => true}>
          <FlatList
            persistentScrollbar={true}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            data={Object.keys(tipoImages)}
            numColumns={Math.trunc(RSize(0.004, 'w'))}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const Precio = () => (
  <Chip
    style={{
      backgroundColor: '#ededed',
      margin: 10,
      justifyContent: 'center',
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        height: 18,
        width: 18,
      }}
      source={images.moneda.uri}
    />
    <Text
      style={{
        fontFamily: 'Poppins-Bold',
        alignSelf: 'center',
        fontSize: 14,
        textAlign: 'center',
      }}>
      200
    </Text>
  </Chip>
);

const styles = StyleSheet.create({
  part: {
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    margin: 2,
    borderColor: '#B5B5B5',
  },
  partNoSelected: {
    borderColor: '#B5B5B5',
  },
  partSelected: {
    borderColor: '#5C9DEC',
  },
  opcion: {
    width: 82,
    height: 82,
    alignSelf: 'center',
    marginTop: 2,
  },
  opcionDisponible: {
    backgroundColor: 'white',
    opacity: 1,
  },
  opcionNoDisponible: {
    backgroundColor: 'white',
    opacity: 0.2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  paragraph: {
    marginLeft: 0,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  titleModal: {
    marginLeft: 0,
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
  },
  textModalButton: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 10,
    margin: 12,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default TiendaItems;

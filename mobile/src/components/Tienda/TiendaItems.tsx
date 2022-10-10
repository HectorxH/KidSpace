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
// @ts-ignore
import RNTooltips from 'react-native-tooltips';
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
  const target = useRef(null);
  const parent = useRef(null);
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
                marginTop: RSize(0.01, 'w'),
                marginLeft: RSize(0.01, 'h'),
                marginBottom: RSize(0.005, 'w'),
              }}>
              <Button
                color="#EC87C0"
                mode="contained"
                style={{height: RSize(0.045, 'w')}}
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
                  margin: RSize(0.02, 'h'),
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    height: RSize(0.05, 'h'),
                    width: RSize(0.05, 'h'),
                  }}
                  source={images.moneda.uri}
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    alignSelf: 'center',
                    fontSize: RSize(0.04, 'h'),
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
          <View ref={parent}>
            <TouchableOpacity
              style={[
                {
                  paddingVertical: RSize(0.01, 'w'),
                  paddingHorizontal: RSize(0.06, 'h'),
                  backgroundColor: '#A1C96A',
                  margin: RSize(0.01, 'h'),
                  alignSelf: 'center',
                  borderRadius: 10,
                  opacity: setOpacity(200),
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              ]}
              onPress={() => handleComprarClick(200)}
              ref={target}>
              <Text style={styles.textButton}>Comprar</Text>
              <Image
                style={{
                  resizeMode: 'cover',
                  height: RSize(0.05, 'h'),
                  width: RSize(0.05, 'h'),
                  marginLeft: RSize(0.02, 'h'),
                }}
                source={images.moneda.uri}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  alignSelf: 'center',
                  fontSize: RSize(0.04, 'h'),
                  textAlign: 'center',
                }}>
                200
              </Text>
            </TouchableOpacity>
            <RNTooltips
              text="No tienes suficientes monedas =("
              visible={visible}
              target={target.current}
              parent={parent.current}
              onHide={() => setVisible(false)}
              tintColor={'white'}
              textColor={'black'}
            />
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
              fontSize: RSize(1, 'h') / RSize(0.018, 'w'),
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
            style={styles.scrollView}
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
      margin: RSize(0.02, 'h'),
      justifyContent: 'center',
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        height: RSize(0.05, 'h'),
        width: RSize(0.05, 'h'),
      }}
      source={images.moneda.uri}
    />
    <Text
      style={{
        fontFamily: 'Poppins-Bold',
        alignSelf: 'center',
        fontSize: RSize(0.04, 'h'),
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
    margin: RSize(0.005, 'h'),
    borderColor: '#B5B5B5',
  },
  partNoSelected: {
    borderColor: '#B5B5B5',
  },
  partSelected: {
    borderColor: '#5C9DEC',
  },
  opcion: {
    width: RSize(0.2, 'h'),
    height: RSize(0.2, 'h'),
    margin: RSize(0.005, 'w'),
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
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
  },
  viewLeft: {
    flex: 1,
    backgroundColor: '#B878EA',
    paddingLeft: RSize(0.02),
    paddingRight: RSize(0.02),
    paddingTop: RSize(0.01),
    paddingBottom: RSize(0.02),
  },
  viewText: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: RSize(0.02),
    marginRight: RSize(0.02),
  },
  viewButton: {
    alignItems: 'center',
  },
  button: {
    width: RSize(0.18),
    color: '#000000',
    marginTop: RSize(0.02, 'h'),
  },
  title: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.035),
    textAlign: 'left',
  },
  paragraph: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  textButton: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(5, 'h') / RSize(0.12, 'w'),
  },
  chip1: {
    backgroundColor: '#B878EA',
    margin: RSize(0.02, 'h'),
  },
  chip2: {
    backgroundColor: '#ededed',
    margin: RSize(0.02, 'h'),
  },
  textChip1: {
    color: '#ffffff',
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  textChip2: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  titleModal: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.035),
  },
  textModalButton: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: RSize(32, 'h') / RSize(1, 'w'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RSize(0.02, 'h'),
  },
  modalView: {
    margin: RSize(0.1, 'w'),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: RSize(0.03, 'w'),
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
    maxHeight: RSize(0.05, 'w'),
    marginTop: RSize(0.05, 'h'),
    marginRight: RSize(0.02, 'h'),
    marginLeft: RSize(0.02, 'h'),
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default TiendaItems;

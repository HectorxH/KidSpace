import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
  ScrollView,
  Pressable,
  // Animated,
  TouchableOpacity,
} from 'react-native';
import {Button, Badge, Chip} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../assets/imgs/handler/images';
import Pusher from 'pusher-js/react-native';
import {IActivity} from '../types/activity';
import {MainMapProps} from '../types/navigation';
import {RSize} from '../utils/responsive';
import {mapImages} from '../assets/map/handler/images';
import Carreras from '../assets/stories/carreras.json';
import Config from 'react-native-config';
import {useAuth} from '../hooks/useAuth';
import axios from 'axios';
import _ from 'lodash';

const pusher = new Pusher(Config.REACT_APP_PUSHER_KEY, {
  cluster: 'sa1',
});
const channel = pusher.subscribe('channel');

const MainMap = ({navigation}: MainMapProps) => {
  let allMessages: IActivity[] = [];
  const [message, setMessage] = useState<IActivity[]>([]);
  const [notification, setNotification] = useState('0');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadCarrera, setUnidadCarrera] = useState('');
  const [user, setUser] = useState('');
  const [cantMonedas, setCantMonedas] = useState(0);
  const [completadas, setCompletadas] = useState('[]');

  const userData = useAuth().user;

  const loadNotification = () => {
    let visible = false;
    if (notification !== '0' && notification !== null) {
      visible = true;
    }
    return (
      <View>
        {visible && (
          <Badge visible={visible} style={styles.badge}>
            {parseInt(notification!, 10)}
          </Badge>
        )}
      </View>
    );
  };

  const initialLoader = async () => {
    try {
      let jsonAllMessages = await AsyncStorage.getItem('@message');
      //check if value previously stored
      allMessages = jsonAllMessages != null ? JSON.parse(jsonAllMessages) : [];
      allMessages = _.uniqWith(allMessages, _.isEqual);
      setMessage(allMessages);
      if (userData) {
        setUser(userData?.nombres);
      } else {
        navigation.navigate('InicioView');
      }
      setNotification(allMessages.length.toString());
      const m = await AsyncStorage.getItem('@monedas');
      m != null ? setCantMonedas(parseInt(m!, 10)) : setCantMonedas(0);
      const c = await AsyncStorage.getItem('@completadas');
      c != null ? setCompletadas(c) : setCompletadas('[]');
    } catch (e) {
      console.log('A');
      console.log(e);
    }
  };

  const loadMessage = async () => {
    try {
      channel.bind('message', async function (data: {message: IActivity}) {
        let jsonAllMessages = await AsyncStorage.getItem('@message');
        //check if value previously stored
        allMessages =
          jsonAllMessages != null ? JSON.parse(jsonAllMessages) : [];
        allMessages.push(data.message);
        allMessages = _.uniqWith(allMessages, _.isEqual);
        jsonAllMessages = JSON.stringify(allMessages);
        await AsyncStorage.setItem('@message', jsonAllMessages);
        const m = await AsyncStorage.getItem('@message');
        setMessage(JSON.parse(m!));
        await AsyncStorage.setItem(
          '@notification',
          allMessages.length.toString(),
        );
        let n = await AsyncStorage.getItem('@notification');
        setNotification(n!);
      });
    } catch (e) {
      console.log('B');
      console.log(e);
    }
  };

  const handleTapUnidad = (event: any) => {
    setModalVisible(true);
    setTitle(event.carrera.title);
    setDesc(event.carrera.desc);
    setUnidadCarrera(event.carrera);
  };

  useEffect(() => {
    initialLoader();
    loadMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleAct = async () => {
    try {
      //const jsonMessages = await AsyncStorage.getItem('@message');
      //const messages = JSON.parse(jsonMessages!);
      //const visible = await AsyncStorage.getItem('@visible');
      notification !== '0' && notification !== null
        ? navigation.push('AvailableActivities', {activities: message})
        : navigation.push('NoAvailableActivities');
    } catch (e) {
      console.log(e);
    }
  };

  const HandleCarrera = (event: any) => {
    navigation.push('Carrera', {
      carrera: event.unidadCarrera,
      completadas: completadas,
    });
    setModalVisible(false);
  };

  // const animated = new Animated.Value(0);
  // const Animacion = () => {
  //   Animated.loop(
  //     Animated.timing(animatedValue, {
  //       toValue: -100,
  //       duration: 3000,
  //     }),
  //   ).start();
  // };

  const {logout} = useAuth();
  const testLogout = async () => {
    await axios.delete(`${Config.REACT_APP_BACKEND_URL}/logout`);
    await logout();
    console.log('!!!');
    AsyncStorage.clear();
    navigation.navigate('InicioView');
  };

  return (
    <View style={styles.topView}>
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
              <Text style={styles.titleModal}>{title}</Text>
              <Text style={styles.paragraph}>{desc}</Text>
              <View>
                <Button
                  style={styles.buttonModal}
                  color="#FF8A01"
                  mode="contained"
                  onPress={() => HandleCarrera({unidadCarrera})}>
                  <Text style={styles.textModalButton}>Acceder</Text>
                </Button>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <ImageBackground
        style={styles.background}
        source={mapImages.solo_cielo.uri}>
        <ImageBackground
          style={styles.background}
          source={mapImages.edificios.uri}>
          <View style={styles.view}>
            <Chip style={styles.nameChip}>
              <Text style={styles.title}> ¡Hola, {user}!</Text>
            </Chip>
            <Chip style={styles.monedaChip}>
              <Image style={styles.icon} source={images.moneda.uri} />
              <Text style={styles.monedaText}> {cantMonedas}</Text>
            </Chip>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{flexGrow: 1}}
            style={{flex: 1}}>
            <ImageBackground
              resizeMode="cover"
              style={{
                flex: 1,
              }}
              source={mapImages.ruta.uri}>
              <View style={{flexDirection: 'row'}}>
                {Carreras.map((carrera, id) => (
                  <View style={{flex: 1}} key={id}>
                    {/* <Animated.View
                        style={{
                          marginLeft: 5,
                          marginRight: 5,
                          backgroundColor: 'blue',
                          width: 100,
                        }}
                      /> */}
                    <View
                      style={{
                        marginLeft: RSize(carrera.marginLeft, 'w'),
                        marginTop: RSize(carrera.marginTop, 'h'),
                      }}>
                      <TouchableOpacity
                        key={id}
                        style={{borderRadius: 99}}
                        onPress={() => handleTapUnidad({carrera})}>
                        <Image
                          key={id}
                          style={{
                            position: 'relative',
                            width: 150,
                            height: 150,
                            overflow: 'hidden',
                          }}
                          source={mapImages[`${carrera.img}`].uri}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ImageBackground>
          </ScrollView>
          <View style={styles.containerButtons}>
            <Button
              style={styles.button}
              color="#EC87C0"
              mode="contained"
              icon={() => (
                <Icon
                  name="account"
                  size={RSize(0.11, 'h')}
                  color="#FFFFFF"
                  style={{
                    width: RSize(0.15, 'h'),
                    height: RSize(0.1, 'h'),
                  }}
                />
              )}
              contentStyle={{flexDirection: 'column'}}
              onPress={testLogout}>
              <Text style={styles.subtitle}>Perfil</Text>
            </Button>
            <Button
              style={styles.button}
              color="#A0C96A"
              mode="contained"
              icon={() => (
                <Icon
                  name="store"
                  size={RSize(0.11, 'h')}
                  color="#FFFFFF"
                  style={{
                    width: RSize(0.15, 'h'),
                    height: RSize(0.1, 'h'),
                  }}
                />
              )}
              contentStyle={{flexDirection: 'column'}}
              onPress={() =>
                navigation.push('Tienda', {
                  setCantMonedas: setCantMonedas,
                  cantMonedas: cantMonedas,
                })
              }>
              <Text style={styles.subtitle}>Tienda</Text>
            </Button>
            <View style={styles.rightButtonView}>
              {loadNotification()}
              <Button
                style={styles.button3}
                compact={true}
                color="#F2C045"
                mode="contained"
                icon={() => (
                  <Icon
                    name="target"
                    size={RSize(0.11, 'h')}
                    color="#FFFFFF"
                    style={{
                      width: RSize(0.15, 'h'),
                      height: RSize(0.1, 'h'),
                    }}
                  />
                )}
                contentStyle={{flexDirection: 'column'}}
                onPress={HandleAct}>
                <Text style={styles.subtitle}>Actividades</Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
  },
  titleModal: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.035),
  },
  paragraph: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.019),
    textAlign: 'center',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  textModalButton: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: RSize(0.02),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RSize(0.02, 'h'),
  },
  modalView: {
    margin: RSize(0.15, 'w'),
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
    marginTop: RSize(0.05, 'h'),
    height: RSize(0.1, 'h'),
    width: RSize(0.38, 'h'),
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  topView: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  containerButtons: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    height: RSize(0.2, 'h'),
    width: RSize(0.27, 'h'),
    marginLeft: RSize(0.02, 'h'),
  },
  button3: {
    height: RSize(0.2, 'h'),
    width: RSize(0.42, 'h'),
    position: 'absolute',
    right: RSize(0.01, 'h'),
    justifyContent: 'center',
    elevation: 4,
  },
  view: {
    flex: 0.19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameChip: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    margin: RSize(0.02, 'h'),
  },
  monedaChip: {
    backgroundColor: '#ededed',
    margin: RSize(0.02, 'h'),
    justifyContent: 'center',
  },
  monedaText: {
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
    fontSize: RSize(0.04, 'h'),
    textAlign: 'center',
    color: '#000000',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.05, 'h'),
    textAlign: 'center',
    color: '#000000',
  },
  subtitle: {
    marginLeft: 10,
    fontSize: RSize(0.04, 'h'),
    textAlign: 'center',
    color: '#ffffff',
  },
  cards: {
    margin: 10,
    backgroundColor: '#5C9DEC',
  },
  card: {
    margin: 10,
    backgroundColor: '#F1F3F8',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    elevation: 5,
  },
  rightButtonView: {
    flex: 1,
    height: RSize(0.2, 'h'),
    width: RSize(0.45, 'h'),
    position: 'absolute',
    right: RSize(0.01, 'h'),
  },
  icon: {
    resizeMode: 'cover',
    height: RSize(0.05, 'h'),
    width: RSize(0.05, 'h'),
  },
});

export default MainMap;

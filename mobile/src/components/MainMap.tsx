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
  Animated,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Button, Badge, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pusher from 'pusher-js/react-native';
import {IActivity} from '../types/activity';
import {MainMapProps} from '../types/navigation';
import {RSize} from '../utils/responsive';
import {images} from '../assets/map/handler/images';
import Carreras from '../assets/stories/carreras.json';

const User = {
  key: 1,
  name: 'Renata',
};

const pusher = new Pusher('74009350c3b99530d9e9', {
  cluster: 'sa1',
});
const channel = pusher.subscribe('channel');

const MainMap = ({navigation}: MainMapProps) => {
  const [message, setMessage] = useState<IActivity[]>([]);
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadCarrera, setUnidadCarrera] = useState('');
  const handleTapUnidad = (event: any) => {
    setModalVisible(true);
    setTitle(event.carrera.title);
    setDesc(event.carrera.desc);
    setUnidadCarrera(event.carrera);
  };
  const allMessages: IActivity[] = [];
  useEffect(() => {
    channel.bind('message', function (data: {message: IActivity}) {
      allMessages.push(data.message);
      setMessage(allMessages);
      setNotification(allMessages.length);
      setVisible(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleAct = () => {
    if (visible === true) {
      navigation.push('AvailableActivities', {activities: message.slice(0, 3)});
    } else {
      navigation.push('NoAvailableActivities');
    }
  };

  const HandleCarrera = (event: any) => {
    navigation.push('Carrera', {
      carrera: event.unidadCarrera,
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
      <ImageBackground style={styles.background} source={images.solo_cielo.uri}>
        <ImageBackground
          style={styles.background}
          source={images.edificios.uri}>
          <View style={styles.view}>
            <Chip style={styles.chip}>
              <Text style={styles.title}> ¡Hola, {User.name}!</Text>
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
              source={images.ruta.uri}>
              <View style={{flexDirection: 'row'}}>
                {Carreras.map((carrera, id) => (
                  <>
                    <View key={id} style={{flex: 1}}>
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
                            style={{
                              position: 'relative',
                              width: 150,
                              height: 150,
                              overflow: 'hidden',
                            }}
                            source={images[`${carrera.img}`].uri}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
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
              onPress={() =>
                navigation.push('CuentoIntroductorio', {
                  actividad: 'diagramas',
                  // tipo: 'introductory',
                  // tipo: 'interactive',
                })
              }>
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
                navigation.push('Conclusion', {
                  actividad: 'diagramas',
                  tipo: 'interactive',
                })
              }>
              <Text style={styles.subtitle}>Tienda</Text>
            </Button>
            <View style={styles.rightButtonView}>
              <Badge visible={visible} style={styles.badge}>
                {notification}
              </Badge>
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
  },
  chip: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    margin: RSize(0.02, 'h'),
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
});

export default MainMap;

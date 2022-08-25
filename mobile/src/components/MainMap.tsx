import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import {Button, Badge, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pusher from 'pusher-js/react-native';
import {IActivity} from '../types/activity';
import {MainMapProps} from '../types/navigation';
import {RSize} from '../utils/responsive';
import {images} from '../assets/map/handler/images';

const User = {
  key: 1,
  name: 'Renata',
};

const Carreras = [
  {
    id: 1,
    img: 'informatica',
    title: 'Carrera: Informática',
    desc: 'La carrera de informática se enfoca en desarrollar aplicaciones y sistemas de información. Aventurate en el fascinante mundo de computación y tecnología.',
    desc2:
      'La carrera de informática se enfoca en desarrollar aplicaciones y sistemas de información. Conoce las historias de X e Y - personas apasionadas por su profesión.\n\n¡Completa cada historia para ganar las medallas y monedas!',
    marginTop: 0.2,
    marginLeft: 0.05,
    stories: [
      {
        carrera: 'Carrera: Informática',
        img: 'placeholder',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
      {
        carrera: 'Carrera: Informática',
        img: 'placeholder',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
    ],
  },
  {
    id: 2,
    img: 'diseno',
    title: 'Carrera: Diseño',
    desc: 'La carrera del diseño abre las puertas a la expresión creativa, permitiendo plasmar distintas ideas, mensajes y emociones a través de la imagen y sonido.',
    marginTop: 0.01,
    marginLeft: 0.15,
    stories: [
      {
        carrera: 'Carrera: Informática',
        img: 'informatica',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
      {
        carrera: 'Carrera: Informática',
        img: 'informatica',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
    ],
  },
  {
    id: 3,
    title: 'Carrera: Nutición',
    img: 'nutricion',
    desc: '¿Has escuchado la frase “eres lo que comes”? Los alimentos ingeirdos afectan a nuestro sistema, y la carrera de nutrición se encarga de estudiar estos efectos.',
    marginTop: 0,
    marginLeft: 0.2,
    stories: [
      {
        carrera: 'Carrera: Nutición',
        img: 'nutricion',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
      {
        carrera: 'Carrera: Nutición',
        img: 'nutricion',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
    ],
  },
  {
    id: 4,
    img: 'mineria',
    title: 'Carrera: Minería',
    desc: 'La tierra esconde muchos tesoros en su interior, como distintos metales y minerales. Aprenda sobre la carrera de minería que trata de extraer estos tesoros del suelo.',
    marginTop: 0.09,
    marginLeft: 0.1,
    stories: [
      {
        carrera: 'Carrera: Informática',
        img: 'informatica',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
      {
        carrera: 'Carrera: Informática',
        img: 'informatica',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
    ],
  },
  {
    id: 5,
    img: 'astronomia',
    title: 'Carrera: Astronomía',
    desc: 'Astronomía es una carrera que se enfoca en el estudio de los cuerpos celestes: las estrellas, los planetas, meteoritos, galaxias y toda la materia interestelar.',
    marginTop: 0,
    marginLeft: 0.15,
    stories: [
      {
        carrera: 'Carrera: Informática',
        img: 'informatica',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
      {
        carrera: 'Carrera: Informática',
        img: 'informatica',
        title: 'Historia de X',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        coins: 200,
      },
    ],
  },
];

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
  const [carrera, setCarrera] = useState('');
  const handleTapUnidad = (event: any) => {
    setModalVisible(!modalVisible);
    setTitle(event.carrera.title);
    setDesc(event.carrera.desc);
    setCarrera(event.carrera);
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

  return (
    <View style={styles.topView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
                  onPress={() =>
                    navigation.push('Carrera', {
                      carrera: carrera,
                    })
                  }>
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
                {Carreras.map(carrera => (
                  <>
                    <View style={{flex: 1}}>
                      <TouchableWithoutFeedback
                        onPress={() => handleTapUnidad({carrera})}>
                        <Image
                          style={{
                            position: 'relative',
                            width: 150,
                            height: 150,
                            resizeMode: 'contain',
                            marginLeft: RSize(carrera.marginLeft, 'w'),
                            marginTop: RSize(carrera.marginTop, 'h'),
                          }}
                          source={images[`${carrera.img}`].uri}
                        />
                      </TouchableWithoutFeedback>
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

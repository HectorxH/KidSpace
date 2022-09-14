import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Badge, Chip} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../assets/imgs/handler/images';
import Pusher from 'pusher-js/react-native';
import {IActivity} from '../types/activity';
import {MainMapProps} from '../types/navigation';
import {RSize} from '../utils/responsive';

const User = {
  key: 1,
  name: 'Renata',
};

const pusher = new Pusher('74009350c3b99530d9e9', {
  cluster: 'sa1',
});
const channel = pusher.subscribe('channel');

const MainMap = ({navigation}: MainMapProps) => {
  let allMessages: IActivity[] = [];
  const [message, setMessage] = useState<IActivity[]>([]);
  const [notification, setNotification] = useState('0');
  const [cantMonedas, setCantMonedas] = useState(0);

  const loadNotification = () => {
    let visible = false;
    if (notification !== '0') {
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
      jsonAllMessages != null
        ? (allMessages = JSON.parse(jsonAllMessages))
        : [];
      setMessage(JSON.parse(jsonAllMessages!));
      const n = await AsyncStorage.getItem('@notification');
      setNotification(n!);
      const m = await AsyncStorage.getItem('@monedas');
      setCantMonedas(parseInt(m!, 10));
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
        jsonAllMessages != null
          ? (allMessages = JSON.parse(jsonAllMessages))
          : [];
        allMessages.push(data.message);
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

  useEffect(() => {
    initialLoader();
    loadMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleAct = async () => {
    try {
      notification !== '0'
        ? navigation.push('AvailableActivities', {activities: message})
        : navigation.push('NoAvailableActivities');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.topView}>
      <View style={styles.view}>
        <Chip style={styles.nameChip}>
          <Text style={styles.title}> ¡Hola, {User.name}!</Text>
        </Chip>
        <Chip style={styles.monedaChip}>
          <Image style={styles.icon} source={images.moneda.uri} />
          <Text style={styles.monedaText}>{cantMonedas}</Text>
        </Chip>
      </View>
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
            navigation.navigate('Actividades', {
              // actividad: 'diagramas',
              // actividad: 'diseños',
              // actividad: 'nutricion1',
              actividad: 'diseño1',
              // actividad: 'nutricion2',
              // actividad: 'diseño2',
              // actividad: 'debug',
              cantMonedas: 200,
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
            navigation.navigate('Actividades', {
              actividad: 'debug',
              cantMonedas: 200,
              // actividad: 'diseños',
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
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: RSize(0.03, 'h'),
  },
  containerButtons: {
    flex: 1,
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
  nameChip: {
    backgroundColor: '#F1F3F8',
  },
  monedaChip: {
    backgroundColor: '#F1F3F8',
  },
  monedaText: {
    color: 'black',
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

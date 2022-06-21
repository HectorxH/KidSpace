import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Badge, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pusher from 'pusher-js/react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;

const User = {
  key: 1,
  name: 'Renata',
};

const pusher = new Pusher('74009350c3b99530d9e9', {
  cluster: 'sa1',
});
const channel = pusher.subscribe('channel');

const MainMap = ({navigation}: {navigation: any}) => {
  const [message, setMessage] = useState({});
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(0);
  const allMessages = [];
  useEffect(() => {
    channel.bind('message', function (data: any) {
      allMessages.push(data.message);
      setMessage(allMessages);
      setNotification(allMessages.length);
      setVisible(true);
    });
  }, []);
  const HandleAct = () => {
    if (visible === true) {
      navigation.push('AvailableActivities', {message});
    } else {
      navigation.push('NoAvailableActivities');
    }
  };
  return (
    <View style={styles.topView}>
      <View style={styles.view}>
        <Chip style={styles.chip}>
          <Text style={styles.title}> ¡Hola, {User.name}!</Text>
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
              size={Math.round(windowWidth * 0.11)}
              color="#FFFFFF"
              style={{
                width: Math.round(windowWidth * 0.15),
                height: Math.round(windowHeight * 0.1),
              }}
            />
          )}
          contentStyle={{flexDirection: 'column'}}
          onPress={() => console.log('Pressed')}>
          <Text style={styles.subtitle}>Perfil</Text>
        </Button>
        <Button
          style={styles.button}
          color="#A0C96A"
          mode="contained"
          icon={() => (
            <Icon
              name="store"
              size={Math.round(windowWidth * 0.11)}
              color="#FFFFFF"
              style={{
                width: Math.round(windowWidth * 0.15),
                height: Math.round(windowHeight * 0.1),
              }}
            />
          )}
          contentStyle={{flexDirection: 'column'}}
          onPress={() => console.log('Pressed')}>
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
                size={Math.round(windowWidth * 0.11)}
                color="#FFFFFF"
                style={{
                  width: Math.round(windowWidth * 0.15),
                  height: Math.round(windowHeight * 0.1),
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
    margin: Math.round(windowWidth * 0.03),
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    height: Math.round(windowHeight * 0.2),
    width: Math.round(windowWidth * 0.27),
    marginLeft: Math.round(windowWidth * 0.02),
  },
  button3: {
    height: Math.round(windowHeight * 0.2),
    width: Math.round(windowWidth * 0.42),
    position: 'absolute',
    right: Math.round(windowWidth * 0.01),
    justifyContent: 'center',
    elevation: 4,
  },
  chip: {
    backgroundColor: '#F1F3F8',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Math.round(windowWidth * 0.05),
    textAlign: 'center',
    color: '#000000',
  },
  subtitle: {
    marginLeft: 10,
    fontSize: Math.round(windowWidth * 0.04),
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
    height: Math.round(windowHeight * 0.2),
    width: Math.round(windowWidth * 0.45),
    position: 'absolute',
    right: Math.round(windowWidth * 0.01),
  },
});

export default MainMap;

import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Button, Badge, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pusher from 'pusher-js/react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  ScaledSheet,
} from 'react-native-size-matters';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;

const User = {
  key: 1,
  name: 'Renata',
};

const pusher = new Pusher('942f26b33dcea4510931', {
  cluster: 'us2',
});
const channel = pusher.subscribe('channel');

const MainMap = ({navigation}: {navigation: any}) => {
  const [message, setMessage] = useState({items: []});
  const [visible, setVisible] = useState(true);
  const [notification, setNotification] = useState(0);
  useEffect(() => {
    channel.bind('message', function (data: any) {
      setMessage(data.message);
      setNotification(data.message.length);
      setVisible(true);
    });
  }, []);
  const HandleAct = () => {
    if (visible === true) {
      navigation.push('AvailableActivities', {message});
      console.log(message);
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
              size={moderateScale(35)}
              color="#FFFFFF"
              style={{width: scale(50), height: verticalScale(35)}}
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
              size={moderateScale(35)}
              color="#FFFFFF"
              style={{width: scale(50), height: verticalScale(35)}}
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
                size={moderateScale(30)}
                color="#FFFFFF"
                style={{width: scale(45), height: verticalScale(32)}}
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

const styles = ScaledSheet.create({
  topView: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    margin: 10,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    height: '60@vs',
    width: '90@s',
    marginLeft: '10@s',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  button3: {
    height: '70@vs',
    width: '100@s',
    position: 'absolute',
    right: '5@s',
    justifyContent: 'center',
    elevation: 3,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  chip: {
    backgroundColor: '#F1F3F8',
    height: '50@vs',
    borderRadius: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: '20@msr',
    textAlign: 'center',
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: '11@msr',
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
    top: '0@vs',
    left: '-70@s',
    elevation: 7,
  },
  rightButtonView: {
    flex: 1,
    height: '60@vs',
    width: '40@s',
    position: 'absolute',
    right: '10@vs',
  },
});

export default MainMap;

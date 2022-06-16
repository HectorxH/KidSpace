import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {
  Button,
  Card,
  Badge,
  Chip,
  TextInput,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowHeight = Dimensions.get('window').height;

const User = {
  key: 1,
  name: 'Renata',
  activities: 3,
};

const MainMap = () => {
  const act = <Icon name="target" size={40} color="#FFFFFF" />;
  const person = <Icon name="account" size={40} color="#FFFFFF" />;
  const store = <Icon name="store" size={40} color="#FFFFFF" />;

  const [visible, setVisible] = React.useState<boolean>(false);
  const {
    colors: {background},
  } = useTheme();

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
          onPress={() => console.log('Pressed')}>
          <Text style={styles.subtitle}>{person} Perfil</Text>
        </Button>
        <Button
          style={styles.button}
          color="#A0C96A"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          <Text style={styles.subtitle}>{store} Tienda</Text>
        </Button>
        <Button
          style={styles.button3}
          compact={true}
          color="#F2C045"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          <Badge visible={visible} style={styles.badge}>
            {User.activities} </Badge>
          <Text  style={styles.subtitle}> {act} Actividades </Text>
        </Button>
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
    margin: 10,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  button: {
    height: 70,
    width: 150,
    marginLeft: windowHeight / 30,
    marginRight: 3,
    justifyContent: 'center',
  },
  button3: {
    height: 70,
    width: 180,
    marginLeft: 3,
    marginRight: 3,
    position: 'absolute',
    right: windowHeight / 30,
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: '#F1F3F8',
    height: 40,
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  subtitle: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 15,
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
  img: {
    width: 200,
    height: 200,
  },
  badge: {
    padding: 2,
    bottom: 0,
    right: 0,
  },
});

export default MainMap;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Actitity = () => {
  const act = {
    key: 1,
    title: 'Actividad: Diagramas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra erat lorem, eu ullamcorper tellus maximus non. In eget nulla eu massa posuere tempor sit amet vulputate ex. Nullam eget sem aliquam, ultricies arcu ut, pharetra purus. Mauris ullamcorper suscipit velit in malesuada. Nam suscipit pretium condimentum. Quisque porta leo ut lacus pulvinar aliquam.',
    img_url: 'https://i.imgur.com/DNVoI8c.jpg',
  };
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;

  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        <View style={styles.view}>
          <Button color="#EC87C0" mode="contained">
            {back}
          </Button>
        </View>
        <Card style={styles.card}>
          <Card.Cover
            source={{
              uri: act.img_url,
            }}
            style={{flexDirection: 'column', height: 250}}
          />
        </Card>
      </View>
      <View style={styles.viewText}>
        <Text style={styles.title}>{act.title}:</Text>
        <Text style={styles.paragraph}>{act.description}</Text>
        <View style={styles.viewButton}>
          <Button
            style={styles.button}
            icon={() => <Icon name="star" size={20} color="#FFEA02" />}
            color="#FF8A01"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            <Text style={styles.subtitle}>¡Iniciar!</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'row',
    margin: 10,
  },
  viewLeft: {
    flex: 1.5,
    backgroundColor: '#F2C045',
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewText: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  viewButton: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    color: '#000000',
    marginTop: 5,
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  paragraph: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 15,
  },
});

export default Actitity;

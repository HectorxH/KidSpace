import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NoAvailableActivities = () => {
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;

  return (
    <View>
      <View style={styles.view}>
        <Button color="#EC87C0" mode="contained">{back}</Button>
        <Text style={styles.title}>Tus Actividades:</Text>
      </View>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>
              Oops... No tienes nuevas actividades.
            </Text>
            <Text style={styles.subtitle}>
              Cuando tu profesor o profesora active alguna actividad, esta
              aparecerá aquí :)
            </Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://i.imgur.com/lMHQpo1.png',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flexDirection: 'row',
    margin: 10,
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 20,
    textAlign: 'center',
  },
  card: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#F1F3F8',
  },
  img: {
    width: 200,
    height: 200,
  },
});

export default NoAvailableActivities;

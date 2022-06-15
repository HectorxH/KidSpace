import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Card} from 'react-native-paper';

const NoAvailableActivities = () => {
  return (
    <View>
      <View style={styles.view}>
        <Button icon="arrow-left-circle" color="#EC87C0" mode="contained" />
        <Text style={styles.title}>Tus Actividades:</Text>
      </View>
      <View>
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
});

export default NoAvailableActivities;

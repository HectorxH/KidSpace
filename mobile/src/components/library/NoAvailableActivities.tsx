import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../android/app/src/main/assets/imgs/handler/images';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').height;

const NoAvailableActivities = ({navigation}: {navigation: any}) => {
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;

  return (
    <View>
      <View style={styles.view}>
        <Button
          color="#EC87C0"
          mode="contained"
          onPress={() => navigation.goBack()}>
          {back}
        </Button>
        <Text style={styles.title}> Tus Actividades:</Text>
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
        <Image style={styles.img} source={images.actNoDisponible.uri} />
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
    margin: Math.round(windowWidth * 0.03),
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    marginLeft: Math.round(windowWidth * 0.01),
    fontFamily: 'Poppins-Bold',
    fontSize: Math.round(windowWidth * 0.06),
    textAlign: 'center',
  },
  subtitle: {
    marginLeft: Math.round(windowWidth * 0.01),
    fontFamily: 'Poppins-Regular',
    fontSize: Math.round(windowWidth * 0.04),
    textAlign: 'center',
  },
  card: {
    marginLeft: Math.round(windowWidth * 0.1),
    marginRight: Math.round(windowWidth * 0.1),
    backgroundColor: '#F1F3F8',
  },
  img: {
    width: 200,
    height: 200,
  },
});

export default NoAvailableActivities;

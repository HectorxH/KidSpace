import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../assets/imgs/handler/images';
import {RSize} from '../../utils/responsive';

const NoAvailableActivities = ({navigation}: {navigation: any}) => {
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;

  return (
    <View>
      <View style={styles.view}>
        <Button
          color="#EC87C0"
          style={{borderRadius: RSize(0.01, 'w')}}
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
    margin: RSize(0.03, 'h'),
  },
  content: {
    justifyContent: 'center',
  },
  title: {
    marginLeft: RSize(0.01, 'h'),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.06, 'h'),
    textAlign: 'center',
  },
  subtitle: {
    marginLeft: RSize(0.01, 'h'),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.04, 'h'),
    textAlign: 'center',
  },
  card: {
    marginLeft: RSize(0.1, 'h'),
    marginRight: RSize(0.1, 'h'),
    backgroundColor: '#F1F3F8',
  },
  img: {
    width: RSize(0.25, 'w'),
    height: RSize(0.4, 'h'),
  },
});

export default NoAvailableActivities;

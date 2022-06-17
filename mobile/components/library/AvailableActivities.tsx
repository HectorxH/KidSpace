import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import ActivityCard from './ActivityCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Activities: {key: number; title: string; description: string}[] = [
  {
    key: 1,
    title: 'Actividad: Diagramas',
    description: 'example description 1',
    img: 'https://i.imgur.com/DNVoI8c.jpg',
  },
  {
    key: 2,
    title: 'Activida: Reciclaje',
    description: 'example description 2',
    img: 'https://i.imgur.com/B5GxCOe.jpg',
  },
  {
    key: 3,
    title: 'Actividad: Materiales',
    description: 'example description 3',
    img: 'https://i.imgur.com/kDNmFt7.png',
  },
];

const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;

const AvailableActivities = ({navigation}) => {
  return (
    <View>
      <View style={styles.view}>
        <Button
          color="#EC87C0"
          mode="contained"
          onPress={() => navigation.push('MainMap')}>
          {back}
        </Button>
        <Text style={styles.title}>Tus Actividades:</Text>
      </View>
      <View style={styles.cards}>
        <>
          {Activities.map(activity => (
              <ActivityCard key={activity.key} act={activity} /> 
          ))}
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    margin: 10,
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  cards: {
    flexDirection: 'row',
    margin: 5,
  },
});

export default AvailableActivities;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import ActivityCard from './ActivityCard';

const Activities: {key: number; title: string; description: string}[] = [
  {
    key: 1,
    title: 'Actividad: Diagramas',
    description: 'example description 1',
  },
  {
    key: 2,
    title: 'Activida: Reciclaje',
    description: 'example description 2',
  },
  {
    key: 3,
    title: 'Actividad: Materiales',
    description: 'example description 3',
  },
];

const AvailableActivities = () => {
  return (
    <View>
      <View style={styles.view}>
        <Button icon="arrow-left-circle" color="#EC87C0" mode="contained" />
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

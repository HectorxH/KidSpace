import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import ActivityCard from './ActivityCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AvailableActivitiesProps} from '../../types/navigation';

const windowWidth = Dimensions.get('window').height;

const AvailableActivities = ({navigation, route}: AvailableActivitiesProps) => {
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  const activities = route.params.activities;
  console.log(activities);
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
      <View style={styles.cards}>
        <>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              quantity={activities.length}
              navigation={navigation}
            />
          ))}
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    margin: Math.round(windowWidth * 0.03),
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: Math.round(windowWidth * 0.06),
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    flex: 0,
  },
});

export default AvailableActivities;

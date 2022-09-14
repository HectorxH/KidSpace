import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import ActivityCard from './ActivityCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AvailableActivitiesProps} from '../../types/navigation';

const windowHeight = Dimensions.get('window').height;

const AvailableActivities = ({navigation, route}: AvailableActivitiesProps) => {
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  const activities = route.params.activities;
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
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollContent}>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    margin: Math.round(windowHeight * 0.03),
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: Math.round(windowHeight * 0.06),
  },
  cards: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default AvailableActivities;

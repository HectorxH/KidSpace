import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import ActivityCard from './ActivityCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Activities: {
  key: number;
  title: string;
  description: string;
  img: string;
}[] = [
  {
    key: 1,
    title: 'Actividad: Diagramas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra erat lorem, eu ullamcorper tellus maximus non. In eget nulla eu massa posuere tempor sit amet vulputate ex. Nullam eget sem aliquam, ultricies arcu ut, pharetra purus. Mauris ullamcorper suscipit velit in malesuada. Nam suscipit pretium condimentum. Quisque porta leo ut lacus pulvinar aliquam.',
    img: 'https://i.imgur.com/DNVoI8c.jpg',
  },
  {
    key: 2,
    title: 'Actividad: Reciclaje',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra erat lorem, eu ullamcorper tellus maximus non. In eget nulla eu massa posuere tempor sit amet vulputate ex. Nullam eget sem aliquam, ultricies arcu ut, pharetra purus. Mauris ullamcorper suscipit velit in malesuada. Nam suscipit pretium condimentum. ',
    img: 'https://i.imgur.com/B5GxCOe.jpg',
  },
  {
    key: 3,
    title: 'Actividad: Materiales',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra erat lorem, eu ullamcorper tellus maximus non. In eget nulla eu massa posuere tempor sit amet vulputate ex. Nullam eget sem aliquam, ultricies arcu ut, pharetra purus. Mauris ullamcorper suscipit velit in malesuada. Nam suscipit pretium condimentum. Quisque porta leo ut lacus pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra erat lorem, eu ullamcorper tellus maximus non. In eget nulla eu massa posuere tempor sit amet vulputate ex. Nullam eget sem aliquam, ultricies arcu ut, pharetra purus. Mauris ullamcorper suscipit velit in malesuada. Nam suscipit pretium condimentum. Quisque porta leo ut lacus pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce viverra erat lorem, eu ullamcorper tellus maximus non. In eget nulla eu massa posuere tempor sit amet vulputate ex. Nullam eget sem aliquam, ultricies arcu ut, pharetra purus. Mauris ullamcorper suscipit velit in malesuada. Nam suscipit pretium condimentum. Quisque porta leo ut lacus pulvinar aliquam.',
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
            <ActivityCard
              key={activity.key}
              act={activity}
              quantity={Activities.length}
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
    justifyContent: 'center',
  },
  card: {
    flex: 0,
  },
});

export default AvailableActivities;

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {images} from '../../assets/imgs/handler/images';
import {IActivity} from '../../types/message';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const windowWidth = Dimensions.get('window').width;

interface ActivityCardProps {
  activity: IActivity;
  quantity: number;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'AvailableActivities'
  >;
}

const ActivityCard = ({activity, quantity, navigation}: ActivityCardProps) => {
  return (
    <Card
      style={[styles.card, {width: windowWidth / 3 - 10 * quantity}]}
      onPress={() => navigation.push('Activity', {activity})}>
      <Card.Cover
        source={images['portadaAct'.concat(activity.nactividad)].uri}
      />
      <Card.Title title={activity.titulo} titleStyle={styles.title} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: '#5C9DEC',
    width: windowWidth / 3,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
});

export default ActivityCard;

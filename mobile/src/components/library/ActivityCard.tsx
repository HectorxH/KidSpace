import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {images} from '../../assets/imgs/handler/images';
import {IActivity} from '../../types/activity';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

const windowWidth = Dimensions.get('window').width;

interface ActivityCardProps {
  activity: IActivity;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'AvailableActivities'
  >;
  curso: string;
  userName: string;
  userLastName: string;
}

const ActivityCard = ({
  activity,
  curso,
  userName,
  userLastName,
  navigation,
}: ActivityCardProps) => {
  console.log(activity);
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate('Activity', {activity, curso, userName, userLastName})
      }>
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
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
});

export default ActivityCard;

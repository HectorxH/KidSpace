import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
type ActivityCardProps = {
  act: {key: number; title: string; description: string; img: string};
};
const ActivityCard: React.FunctionComponent<ActivityCardProps> = ({
  act,
  quantity,
}) => (
  <Card
    style={[styles.card, {width: windowWidth / 3 - 10 * quantity}]}>
    <Card.Cover
      source={{
        uri: act.img,
      }}
    />
    <Card.Title title={act.title} titleStyle={styles.title} />
  </Card>
);

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

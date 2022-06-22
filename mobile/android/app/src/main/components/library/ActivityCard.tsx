import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ActivityCard = ({
  act,
  quantity,
  navigation,
}: {
  navigation: any;
  act: any;
  quantity: any;
}) => {
  return (
    <Card
      style={[styles.card, {width: windowWidth / 3 - 10 * quantity}]}
      onPress={() => navigation.push('Activity', {act})}>
      <Card.Cover
        source={{
          uri: act.img,
        }}
      />
      <Card.Title title={act.title} titleStyle={styles.title} />
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

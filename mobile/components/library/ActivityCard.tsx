import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Dimensions} from 'react-native';
import {images} from '../../android/app/src/main/assets/imgs/handler/images';

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
      <Card.Cover source={images['portadaAct'.concat(act.nactividad)].uri} />
      <Card.Title title={act.titulo} titleStyle={styles.title} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: Math.round(windowWidth * 0.01),
    flexDirection: 'row',
    backgroundColor: '#5C9DEC',
    width: windowWidth / 3,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: Math.round(windowWidth * 0.02),
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});

export default ActivityCard;

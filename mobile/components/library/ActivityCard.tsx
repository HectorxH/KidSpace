import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

type ActivityCardProps = {
  act: {key: number; title: string; description: string};
};

const ActivityCard: React.FunctionComponent<ActivityCardProps> = ({act}) => (
  <Card style={styles.card}>
    <Card.Cover
      source={{
        uri: 'https://previews.123rf.com/images/poenya200/poenya2001810/poenya200181000083/110398737-hoja-de-c%C3%A1lculo-en-el-icono-plano-de-la-pantalla-de-la-computadora-concepto-de-informe-de-contabilid.jpg',
      }}
    />
    <Card.Title title={act.title} titleStyle={styles.title} />
  </Card>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#5C9DEC',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
});

export default ActivityCard;

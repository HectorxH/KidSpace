import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Actitity = ({navigation, route}) => {
  const {act} = route.params;
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        <View style={styles.view}>
          <Button
            color="#EC87C0"
            mode="contained"
            onPress={() => navigation.push('AvailableActivities')}>
            {back}
          </Button>
        </View>
        <Card>
          <Card.Cover
            source={{
              uri: act.img,
            }}
            style={{flexDirection: 'column', height: 250}}
          />
        </Card>
      </View>
      <View style={styles.viewText}>
        <SafeAreaView style={styles.containerScroll}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{act.title}:</Text>
            <Text style={styles.paragraph}>{act.description}</Text>
            <View style={styles.viewButton}>
              <Button
                style={styles.button}
                icon={() => <Icon name="star" size={20} color="#FFEA02" />}
                color="#FF8A01"
                mode="contained"
                onPress={() => console.log('Pressed')}>
                <Text style={styles.subtitle}>¡Iniciar!</Text>
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'row',
    margin: 10,
  },
  viewLeft: {
    flex: 1.5,
    backgroundColor: '#F2C045',
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewText: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  viewButton: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    color: '#000000',
    marginTop: 5,
  },
  title: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  paragraph: {
    marginLeft: 10,
    fontFamily: 'Arial Black',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 15,
  },
  containerScroll: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Actitity;

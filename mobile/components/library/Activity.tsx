import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../android/app/src/main/assets/imgs/handler/images';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Actitity = ({navigation, route}: {navigation: any; route: any}) => {
  const {act} = route.params;
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        <View style={styles.view}>
          <Button
            color="#EC87C0"
            mode="contained"
            onPress={() => navigation.goBack()}>
            {back}
          </Button>
        </View>
        <Card>
          <Card.Cover
            source={images['portadaAct'.concat(act.nactividad)].uri}
            style={{flexDirection: 'column', height: 250}}
          />
        </Card>
      </View>
      <View style={styles.viewText}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{act.titulo}</Text>
            <Text style={styles.paragraph}>{act.descripcion}</Text>
            <View style={styles.viewButton}>
              <Button
                style={styles.button}
                icon={() => (
                  <Icon
                    name="star"
                    size={Math.round(windowWidth * 0.04)}
                    color="#FFEA02"
                  />
                )}
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
    margin: Math.round(windowWidth * 0.01),
  },
  viewLeft: {
    flex: 1.5,
    backgroundColor: '#F2C045',
    paddingLeft: Math.round(windowWidth * 0.01),
    paddingRight: Math.round(windowWidth * 0.01),
  },
  viewText: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: Math.round(windowWidth * 0.02),
    marginRight: Math.round(windowWidth * 0.02),
  },
  viewButton: {
    alignItems: 'center',
  },
  button: {
    width: Math.round(windowWidth * 0.18),
    color: '#000000',
    marginTop: Math.round(windowHeight * 0.02),
  },
  title: {
    marginLeft: Math.round(windowWidth * 0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: Math.round(windowWidth * 0.035),
    textAlign: 'left',
  },
  paragraph: {
    marginLeft: Math.round(windowWidth * 0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: Math.round(windowWidth * 0.019),
    textAlign: 'left',
    marginTop: Math.round(windowHeight * 0.001),
    marginBottom: Math.round(windowHeight * 0.001),
  },
  subtitle: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: Math.round(windowWidth * 0.02),
  },
  scrollView: {
    marginHorizontal: Math.round(windowWidth * 0.01),
    marginVertical: Math.round(windowWidth * 0.01),
  },
});

export default Actitity;

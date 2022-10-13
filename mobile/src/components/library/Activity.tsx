import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../assets/imgs/handler/images';
import {ActivityProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';

const Activity = ({navigation, route}: ActivityProps) => {
  const {activity, curso, userName, userLastName, completadas} = route.params;
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  // console.log(activity);
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
            source={images[`portadaAct${activity.nactividad}`].uri}
            style={{flexDirection: 'column', height: 250}}
          />
        </Card>
      </View>
      <View style={styles.viewText}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{activity.titulo}</Text>
            <Text style={styles.paragraph}>{activity.descripcion}</Text>
            <View style={styles.viewButton}>
              <Button
                style={styles.button}
                icon={() => (
                  <Icon name="star" size={RSize(0.04)} color="#FFEA02" />
                )}
                color="#FF8A01"
                mode="contained"
                onPress={() =>
                  navigation.navigate('Actividades', {
                    actividad: activity.nombreActividad,
                    cantMonedas: 0,
                    curso: curso,
                    userName: userName,
                    userLastName: userLastName,
                    completadas: completadas,
                  })
                }>
                {/* onPress={() => console.log('Pressed')}> */}
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
    margin: RSize(0.01),
  },
  viewLeft: {
    flex: 1.5,
    backgroundColor: '#F2C045',
    paddingLeft: RSize(0.01),
    paddingRight: RSize(0.01),
  },
  viewText: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: RSize(0.02),
    marginRight: RSize(0.02),
  },
  viewButton: {
    alignItems: 'center',
  },
  button: {
    width: RSize(0.18),
    color: '#000000',
    marginTop: RSize(0.02, 'h'),
  },
  title: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.035),
    textAlign: 'left',
  },
  paragraph: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  subtitle: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: RSize(0.02),
  },
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
  },
});

export default Activity;

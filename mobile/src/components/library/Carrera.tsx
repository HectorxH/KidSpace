import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {mapImages} from '../../assets/map/handler/images';
import {imagesPersonajes} from '../../assets/personajesCarreras/handler/imagesPersonajes';
import {CarreraProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';

const nombreActividades = {
  diagramas: 'Diagramas',
  materiales: 'Materiales',
  diseños: 'Diseños',
  diseño1: 'Teoría de colores',
  diseño2: 'Diseño gráfico en nuestro alrededor',
  nutricion1: 'Interpretando etiquetas de los alimentos',
  nutricion2: 'Analizando nuestra dieta',
  informatica1: 'Informática y algoritmos en nuestra vida',
  informatica2: '¿Qué es un computador?',
  astronomia1: 'Tierra, Luna y Sol',
  astronomia2: '¿Qué vemos en el cielo nocturno?',
};

const Carrera = ({navigation, route}: CarreraProps) => {
  const {carrera, curso, userName, userLastName, completadas} = route.params;
  console.log(carrera.stories[1].nombre);
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;

  const checkCompletada = (nombre: string) => {
    try {
      if (
        completadas[nombreActividades[nombre]] &&
        completadas[nombreActividades[nombre]] > 0
      ) {
        console.log('dorada');
        return 'estrelladorada';
      }
      return 'estrellagris';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.view}>
          <Button
            color="#EC87C0"
            mode="contained"
            onPress={() => navigation.goBack()}>
            {back}
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: RSize(0.01),
            marginHorizontal: RSize(0.01),
            flexDirection: 'row-reverse',
          }}>
          <Button
            color="#FF8A01"
            mode="contained"
            uppercase={false}
            icon={() => (
              <Icon name="emoticon-happy" color="#FFF" size={RSize(0.04)} />
            )}
            onPress={() =>
              navigation.navigate('CompanerosView', {
                datos: {
                  carrera: carrera.title,
                  nombre1: carrera.stories[0].nombre,
                  nombre2: carrera.stories[1].nombre,
                },
              })
            }>
            <Text style={styles.textButton}>Compañeros</Text>
          </Button>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{flex: 1.2}}>
          <View style={styles.viewText}>
            <Text style={styles.title}>{carrera.title}</Text>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.paragraph}>{carrera.desc2}</Text>
            </ScrollView>
          </View>
        </View>
        {carrera.stories.map((story, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              marginRight: RSize(0.03, 'h'),
              justifyContent: 'center',
            }}>
            <TouchableHighlight
              underlayColor={'#F6F6F6'}
              style={{
                borderRadius: 20,
              }}
              onPress={() =>
                navigation.navigate('Story', {
                  Info: story,
                  curso: curso,
                  userName: userName,
                  userLastName: userLastName,
                  completadas: completadas,
                })
              }>
              <Card
                style={{
                  borderRadius: 20,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    alignContent: 'center',
                    elevation: 5,
                  }}>
                  <Image
                    source={
                      mapImages[`${checkCompletada(story.actividad)}`].uri
                    }
                    style={{
                      width: RSize(0.06, 'h'),
                      height: RSize(0.06, 'h'),
                    }}
                  />
                </View>
                <Card.Cover
                  source={imagesPersonajes[`${story.img}`].uri}
                  style={{
                    height: RSize(0.6, 'h'),
                    marginTop: RSize(0.03, 'h'),
                  }}
                />
                <Text style={styles.title2}>{story.title}</Text>
              </Card>
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    margin: RSize(0.01),
  },
  viewText: {
    flexDirection: 'column',
    margin: RSize(0.01),
    marginBottom: RSize(0.05),
  },
  title: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.03),
    textAlign: 'left',
  },
  title2: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.03),
    textAlign: 'center',
  },
  paragraph: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
  },
  textButton: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    fontSize: RSize(0.02),
  },
});

export default Carrera;

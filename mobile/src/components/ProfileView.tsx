/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Config from 'react-native-config';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Button, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../assets/imgs/handler/images';
import {medallasImages} from '../assets/medallas/handler/medallasImages';
import {useAuth} from '../hooks/useAuth';
import {IActivity} from '../types/activity';
import {ProfileProps} from '../types/navigation';
import {RSize} from '../utils/responsive';
import Character from './library/Character';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pseudoMessage from './PseudoPusher/message/pseudoMessage';
import _ from 'lodash';

// const medallas = [1, 0, 1, 0, 1, 1, 1, 1];
const medallas = [
  'Informática y algoritmos en nuestra vida',
  '¿Qué es un computador?',
  'Tierra, Luna y Sol',
  '¿Qué vemos en el cielo nocturno?',
  'Interpretando etiquetas de los alimentos',
  'Analizando nuestra dieta',
  'Teoría de colores',
  'Diseño gráfico en nuestro alrededor',
];

const ProfileView = ({navigation, route}: ProfileProps) => {
  const {Info, completadas, setMessage, setNotification} = route.params;
  const [cursoNombre, setCursoNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [personaje, setPersonaje] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const {instance, curso} = useAuth();

  const getCurso = async () => {
    try {
      const res = await instance.get(
        `${Config.REACT_APP_BACKEND_URL}/Curso/${curso}`,
      );
      setCursoNombre(res.body.curso.nombre);
    } catch (e) {
      console.log('Error al cargar el curso');
      console.log(JSON.stringify(e));
    }
  };

  const getPersonaje = async () => {
    try {
      const res = await instance.get(
        `${Config.REACT_APP_BACKEND_URL}/Estudiante/personaje`,
      );
      setPersonaje(res.body.personaje);
      setLoading(true);
    } catch (e) {
      console.log('Error al cargar el personaje');
      console.log(JSON.stringify(e));
    }
  };

  const onMedallaPress = async (id: number) => {
    console.log('toque la medalla ' + id);
    const actividad = _.find(pseudoMessage, {id});
    let allMessages: IActivity[] = [];
    let jsonAllMessages = await AsyncStorage.getItem('@message');

    if (actividad === undefined && id !== 8) {
      return null;
    }

    if (typeof actividad !== 'undefined' && id !== 8) {
      //check if value previously stored
      // console.log('actividad:', actividad);

      allMessages =
        jsonAllMessages !== null && jsonAllMessages !== 'null'
          ? JSON.parse(jsonAllMessages)
          : [];

      console.log(allMessages, typeof allMessages);
      console.log(curso);

      allMessages.push(actividad);
      allMessages = _.uniqWith(allMessages, _.isEqual);
      jsonAllMessages = JSON.stringify(allMessages);

      await AsyncStorage.setItem('@message', jsonAllMessages);

      await AsyncStorage.setItem(
        '@notification',
        allMessages.length.toString(),
      );

      const m = await AsyncStorage.getItem('@message');
      if (typeof setMessage !== 'undefined') {
        setMessage(JSON.parse(m!));
      }

      let n = await AsyncStorage.getItem('@notification');
      if (typeof setNotification !== 'undefined') {
        setNotification(n!);
      }
    }
    if (id === 8) {
      await AsyncStorage.setItem('@message', JSON.stringify(allMessages));

      await AsyncStorage.setItem(
        '@notification',
        allMessages.length.toString(),
      );

      const m = await AsyncStorage.getItem('@message');
      if (typeof setMessage !== 'undefined') {
        setMessage(JSON.parse(m!));
      }

      let n = await AsyncStorage.getItem('@notification');
      if (typeof setNotification !== 'undefined') {
        setNotification(n!);
      }
    }
  };

  useEffect(() => {
    getCurso();
    getPersonaje();
  }, []);

  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  return (
    <View style={styles.container}>
      <View style={{flex: 1.5 / 4, flexDirection: 'column'}}>
        <View style={{flex: 1.9 / 4, backgroundColor: '#7EC6FF'}}>
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
              height: RSize(0.32, 'h'),
              width: RSize(0.32, 'h'),
              borderRadius: 100,
              alignSelf: 'center',
              borderWidth: 4,
              borderColor: 'white',
            }}>
            {loading ? <Character personaje={personaje} /> : <View />}
          </View>
        </View>
        <View style={{flex: 2.1 / 4}}>
          <Text style={styles.name}>
            {Info.nombres} {Info.apellidos}
          </Text>
          <Chip style={styles.chip}>
            <Text style={styles.textChip}>Curso: {cursoNombre}</Text>
          </Chip>
          <Chip style={styles.chip}>
            <Image style={styles.icon} source={images.moneda.uri} />
            <Text style={styles.textChip}> {Info.monedas}</Text>
          </Chip>
          <Button
            color="#FF8A00"
            mode="contained"
            uppercase={false}
            style={{
              marginLeft: RSize(0.03, 'w'),
              marginRight: RSize(0.03, 'w'),
              marginTop: RSize(0.01, 'w'),
              borderRadius: 10,
            }}
            icon={() => (
              <Icon
                name="square-edit-outline"
                size={RSize(0.06, 'h')}
                color="#FFFFFF"
              />
            )}
            onPress={() =>
              navigation.navigate('EditCharacter', {personaje, setPersonaje})
            }>
            <Text style={styles.textButton}>Editar la apariencia</Text>
          </Button>
        </View>
      </View>
      <View style={{flex: 2.5 / 4}}>
        <Text style={styles.title}>Tus Logros</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {medallas.map((medalla, id) => (
            <TouchableWithoutFeedback
              key={'medalla ' + id + medalla}
              onPress={() => {
                onMedallaPress(id + 1);
              }}>
              <Image
                key={id}
                style={[
                  styles.viewMedalla,
                  completadas[medalla] > 0
                    ? styles.medallaColorGanada
                    : styles.medallaColor,
                ]}
                source={medallasImages[`i${id}`].uri}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewMedalla: {
    width: RSize(0.15, 'w'),
    height: RSize(0.15, 'w'),
  },
  medallaColor: {
    tintColor: '#DFDBDC',
  },
  medallaColorGanada: {
    opacity: 100,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'row',
    margin: RSize(0.01),
  },
  textButton: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
    fontSize: RSize(0.02),
  },
  chip: {
    backgroundColor: '#e5e5e5',
    margin: RSize(0.01, 'h'),
    marginLeft: RSize(0.015, 'w'),
    marginRight: RSize(0.015, 'w'),
    justifyContent: 'center',
  },
  textChip: {
    color: '#000000',
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
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
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.03),
    alignSelf: 'center',
  },
  paragraph: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.03),
    alignSelf: 'center',
    marginTop: RSize(0.015, 'h'),
    marginBottom: RSize(0.015, 'h'),
  },
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
  },
  icon: {
    resizeMode: 'cover',
    height: RSize(0.045, 'h'),
    width: RSize(0.045, 'h'),
  },
});

export default ProfileView;

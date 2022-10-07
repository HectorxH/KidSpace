import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {FormularioViewProps} from '../types/navigation';
import {RSize} from '../utils/responsive';
import {images} from '../assets/inicio/handler/images';
import {useAuth} from '../hooks/useAuth';
import Config from 'react-native-config';
import {ResponseError} from 'superagent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormularioView = ({navigation, route}: FormularioViewProps) => {
  const cursoId = route.params.data;
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');

  const {user, login, instance, deleteAccount} = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('MainMap');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEnviar = async () => {
    try {
      let res = await instance
        .post(`${Config.REACT_APP_BACKEND_URL}/register`)
        .send({
          nombres,
          apellidos,
          tipo: 'estudiante',
          cursoId,
        });
      const {_id, username, password} = res.body;
      await instance.post(`${Config.REACT_APP_BACKEND_URL}/login`).send({
        username,
        password,
        tipo: 'estudiante',
      });
      await login({
        _id,
        username,
        password,
        nombres,
        apellidos,
        tipo: 'estudiante',
      });
      await AsyncStorage.setItem('@curso', cursoId);
    } catch (error) {
      console.log(JSON.stringify(error));
      if ((error as ResponseError).status === 401) {
        try {
          await deleteAccount();
        } catch (e) {
          console.log(e);
        }
      }
      navigation.push('ErrorView');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        <Text style={styles.title}>
          Todo está casi listo. Nos faltan algunos datos sobre ti.
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="  Tus nombres"
          onChangeText={value => setNombres(value)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="  Tus apellidos"
          onChangeText={value => setApellidos(value)}
        />
        <Button
          style={styles.button}
          color="#FF8A01"
          mode="contained"
          onPress={handleEnviar}>
          <Text style={styles.textButton}>Enviar</Text>
        </Button>
      </View>
      <View style={styles.viewRight}>
        <Card.Cover
          source={images.logo.uri}
          style={{height: RSize(1, 'h'), backgroundColor: '#5C9DEC'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textInput: {
    borderRadius: 10,
    marginLeft: RSize(0.04, 'w'),
    marginRight: RSize(0.04, 'w'),
    marginBottom: RSize(0.04, 'h'),
    height: RSize(0.12, 'h'),
    borderWidth: 1,
    borderColor: '#5C9DEC',
  },
  viewLeft: {
    flex: 1,
  },
  viewRight: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.07, 'h'),
    textAlign: 'center',
    marginLeft: RSize(0.03, 'w'),
    marginRight: RSize(0.03, 'w'),
    marginBottom: RSize(0.04, 'h'),
    marginTop: RSize(0.04, 'h'),
    color: '#063D69',
  },
  button: {
    borderRadius: 5,
    width: RSize(0.27, 'h'),
    alignSelf: 'center',
  },
  textButton: {
    marginLeft: 10,
    fontSize: RSize(0.04, 'h'),
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default FormularioView;

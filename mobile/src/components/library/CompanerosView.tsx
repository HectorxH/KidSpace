import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import {Button, Card, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RSize} from '../../utils/responsive';
import {mapImages} from '../../assets/map/handler/images';
import {CompaneroProps} from '../../types/navigation';
import Character from './Character';
import CargaView from '../CargaView';
import {useAuth} from '../../hooks/useAuth';
import _ from 'lodash';
import Config from 'react-native-config';

interface ICompaniero {
  nombres: string;
  apellidos: string;
  personaje: number[];
  actividadesIndividuales: {[key: string]: number};
}

// const losCompas = [
//   {
//     nombres: 'skylar',
//     apellidos: 'cirrus',
//     personaje: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
//     actividadesIndividuales: {
//       'Informática y algoritmos en nuestra vida': 1,
//       '¿Qué es un computador?': 2,
//       'Tierra, Luna y Sol': 0,
//       '¿Qué vemos en el cielo nocturno?': 0,
//       'Interpretando etiquetas de los alimentos': 1,
//       'Analizando nuestra dieta': 0,
//       'Teoría de colores': 0,
//       'Diseño gráfico en nuestro alrededor': 0,
//     },
//   },
//   {
//     nombres: 'kai',
//     apellidos: 'soo',
//     personaje: [8, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 5],
//     actividadesIndividuales: {
//       'Informática y algoritmos en nuestra vida': 0,
//       '¿Qué es un computador?': 0,
//       'Tierra, Luna y Sol': 9,
//       '¿Qué vemos en el cielo nocturno?': 2,
//       'Interpretando etiquetas de los alimentos': 0,
//       'Analizando nuestra dieta': 0,
//       'Teoría de colores': 0,
//       'Diseño gráfico en nuestro alrededor': 0,
//     },
//   },
//   {
//     nombres: 'jen',
//     apellidos: 'lisa',
//     personaje: [3, 0, 2, 2, 0, 0, 25, 25, 0, 0, 8, 1],
//     actividadesIndividuales: {
//       'Informática y algoritmos en nuestra vida': 0,
//       '¿Qué es un computador?': 0,
//       'Tierra, Luna y Sol': 0,
//       '¿Qué vemos en el cielo nocturno?': 0,
//       'Interpretando etiquetas de los alimentos': 0,
//       'Analizando nuestra dieta': 0,
//       'Teoría de colores': 0,
//       'Diseño gráfico en nuestro alrededor': 0,
//     },
//   },
//   {
//     nombres: 'skylar',
//     apellidos: 'cirrus',
//     personaje: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
//     actividadesIndividuales: {
//       'Informática y algoritmos en nuestra vida': 0,
//       '¿Qué es un computador?': 0,
//       'Tierra, Luna y Sol': 0,
//       '¿Qué vemos en el cielo nocturno?': 0,
//       'Interpretando etiquetas de los alimentos': 0,
//       'Analizando nuestra dieta': 0,
//       'Teoría de colores': 0,
//       'Diseño gráfico en nuestro alrededor': 0,
//     },
//   },
//   {
//     nombres: 'kai',
//     apellidos: 'soo',
//     personaje: [0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 3],
//     actividadesIndividuales: {
//       'Informática y algoritmos en nuestra vida': 0,
//       '¿Qué es un computador?': 0,
//       'Tierra, Luna y Sol': 0,
//       '¿Qué vemos en el cielo nocturno?': 0,
//       'Interpretando etiquetas de los alimentos': 0,
//       'Analizando nuestra dieta': 0,
//       'Teoría de colores': 0,
//       'Diseño gráfico en nuestro alrededor': 0,
//     },
//   },
// ];

const CompanerosView = ({navigation, route}: CompaneroProps) => {
  const {carrera, nombre1, nombre2} = route.params.datos;
  const [compas, setCompas] = useState<ICompaniero[]>([]);
  const [loading, setLoading] = useState(true);
  const {instance} = useAuth();

  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  const checkCompletada = (estado: number) => {
    if (estado > 0) {
      return 'estrelladorada';
    }
    return 'estrellagris';
  };

  const getCompas = async () => {
    try {
      const res = await instance.get(
        `${Config.REACT_APP_BACKEND_URL}/Estudiante/compas`,
      );
      console.log(res.body.compas);
      const sortedCompas = _.orderBy(res.body.compas, ['nombres'], ['asc']);
      setCompas(sortedCompas);
    } catch (e) {
      console.log(JSON.stringify(e));
      console.log('No se encontraron compas :(');
    }
    setLoading(false);
  };

  useEffect(() => {
    getCompas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <CargaView />;
  }
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
        <Text style={styles.title}>Avance de compañeros</Text>
        <View
          style={{
            flex: 1,
            margin: RSize(0.01),
            flexDirection: 'row-reverse',
          }}>
          <Chip style={styles.chip1}>
            <Text style={styles.textChip1}>{carrera}</Text>
          </Chip>
        </View>
      </View>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            {compas.map((compa, index) => (
              <Card
                key={index}
                style={{
                  width: RSize(0.8, 'w'),
                  height: RSize(0.25, 'h'),
                  margin: RSize(0.01, 'h'),
                  borderRadius: 20,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      margin: RSize(0.01, 'h'),
                      width: RSize(0.23, 'h'),
                      height: RSize(0.23, 'h'),
                    }}>
                    <Character personaje={compa.personaje} />
                  </View>
                  <Text style={styles.paragraph}>
                    {compa.nombres} {compa.apellidos}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row-reverse',
                    }}>
                    <Image
                      source={
                        mapImages[
                          `${checkCompletada(
                            compa.actividadesIndividuales[nombre2],
                          )}`
                        ].uri
                      }
                      style={{
                        marginHorizontal: RSize(0.02, 'w'),
                        width: RSize(0.09, 'h'),
                        height: RSize(0.09, 'h'),
                      }}
                    />
                    <Image
                      source={
                        mapImages[
                          `${checkCompletada(
                            compa.actividadesIndividuales[nombre1],
                          )}`
                        ].uri
                      }
                      style={{
                        marginHorizontal: RSize(0.01, 'w'),
                        width: RSize(0.09, 'h'),
                        height: RSize(0.09, 'h'),
                      }}
                    />
                  </View>
                </View>
              </Card>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
  view: {
    margin: RSize(0.01),
  },
  viewLeft: {
    flex: 1,
    backgroundColor: '#B878EA',
    paddingLeft: RSize(0.02),
    paddingRight: RSize(0.02),
    paddingTop: RSize(0.01),
    paddingBottom: RSize(0.02),
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
    margin: RSize(0.01),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.035),
    color: '#063D69',
    textAlign: 'left',
  },
  paragraph: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Regular',
    fontSize: RSize(0.025),
    textAlign: 'left',
    color: '#063D69',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  textButton: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: RSize(0.02),
  },
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
  },
  chip1: {
    backgroundColor: '#B878EA',
    margin: RSize(0.02, 'h'),
  },
  chip2: {
    backgroundColor: '#ededed',
    margin: RSize(0.02, 'h'),
  },
  textChip1: {
    color: '#ffffff',
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
  textChip2: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginTop: RSize(0.001, 'h'),
    marginBottom: RSize(0.001, 'h'),
  },
});

export default CompanerosView;

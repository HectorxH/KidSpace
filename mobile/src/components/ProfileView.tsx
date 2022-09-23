import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../assets/imgs/handler/images';
import {medallasImages} from '../assets/medallas/handler/medallasImages';
import {ProfileProps} from '../types/navigation';
import {RSize} from '../utils/responsive';
import Character from './library/Character';

const medallas = [1, 0, 1, 0, 1, 1, 1, 1];

const ProfileView = ({navigation}: ProfileProps) => {
  // const {data} = route.params;
  const data = {
    nombres: 'Skylar',
    apellidos: 'Cirrus',
    curso: 'Lost in the cloud',
    monedas: 200,
  };
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  console.log(Object.keys(medallas));
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
            <Character />
          </View>
        </View>
        <View style={{flex: 2.1 / 4}}>
          <Text style={styles.name}>
            {data.nombres} {data.apellidos}
          </Text>
          <Chip style={styles.chip}>
            <Text style={styles.textChip}>Curso: {data.curso}</Text>
          </Chip>
          <Chip style={styles.chip}>
            <Image style={styles.icon} source={images.moneda.uri} />
            <Text style={styles.textChip}> {data.monedas}</Text>
          </Chip>
          <Button
            color="#FF8A00"
            mode="contained"
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
            onPress={() => navigation.navigate('EditCharacter')}>
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
          {Object.keys(medallas).map((medalla, id) => (
            <Image
              key={id}
              style={[
                styles.viewMedalla,
                medallas[id] !== 1
                  ? styles.medallaColor
                  : styles.medallaColorGanada,
              ]}
              source={medallasImages[`${medalla}`].uri}
            />
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

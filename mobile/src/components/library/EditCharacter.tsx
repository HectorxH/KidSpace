import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Modal,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {opcionesImages} from '../../assets/perfil/0opciones/handler/opcionesImages';
import {baseImages} from '../../assets/perfil/1base/handler/baseImages';
import {vitiligoImages} from '../../assets/perfil/2vitiligo/handler/vitiligoImages';
import {lefteyeImages} from '../../assets/perfil/3lefteye/handler/lefteyeImages';
import {righteyeImages} from '../../assets/perfil/4righteye/handler/righteyeImages';
import {noseImages} from '../../assets/perfil/5nose/handler/noseImages';
import {mouthImages} from '../../assets/perfil/6mouth/handler/mouthImages';
import {eyebrownImages} from '../../assets/perfil/7eyebrown/handler/eyebrownImages';
import {bangsImages} from '../../assets/perfil/8bangs/handler/bangsImages';
import {hairImages} from '../../assets/perfil/9hair/handler/hairImages';
import {clothesImages} from '../../assets/perfil/10clothes/handler/clothesImages';
import {accesoriesImages} from '../../assets/perfil/11accesories/handler/accesoriesImages';
import {backgroundImages} from '../../assets/perfil/12background/handler/backgroundImages';

import {EditCharacterProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';

const disponibles = {
  9: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], //31
  10: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], //39
  11: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
};

const len = [28, 9, 15, 19, 7, 14, 56, 281, 198, 31, 39, 11];
const srcNames = [
  'baseImages',
  'vitiligoImages',
  'lefteyeImages',
  'righteyeImages',
  'noseImages',
  'mouthImages',
  'eyebrownImages',
  'bangsImages',
  'hairImages',
  'clothesImages',
  'accesoriesImages',
  'backgroundImages',
];

const partes = [
  {baseImages},
  {vitiligoImages},
  {lefteyeImages},
  {righteyeImages},
  {noseImages},
  {mouthImages},
  {eyebrownImages},
  {bangsImages},
  {hairImages},
  {clothesImages},
  {accesoriesImages},
  {backgroundImages},
];
const EditCharacter = ({navigation}: EditCharacterProps) => {
  // const {Info} = route.params;
  const [parte, setParte] = useState(0);

  const initialState = [5, 0, 1, 1, 1, 1, 1, 110, 1, 6, 37, 1];
  const [parteArray, setParteArray] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [saved, setSaved] = useState(true);
  console.log(parteArray[7], bangsImages[`i${parteArray[7]}`].uri);
  const handlePartes = (p: number, id: number) => {
    if (!(p > 8 && disponibles[p][id] === 0)) {
      console.log(id, p);
      setSaved(false);
      parteArray.splice(p, 1, id);
      setParteArray(Array.from(parteArray));
      console.log(parteArray);
    }
  };
  const handleBack = () => {
    if (saved === true) {
      navigation.goBack();
    } else {
      setModalVisible(true);
    }
  };
  const handleSave = () => {
    setSaved(true);
    console.log('hi');
  };
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.background}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleModal}>¿Salir del editor?</Text>
              <Text style={styles.paragraph}>
                Si sales del editor, tus cambios no se guardarán.
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Button
                  style={styles.buttonModal}
                  color="#EC87C0"
                  mode="contained"
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.textModalButton}>Salir</Text>
                </Button>
                <Button
                  style={styles.buttonModal}
                  color="#A1C96A"
                  mode="contained"
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textModalButton}>Volver al editor</Text>
                </Button>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <View
        style={{
          flex: 1.5 / 4,
          flexDirection: 'column',
          marginLeft: RSize(0.01),
        }}>
        <View style={styles.view}>
          <Button color="#EC87C0" mode="contained" onPress={() => handleBack()}>
            {back}
          </Button>
        </View>
        <ImageBackground
          key="background"
          style={{flex: 1}}
          imageStyle={{borderRadius: 10}}
          source={backgroundImages[`i${parteArray[11]}`].uri}>
          <ImageBackground
            key="hair"
            style={{flex: 1}}
            source={hairImages[`i${parteArray[8]}`].uri}>
            <ImageBackground
              key="base"
              style={{flex: 1}}
              source={baseImages[`i${parteArray[0]}`].uri}>
              <ImageBackground
                key="vitiligo"
                style={{flex: 1}}
                imageStyle={[parteArray[1] !== 0 ? {opacity: 1} : {opacity: 0}]}
                source={vitiligoImages[`i${parteArray[1]}`].uri}>
                <ImageBackground
                  key="lefteye"
                  style={{flex: 1}}
                  source={lefteyeImages[`i${parteArray[2]}`].uri}>
                  <ImageBackground
                    key="righteye"
                    style={{flex: 1}}
                    source={righteyeImages[`i${parteArray[3]}`].uri}>
                    <ImageBackground
                      key="nose"
                      style={{flex: 1}}
                      source={noseImages[`i${parteArray[4]}`].uri}>
                      <ImageBackground
                        key="mouth"
                        style={{flex: 1}}
                        source={mouthImages[`i${parteArray[5]}`].uri}>
                        <ImageBackground
                          key="eyebrown"
                          style={{flex: 1}}
                          source={eyebrownImages[`i${parteArray[6]}`].uri}>
                          <ImageBackground
                            key="clothes"
                            style={{flex: 1}}
                            source={clothesImages[`i${parteArray[9]}`].uri}>
                            <ImageBackground
                              key="bangs"
                              style={{flex: 1}}
                              source={bangsImages[`i${parteArray[7]}`].uri}>
                              <ImageBackground
                                key="accesories"
                                style={[
                                  styles.container,
                                  parteArray[10] > 27 && parteArray[10] < 35
                                    ? {marginTop: RSize(0.05, 'h')}
                                    : parteArray[10] > 35
                                    ? {marginTop: RSize(0.1, 'h')}
                                    : {opacity: 1},
                                ]}
                                imageStyle={[
                                  parteArray[10] !== 0
                                    ? {opacity: 1}
                                    : {opacity: 0},
                                ]}
                                source={
                                  accesoriesImages[`i${parteArray[10]}`].uri
                                }
                              />
                            </ImageBackground>
                          </ImageBackground>
                        </ImageBackground>
                      </ImageBackground>
                    </ImageBackground>
                  </ImageBackground>
                </ImageBackground>
              </ImageBackground>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <Button
          color="#A1C96A"
          mode="contained"
          style={{
            margin: RSize(0.01, 'h'),
            alignSelf: 'center',
            borderRadius: 10,
          }}
          icon={() => (
            <Icon name="content-save" size={RSize(0.06, 'h')} color="#FFFFFF" />
          )}
          onPress={() => handleSave()}>
          <Text style={styles.textButton}>Guardar</Text>
        </Button>
      </View>
      <View style={{flex: 2.5 / 4, flexDirection: 'column'}}>
        <View style={{flex: 1.17 / 4, flexDirection: 'column'}}>
          <ScrollView
            horizontal={true}
            persistentScrollbar={true}
            style={styles.scrollView}>
            <View style={{flexDirection: 'row', backgroundColor: '#ECECEC'}}>
              {Array(12)
                .fill(1)
                .map((i, id) => (
                  <View
                    key={id}
                    style={[
                      styles.part,
                      id !== parte
                        ? styles.partNoSelected
                        : styles.partSelected,
                    ]}>
                    <TouchableOpacity key={id} onPress={() => setParte(id)}>
                      <Image
                        key={id}
                        style={{
                          width: RSize(0.19, 'h'),
                          height: RSize(0.19, 'h'),
                          borderRadius: 10,
                        }}
                        source={opcionesImages[`i${id}`].uri}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 2.83 / 4,
            flexDirection: 'column',
            backgroundColor: '#ECECEC',
          }}
          onStartShouldSetResponder={() => true}>
          <ScrollView style={styles.scrollView} persistentScrollbar={true}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {Array(len[parte])
                .fill(1)
                .map((i, id) => (
                  <View
                    key={id}
                    style={[
                      styles.part,
                      id !== parteArray[parte]
                        ? styles.partNoSelected
                        : styles.partSelected,
                    ]}>
                    <TouchableOpacity
                      key={id}
                      onPress={() => handlePartes(parte, id)}>
                      <Image
                        key={id}
                        style={[
                          styles.opcion,
                          parte > 8 && disponibles[parte][id] === 0
                            ? styles.opcionNoDisponible
                            : styles.opcionDisponible,
                        ]}
                        source={partes[parte][srcNames[parte]][`i${id}`].uri}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  part: {
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    margin: RSize(0.005, 'h'),
  },
  partNoSelected: {
    borderColor: '#B5B5B5',
  },
  partSelected: {
    borderColor: '#5C9DEC',
  },
  opcion: {
    width: RSize(0.2, 'h'),
    height: RSize(0.2, 'h'),
    borderRadius: 8,
  },
  opcionDisponible: {
    opacity: 1,
  },
  opcionNoDisponible: {
    opacity: 0.2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    flexDirection: 'row',
    marginTop: RSize(0.01),
    marginBottom: RSize(0.005),
  },
  scrollView: {
    marginHorizontal: RSize(0.01),
    marginVertical: RSize(0.01),
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
  textButton: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: RSize(0.02),
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
  titleModal: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.035),
  },
  textModalButton: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: RSize(0.02),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RSize(0.02, 'h'),
  },
  modalView: {
    margin: RSize(0.15, 'w'),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: RSize(0.03, 'w'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 10,
    marginTop: RSize(0.05, 'h'),
    marginRight: RSize(0.02, 'h'),
    marginLeft: RSize(0.02, 'h'),
    height: RSize(0.1, 'h'),
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default EditCharacter;

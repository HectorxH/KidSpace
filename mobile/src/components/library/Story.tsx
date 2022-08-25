import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Button, Card, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../assets/map/handler/images';
// import {ActivityProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';

const Story = ({navigation, route}: any) => {
  const {Info} = route.params;
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  // const coins = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  console.log(Info.title);
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
            source={images[`${Info.img}`].uri}
            style={{ height: RSize(0.7,'h')}}
          />
        </Card>
      </View>
      <View style={styles.viewText}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <Chip style={styles.chip1}>
              <Text style={styles.textChip1}>{Info.carrera}</Text>
            </Chip>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Chip style={styles.chip2}>
              <Text style={styles.textChip2}>Ganas {Info.coins}</Text>
            </Chip>
          </View>
        </View>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{Info.title}</Text>
            <Text style={styles.paragraph}>{Info.desc}</Text>
            <View style={styles.viewButton}>
              <Button
                style={styles.button}
                icon={() => (
                  <Icon name="star" size={RSize(0.04)} color="#FFEA02" />
                )}
                color="#FF8A01"
                mode="contained"
                // onPress={() =>
                //   navigation.push('CuentoIntroductorio', {
                //     actividad: 'diagramas',
                //   })
                // }>
                onPress={() => console.log('Pressed')}>
                <Text style={styles.textButton}>¡Iniciar!</Text>
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
    backgroundColor: '#B878EA',
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
    backgroundColor: '#EFEFEF',
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

export default Story;

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
import {images} from '../../assets/map/handler/images';
import {imagesPersonajes} from '../../assets/personajesCarreras/handler/imagesPersonajes';
import {CarreraProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';

const Carrera = ({navigation, route}: CarreraProps) => {
  const {carrera} = route.params;
  const back = <Icon name="arrow-left-bold" size={20} color="#FFFFFF" />;
  return (
    <View style={styles.container}>
      <View style={{flex: 1.2}}>
        <View style={styles.view}>
          <Button
            color="#EC87C0"
            mode="contained"
            onPress={() => navigation.goBack()}>
            {back}
          </Button>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.title}>{carrera.title}</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.paragraph}>{carrera.desc2}</Text>
          </ScrollView>
        </View>
      </View>
      {carrera.stories.map((story, id) => (
        <View
          key={id}
          style={{
            flex: 1,
            marginRight: RSize(0.03, 'h'),
            justifyContent: 'center',
          }}>
          <TouchableHighlight
            underlayColor={'#F6F6F6'}
            key={id}
            style={{
              borderRadius: 20,
            }}
            onPress={() =>
              navigation.push('Story', {
                Info: story,
              })
            }>
            <Card
              // key={story.title}
              style={{
                borderRadius: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  alignContent: 'center',
                  elevation: 5,
                }}>
                <Image
                  source={images[`${story.estado}`].uri}
                  style={{
                    width: RSize(0.06, 'h'),
                    height: RSize(0.06, 'h'),
                  }}
                />
              </View>
              <Card.Cover
                source={imagesPersonajes[`${story.img}`].uri}
                style={{
                  height: RSize(0.63, 'h'),
                  marginTop: RSize(0.045, 'h'),
                }}
              />
              <Text style={styles.title2}>{story.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              />
            </Card>
          </TouchableHighlight>
        </View>
      ))}
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
  viewText: {
    flexDirection: 'column',
    margin: RSize(0.01),
    marginBottom: RSize(0.14),
  },
  title: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.03),
    textAlign: 'left',
  },
  title2: {
    margin: RSize(0.01),
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
  chip2: {
    backgroundColor: '#EFEFEF',
    marginBottom: RSize(0.02, 'h'),
  },
  textChip2: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-SemiBold',
    fontSize: RSize(0.019),
    textAlign: 'left',
    marginBottom: RSize(0.001, 'h'),
  },
});

export default Carrera;

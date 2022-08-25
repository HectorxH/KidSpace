import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  Image,
} from 'react-native';
import {Button, Card, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../assets/map/handler/images';
// import {ActivityProps} from '../../types/navigation';
import {RSize} from '../../utils/responsive';

const Carrera = ({navigation, route}: any) => {
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
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{carrera.title}</Text>
            <Text style={styles.paragraph}>{carrera.desc2}</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
      {carrera.stories.map(story => (
        <>
          <View
            style={{
              flex: 1,
              marginTop: RSize(0.04, 'h'),
              marginRight: RSize(0.03, 'h'),
            }}>
            <TouchableHighlight
              onPress={() =>
                navigation.push('Story', {
                  Info: story,
                })
              }>
              <Card>
                <Card.Cover
                  source={images[`${story.img}`].uri}
                  style={{height: RSize(0.6, 'h')}}
                />
                <Text style={styles.title2}>{story.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Chip style={styles.chip2}>
                    <Text style={styles.textChip2}>
                      Ganas{' '}
                      <Image
                        source={images.moneda.uri}
                        style={{
                          width: RSize(0.06, 'h'),
                          height: RSize(0.06, 'h'),
                        }}
                      />{' '}
                      {story.coins}
                    </Text>
                  </Chip>
                </View>
              </Card>
            </TouchableHighlight>
          </View>
        </>
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
  title: {
    marginLeft: RSize(0.015),
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.03),
    textAlign: 'left',
  },
  title2: {
    marginLeft: RSize(0.015),
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
    margin: RSize(0.02, 'h'),
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

export default Carrera;

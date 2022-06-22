import React from 'react';
import {StyleSheet, View, StatusBar, Image, Text} from 'react-native';
import Images from '../assets/images/images';
import {RSize} from './responsive';
import {Button} from 'react-native-paper';

const PainLayout = (props: {
  object: any;
  objectType: string;
  navigation: any;
}) => {
  const object = props.object;
  const objectType = props.objectType;
  const navigation = props.navigation;
  const nRows = object.grid[0];
  const nCols = object.grid[1];
  const xi = object.start[0];
  const yi = object.start[1];
  const xf = object.end[0];
  const yf = object.end[1];

  function Next() {
    navigation?.push('ResultadoFinal');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    topPad: {
      flex: yi,
    },
    bottomPad: {
      flex: nRows - yf,
    },
    horizontalContainer: {
      flex: yf - yi,
      flexDirection: 'row',
    },
    leftPad: {
      flex: xi,
    },
    rightPad: {
      flex: nCols - xf,
    },
    objectContainer: {
      flex: xf - xi,
      flexDirection: 'column',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.topPad} />
      <View style={styles.horizontalContainer}>
        <View style={styles.leftPad} />
        <View style={styles.objectContainer}>
          {/* Aquí va la cosa centrada en la grid */}
          {/* objectType = 'character' -> image  */}
          {objectType === 'character' ? (
            <Image
              style={objectStyles.characterImage}
              resizeMode="contain"
              source={Images.character[object.name][object.mood]}
            />
          ) : (
            <View />
          )}
          {/* objectType = 'message' -> hace message box -> layout con objectType text  */}
          {objectType === 'message' ? (
            <View style={objectStyles.messageBox}>
              {object.text.map((text: any, index: number) => {
                return (
                  <View
                    style={objectStyles.textBox}
                    key={object.text + index.toString()}>
                    <PainLayout
                      object={text}
                      objectType={'text'}
                      navigation={navigation}
                    />
                  </View>
                );
              })}
              {/* <StoryLayout object={object.text} objectType={'text'} /> */}
            </View>
          ) : (
            <View />
          )}
          {/* objectType = 'text' -> text  */}
          {objectType === 'text' ? (
            <View style={objectStyles.textBox}>
              <Text style={objectStyles.baseText}>
                {object.message
                  .split('*')
                  .map((word: string, index: number) => {
                    return (
                      <Text
                        style={
                          index % 2 === 1
                            ? objectStyles.oddText
                            : objectStyles.evenText
                        }
                        key={word}>
                        {word}
                      </Text>
                    );
                  })}
              </Text>
            </View>
          ) : (
            <View />
          )}
          {/* objectType = 'bubble' -> image  */}
          {objectType === 'bubble' ? (
            <Image
              style={objectStyles.characterImage}
              resizeMode="contain"
              source={Images.bubbles[object.name]}
            />
          ) : (
            <View />
          )}
          {/* objectType = 'answers' ->   */}
          {/* objectType = 'button' -> hace boton y le mete navigation hacia la vista indicada */}
          {objectType === 'button' ? (
            <Button
              icon={object.icon}
              labelStyle={objectStyles.iconStyle}
              mode="contained"
              color={object.color}
              contentStyle={objectStyles.contentStyle}
              style={objectStyles.buttonStyle}
              onPress={() => Next()}>
              <Text style={objectStyles.textStyle}>{object.text}</Text>
            </Button>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.rightPad} />
      </View>
      <View style={styles.bottomPad} />
    </View>
  );
};

export default PainLayout;

const objectStyles = StyleSheet.create({
  characterImage: {
    height: '100%',
    alignSelf: 'center',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
  },
  messageBox: {
    flex: 1,
    borderRadius: RSize(0.08, 'h'),
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    // justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.05, 'h'),
  },
  oddText: {
    color: '#5C9DEC',
  },
  evenText: {
    color: '#063D69',
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: RSize(0.08, 'h'),
    justifyContent: 'center',
    color: 'white',
  },
  textStyle: {
    fontSize: RSize(0.05, 'h'),
    textTransform: 'none',
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  buttonStyle: {
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: 'center',
  },
  contentStyle: {
    flexDirection: 'row-reverse',
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {RSize} from '../../utils/responsive';
import {ErrorViewProps} from '../../types/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ErrorView = ({navigation}: ErrorViewProps) => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>
        <Icon
          name="emoticon-sad-outline"
          size={RSize(0.3, 'h')}
          color="#FF8A01"
        />
        {'\n'}
        Ocurrió algo inesperado :(
      </Text>
      <Button
        style={styles.button}
        color="#FF8A01"
        mode="contained"
        onPress={() => navigation.navigate('InicioView')}>
        <Text style={styles.textButton}>Intentar de Nuevo</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: RSize(0.07, 'h'),
    textAlign: 'center',
    marginLeft: RSize(0.03, 'w'),
    marginRight: RSize(0.03, 'w'),
    marginBottom: RSize(0.04, 'h'),
    color: '#063D69',
  },
  button: {
    // borderRadius: 5,
    borderRadius: RSize(0.01, 'w'),
    width: RSize(0.6, 'h'),
    alignSelf: 'center',
  },
  textButton: {
    marginLeft: 10,
    fontSize: RSize(0.04, 'h'),
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default ErrorView;

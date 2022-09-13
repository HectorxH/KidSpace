import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {IPosition} from '../../types/activity';

const Layout = (props: {position: IPosition; ObjectView: any}) => {
  const position = props.position;
  const nRows = 20;
  const nCols = 20;
  const xi = position.start[0];
  const yi = position.start[1];
  const xf = position.end[0];
  const yf = position.end[1];

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
      // backgroundColor: 'red',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.topPad} />
      <View style={styles.horizontalContainer}>
        <View style={styles.leftPad} />
        <View style={styles.objectContainer}>{props.ObjectView}</View>
        <View style={styles.rightPad} />
      </View>
      <View style={styles.bottomPad} />
    </View>
  );
};

export default Layout;

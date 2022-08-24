import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

const Layout = (props: {object: any; ObjectView: any}) => {
  const object = props.object;
  const nRows = 20;
  const nCols = 20;
  const xi = object.start[0];
  const yi = object.start[1];
  const xf = object.end[0];
  const yf = object.end[1];

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

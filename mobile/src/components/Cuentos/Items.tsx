import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';
import Layout from '../Utils/Layout';

interface ItemsProps {
  images: [{name: string; start: Int32Array; end: Int32Array}] | 'none';
}

const Items = ({images}: ItemsProps) => {
  if (images === 'none') {
    return null;
  }

  return (
    <View style={styles.container}>
      {images.map(
        (item: {name: string; start: Int32Array; end: Int32Array}) => {
          return (
            <View
              style={styles.overlay}
              key={
                item.name +
                item.start[0].toString() +
                item.start[1].toString() +
                item.end[0].toString() +
                item.end[1].toString()
              }>
              <Layout
                object={item}
                ObjectView={
                  <Image
                    style={styles.image}
                    // resizeMode="cover"
                    resizeMode="contain"
                    source={Images.items[item.name]}
                  />
                }
              />
            </View>
          );
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});

export default Items;

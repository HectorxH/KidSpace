import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Images from '../../assets/images/images';
import Layout from '../Utils/Layout';
import {IImages} from '../../types/activity';
import {getImageStyle} from './utils';

interface ItemsProps {
  images: IImages[] | never[];
  resize?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
  specialTexture: string;
}

const Items = ({images, resize, specialTexture}: ItemsProps) => {
  if (typeof images === 'undefined' || images.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      {images.map((item: IImages) => {
        const imageStyles = getImageStyle(styles.image, item.settings);
        return (
          <View
            style={styles.overlay}
            key={
              item.name +
              item.position.start[0].toString() +
              item.position.start[1].toString() +
              item.position.end[0].toString() +
              item.position.end[1].toString()
            }>
            <Layout
              position={item.position}
              ObjectView={
                <Image
                  // style={styles.image}
                  style={imageStyles.settings}
                  // resizeMode="cover"
                  resizeMode={
                    typeof resize !== 'undefined'
                      ? resize
                      : typeof item.resize !== 'undefined'
                      ? item.resize
                      : 'contain'
                  }
                  source={
                    item.name !== '_diseño2_'
                      ? Images.items[item.name]
                      : Images.items[specialTexture]
                  }
                />
              }
            />
          </View>
        );
      })}
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
    opacity: 1,
  },
});

export default Items;

import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {IReceivingItems} from '../../../types/activity';
import Layout from '../../Utils/Layout';

interface MoonBlockProps {
  item: IReceivingItems;
  value: string;
  backgroundColor: string;
  fontColor: string;
}

const MoonBlock = (props: MoonBlockProps) => {
  const {fontScale} = useWindowDimensions();

  const value = props.item.value !== '' ? props.item.value : props.value;
  if (value === '') {
    return null;
  }
  console.log(value);
  const flapH = 1.0;
  const flapW = 0.78;
  const margen = 0.14;

  const x0 = props.item.position.start[0];
  const x1 = props.item.position.end[0];
  const y0 = props.item.position.start[1];
  const y1 = props.item.position.end[1];

  const topFlapPositionLeft = {
    start: [0, 0],
    end: [10 - (10 * flapW) / (x1 - x0), (20 * flapH) / (y1 - y0) + margen],
  };
  const topFlapPositionRight = {
    start: [10 + (10 * flapW) / (x1 - x0), 0],
    end: [20, (20 * flapH) / (y1 - y0) + margen],
  };

  const blockPosition = {
    start: [0, (20 * flapH) / (y1 - y0) - margen],
    end: [20, 20],
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {/* Code block  */}
        <View style={styles.overlay}>
          <Layout
            position={blockPosition}
            ObjectView={
              <View
                style={[
                  styles.moonBlock,
                  {backgroundColor: props.backgroundColor},
                ]}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: styles.textStyle.fontSize / fontScale,
                      color: props.fontColor,
                    },
                  ]}>
                  {value}
                </Text>
              </View>
            }
          />
        </View>
        {/* aleta superior izquierda */}
        <View style={styles.overlay}>
          <Layout
            position={topFlapPositionLeft}
            ObjectView={
              <View
                style={[
                  styles.topFlapLeft,
                  {backgroundColor: props.backgroundColor},
                ]}
              />
            }
          />
        </View>
        <View style={styles.overlay}>
          {/* aleta superior derecha */}
          <Layout
            position={topFlapPositionRight}
            ObjectView={
              <View
                style={[
                  styles.topFlapRight,
                  {backgroundColor: props.backgroundColor},
                ]}
              />
            }
          />
        </View>
      </View>
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
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#063D69',
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
  topFlapLeft: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#063D69',
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  topFlapRight: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#063D69',
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  moonBlock: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default MoonBlock;

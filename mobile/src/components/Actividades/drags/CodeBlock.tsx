import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {IReceivingItems} from '../../../types/activity';
import Layout from '../../Utils/Layout';

interface CodeBlockProps {
  item: IReceivingItems;
  value: string;
}

const CodeBlock = (props: CodeBlockProps) => {
  const {fontScale} = useWindowDimensions();

  const value = props.item.value !== '' ? props.item.value : props.value;
  if (value === '') {
    return null;
  }
  console.log(value);
  const flapH = 0.3;
  const flapW = 0.3;

  const margen = 0.02;
  const x0 = props.item.position.start[0];
  const x1 = props.item.position.end[0];
  const y0 = props.item.position.start[1];
  const y1 = props.item.position.end[1];

  const topFlapPositionLeft = {
    start: [0, 0],
    end: [(20 * 2 * flapW) / (x1 - x0), (20 * flapH) / (y1 - y0) + margen],
  };
  const topFlapPositionRight = {
    start: [
      (20 * 2 * flapW) / (x1 - x0) +
        ((2 * 20 * flapW) / (x1 - x0) - (20 * flapW) / (x1 - x0)),
      0,
    ],
    end: [20, (20 * flapH) / (y1 - y0) + margen],
  };

  const blockPosition = {
    start: [0, (20 * flapH) / (y1 - y0) - margen],
    end: [20, 20 - (20 * flapH) / (y1 - y0) + margen],
  };

  const bottomFlapPosition = {
    start: [
      (20 * 1.6 * flapW) / (x1 - x0),
      20 - (20 * flapH) / (y1 - y0) - margen,
    ],
    end: [(3.4 * 20 * flapW) / (x1 - x0), 20],
  };
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {/* top flaps  */}
        {/* aleta superior izquierda */}
        <View style={styles.overlay}>
          <Layout
            position={topFlapPositionLeft}
            ObjectView={
              <View style={styles.container}>
                <View
                  style={[
                    styles.topFlapLeft,
                    {
                      borderBottomColor:
                        value !== 'Comer' ? '#FFAD45' : '#FF514F',
                    },
                  ]}
                />
              </View>
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
                  {
                    borderBottomColor:
                      value !== 'Comer' ? '#FFAD45' : '#FF514F',
                  },
                ]}
              />
            }
          />
        </View>
        {/* Code block  */}
        <View style={styles.overlay}>
          <Layout
            position={blockPosition}
            ObjectView={
              <View
                style={[
                  styles.codeBlock,
                  {
                    backgroundColor: value !== 'Comer' ? '#FFAD45' : '#FF514F',
                  },
                ]}>
                <Text
                  style={[
                    styles.textStyle,
                    {fontSize: styles.textStyle.fontSize / fontScale},
                  ]}>
                  {value}
                </Text>
              </View>
            }
          />
        </View>
        {/* aleta inferior */}
        <View style={styles.overlay}>
          <Layout
            position={bottomFlapPosition}
            ObjectView={
              <View
                style={[
                  styles.bottomFlap,
                  {
                    borderTopColor: value !== 'Comer' ? '#FFAD45' : '#FF514F',
                  },
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
    fontSize: 12,
    color: '#FFFFFF',
    textTransform: 'none',
    fontFamily: 'Poppins-Bold',
  },
  topFlapLeft: {
    flex: 1,
    borderBottomWidth: 8,
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
  },
  topFlapRight: {
    flex: 1,
    borderBottomWidth: 8,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
  },
  codeBlock: {
    flex: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  bottomFlap: {
    borderTopWidth: 8,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    flex: 1,
  },
});

export default CodeBlock;

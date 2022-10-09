import React from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IReceivingItems} from '../../../../types/activity';
import {RSize} from '../../../../utils/responsive';
import Layout from '../../../Utils/Layout';

interface DraggableCodeBlockProps {
  item: IReceivingItems;
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  // receivingNames: [string[][][], ReactStateSetter<string[][][]>];
}

const DraggableCodeBlock = (props: DraggableCodeBlockProps) => {
  const {fontScale} = useWindowDimensions();
  // const [receivingNames, setReceivingNames] = props.receivingNames;
  const flapH = 0.5;
  const y0 = props.item.position.start[1];
  const y1 = props.item.position.end[1];

  const blockPosition = {
    start: [0, 0],
    end: [20, (20 * (y1 - y0)) / (y1 - y0 + flapH)],
  };

  return (
    <View style={styles.container}>
      <DraxView
        style={styles.dragContainer}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        payload={[props.dragNumber, props.itemNumber]}
        longPressDelay={10}>
        <View style={styles.overlay}>
          {/* code block  */}
          <View style={styles.overlay}>
            <Layout
              position={blockPosition}
              // position={props.item.position}
              ObjectView={
                <View style={styles.overlay}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          elevation: 15,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          width: 22,
                          borderBottomWidth: 10,
                          borderBottomColor:
                            props.item.value !== 'Comer'
                              ? '#FFAD45'
                              : '#FF514F',
                          borderRightWidth: 5,
                          borderRightColor: 'transparent',
                          borderStyle: 'solid',
                        }}
                      />
                      <View style={{width: 15}} />
                      <View
                        style={{
                          elevation: 15,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          flex: 1,
                          borderBottomWidth: 10,
                          borderBottomColor:
                            props.item.value !== 'Comer'
                              ? '#FFAD45'
                              : '#FF514F',
                          borderLeftWidth: 5,
                          borderLeftColor: 'transparent',
                          borderStyle: 'solid',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        elevation: 15,
                        backgroundColor:
                          props.item.value !== 'Comer' ? '#FFAD45' : '#FF514F',
                        borderBottomLeftRadius: 5,
                        borderBottomRightRadius: 5,
                      }}>
                      <Text
                        style={[
                          styles.textStyle,
                          {fontSize: styles.textStyle.fontSize / fontScale},
                        ]}>
                        {props.item.value}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={{width: 20}} />
                      <View
                        style={{
                          elevation: 15,
                          width: 22,
                          borderTopWidth: 10,
                          borderTopColor:
                            props.item.value !== 'Comer'
                              ? '#FFAD45'
                              : '#FF514F',
                          borderLeftWidth: 5,
                          borderLeftColor: 'transparent',
                          borderRightWidth: 5,
                          borderRightColor: 'transparent',
                          borderStyle: 'solid',
                        }}
                      />
                    </View>
                  </View>
                </View>
              }
            />
          </View>
        </View>
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dragContainer: {
    flex: 1,
    elevation: 0.01,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '115%',
  },
  dragging: {
    opacity: 0,
    elevation: 0.01,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 0,
    opacity: 1,
  },
  defaultCodeBlock: {
    flex: 1,
    borderRadius: RSize(0.02, 'h'),
    borderWidth: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveCodeBlock: {
    backgroundColor: '#FFAD45',
    borderColor: '#EE8800',
  },
  functionCodeBlock: {
    backgroundColor: '#FF684F',
    borderColor: '#FF514F',
  },
  flapStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderTopWidth: 0,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'none',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableCodeBlock;

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
  // const [receivingNames, setReceivingNames] = props.receivingNames;

  const codeBlockStyles: {
    [key: string]: {
      backgroundColor: string;
      borderColor: string;
    };
  } = {
    move: styles.moveCodeBlock,
    function: styles.functionCodeBlock,
  };

  const dragStyle = [
    styles.defaultCodeBlock,
    codeBlockStyles.move,
    // codeBlockStyles[
    //   receivingNames[props.pageNumber][props.dragNumber][props.itemNumber]
    // ],
  ];

  const flapH = 0.5;
  const flapW = 0.5;

  const x0 = props.item.position.start[0];
  const x1 = props.item.position.end[0];
  const y0 = props.item.position.start[1];
  const y1 = props.item.position.end[1];

  const blockPosition = {
    start: [0, 0],
    end: [20, (20 * (y1 - y0)) / (y1 - y0 + flapH)],
  };

  const topFlapPosition = {
    start: [(20 * flapW) / (x1 - x0), 0],
    end: [(2 * 20 * flapW) / (x1 - x0), (20 * flapH) / (y1 - y0)],
  };

  const bottomFlapPosition = {
    start: [
      (20 * flapW) / (x1 - x0),
      (20 * (y1 - y0)) / (y1 - y0 + flapH + 0.1),
    ],
    end: [(2 * 20 * flapW) / (x1 - x0), 20],
  };
  return (
    <View style={styles.container}>
      <Layout
        position={{
          start: props.item.position.start,
          end: [props.item.position.end[0], props.item.position.end[1] + flapH],
        }}
        ObjectView={
          <DraxView
            style={styles.dragContainer}
            draggingStyle={styles.dragging}
            dragReleasedStyle={styles.dragging}
            hoverDraggingStyle={styles.hoverDragging}
            payload={props.itemNumber}
            longPressDelay={10}>
            <View style={styles.overlay}>
              {/* code block  */}
              <View style={styles.overlay}>
                <Layout
                  position={blockPosition}
                  // position={props.item.position}
                  ObjectView={
                    <View style={styles.overlay}>
                      <View style={dragStyle}>
                        <Text style={styles.textStyle}>{props.item.value}</Text>
                      </View>
                    </View>
                  }
                />
              </View>

              {/* top flap  */}
              {props.item.top && (
                <View style={styles.overlay}>
                  <Layout
                    position={topFlapPosition}
                    ObjectView={
                      <View
                        style={[
                          dragStyle,
                          styles.flapStyle,
                          {backgroundColor: '#F2F2F2'},
                        ]}
                      />
                    }
                  />
                </View>
              )}

              {/* bottom flap  */}
              {props.item.bottom && (
                <View style={styles.overlay}>
                  <Layout
                    position={bottomFlapPosition}
                    ObjectView={
                      <View
                        style={[
                          dragStyle,
                          styles.flapStyle,
                          // {elevation: 0.0001},
                        ]}
                      />
                    }
                  />
                </View>
              )}
            </View>
          </DraxView>
        }
      />
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
    // flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
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
    borderRadius: RSize(0.015, 'h'),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderTopWidth: 0,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.04, 'h'),
    color: '#FFFFFF',
    textTransform: 'none',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableCodeBlock;

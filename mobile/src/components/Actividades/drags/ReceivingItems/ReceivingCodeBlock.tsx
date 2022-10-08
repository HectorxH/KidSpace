import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggable} from '../../../../types/activity';
import {ReactStateSetter} from '../../../../types/others';
import {RSize} from '../../../../utils/responsive';
import Layout from '../../../Utils/Layout';

interface ReceivingCodeBlockProps {
  pageNumber: number;
  dragNumber: number;
  itemNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  draggable: IDraggable;
}

const ReceivingCodeBlock = (props: ReceivingCodeBlockProps) => {
  const {pageNumber, dragNumber, itemNumber, draggable} = props;
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [receivingNames, setReceivingNames] = props.receivingNames;

  const [itemFlaps, setItemFlaps] = useState<boolean[][]>(
    typeof draggable.receivingItems !== 'undefined'
      ? draggable.receivingItems.map(item => {
          let top = typeof item.top !== 'undefined' ? item.top : false;
          let bottom = typeof item.bottom !== 'undefined' ? item.bottom : false;
          return [top, bottom];
        })
      : [[]],
  );

  const codeBlockStyles: {
    [key: string]: {
      // borderWidth: number;
      // borderTopWidth: number;
      // borderBottomWidth: number;
      backgroundColor: string;
      borderColor: string;
    };
  } = {
    move: styles.moveCodeBlock,
    function: styles.functionCodeBlock,
  };

  const dragStyle = [
    styles.defaultCodeBlock,
    codeBlockStyles[receivingNames[pageNumber][dragNumber][itemNumber]],
  ];

  const flapH = 0.5;
  const flapW = 0.5;

  const x0 = draggable.receivingItems[itemNumber].position.start[0];
  const x1 = draggable.receivingItems[itemNumber].position.end[0];
  const y0 = draggable.receivingItems[itemNumber].position.start[1];
  const y1 = draggable.receivingItems[itemNumber].position.end[1];

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

  function checkAnswer(payload: number) {
    // Si el item tiene nombre -> fijo, no se modifica
    if (draggable.receivingItems[itemNumber].name !== '') {
      return;
    }

    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingNames = [...receivingNames];
    let newItemFlaps = [...itemFlaps];

    // Si no hay bloques previos no asigna
    console.log(itemNumber, itemFlaps[itemNumber - 1][1]);
    console.log(newItemFlaps);

    if (itemNumber > 0) {
      if (
        newItemFlaps[itemNumber - 1][1] === false ||
        newReceivingNames[pageNumber][dragNumber][itemNumber - 1] === ''
      ) {
        return;
      }
    }

    const answer = draggable.draggableItems[payload].value;

    newUserAnswers[pageNumber][dragNumber][itemNumber] =
      draggable.draggableItems[payload].value;
    newPickedAnswers[pageNumber][dragNumber][itemNumber] = 1;

    newItemFlaps[itemNumber][0] =
      typeof draggable.draggableItems[payload].top !== 'undefined'
        ? draggable.draggableItems[payload].top!
        : false;
    newItemFlaps[itemNumber][1] =
      typeof draggable.draggableItems[payload].bottom !== 'undefined'
        ? draggable.draggableItems[payload].bottom!
        : false;
    console.log(newItemFlaps[itemNumber][1]);
    console.log(newItemFlaps);
    console.log('\n');
    if (
      draggable.answer.includes(answer) &&
      draggable.answer.indexOf(answer) === itemNumber
    ) {
      newPickedAnswers[pageNumber][dragNumber][itemNumber] = 2;
    }

    if (draggable.receivingItems[itemNumber].name === '') {
      newReceivingNames[pageNumber][dragNumber][itemNumber] =
        draggable.draggableItems[payload].name;
    }

    setItemFlaps(newItemFlaps);
    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingNames(newReceivingNames);
  }

  function resetAnswer(receivingNumber: number) {
    if (receivingNumber >= draggable.receivingItems.length) {
      return;
    }

    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingNames = [...receivingNames];

    newUserAnswers[pageNumber][dragNumber][receivingNumber] = '';
    newPickedAnswers[pageNumber][dragNumber][receivingNumber] = 0;
    newReceivingNames[pageNumber][dragNumber][receivingNumber] =
      draggable.receivingItems[receivingNumber].name;

    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingNames(newReceivingNames);

    if (draggable.receivingItems[receivingNumber].name === '') {
      let newItemFlaps = [...itemFlaps];
      newItemFlaps[receivingNumber][0] =
        typeof draggable.receivingItems[receivingNumber].top !== 'undefined'
          ? draggable.receivingItems[receivingNumber].top!
          : false;
      newItemFlaps[receivingNumber][1] =
        typeof draggable.receivingItems[receivingNumber].bottom !== 'undefined'
          ? draggable.receivingItems[receivingNumber].bottom!
          : false;
      setItemFlaps(newItemFlaps);
      resetAnswer(receivingNumber + 1);
    }
  }

  return (
    <View style={styles.container}>
      <DraxView
        style={styles.container}
        receivingStyle={
          draggable.receivingItems[itemNumber].name === '' &&
          ((itemNumber > 0 && itemFlaps[itemNumber - 1][1]) || itemNumber === 0)
            ? // receivingNames[pageNumber][dragNumber][itemNumber - 1] !== '' &&
              styles.receivingHover
            : []
        }
        onTouchStart={() => {
          resetAnswer(itemNumber);
        }}
        onReceiveDragDrop={event => {
          checkAnswer(event.dragged.payload[1]);
        }}>
        <View style={styles.overlay}>
          {/* code block  */}
          <View style={styles.overlay}>
            <Layout
              position={blockPosition}
              // position={props.item.position}
              ObjectView={
                <View style={styles.overlay}>
                  <View
                    style={[
                      dragStyle,
                      userDragAnswers[pageNumber][dragNumber][itemNumber] ===
                        '' &&
                        draggable.receivingItems[itemNumber].value === '' && {
                          borderWidth: 0,
                          borderRadius: RSize(0.02, 'h'),
                        },
                    ]}>
                    <Text style={styles.textStyle}>
                      {draggable.receivingItems[itemNumber].name !== ''
                        ? draggable.receivingItems[itemNumber].value
                        : userDragAnswers[pageNumber][dragNumber][itemNumber]}
                    </Text>
                  </View>
                </View>
              }
            />
          </View>

          {/* top flap inicial  */}
          {itemNumber === 0 && itemFlaps[itemNumber][0] && (
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
          {/* top flap  */}
          {itemNumber > 0 &&
            itemFlaps[itemNumber - 1][1] &&
            itemFlaps[itemNumber][0] && (
              <View style={styles.overlay}>
                <Layout
                  position={topFlapPosition}
                  ObjectView={
                    <View
                      style={[
                        dragStyle,
                        styles.flapStyle,
                        codeBlockStyles[
                          receivingNames[pageNumber][dragNumber][itemNumber - 1]
                        ],
                      ]}
                    />
                  }
                />
              </View>
            )}

          {/* bottom flap  */}
          {itemFlaps[itemNumber][1] && (
            <View style={styles.overlay}>
              <Layout
                position={bottomFlapPosition}
                ObjectView={<View style={[dragStyle, styles.flapStyle]} />}
              />
            </View>
          )}
        </View>
      </DraxView>
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
  receivingHover: {
    borderColor: 'red',
    borderRadius: RSize(0.02, 'h'),
    borderWidth: 2,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.04, 'h'),
    color: '#FFFFFF',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
  defaultCodeBlock: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RSize(0.02, 'h'),
    borderWidth: 1,
  },
  moveCodeBlock: {
    // borderWidth: 2,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    backgroundColor: '#FFAD45',
    borderColor: '#EE8800',
  },
  functionCodeBlock: {
    // borderWidth: 2,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
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
});

export default ReceivingCodeBlock;

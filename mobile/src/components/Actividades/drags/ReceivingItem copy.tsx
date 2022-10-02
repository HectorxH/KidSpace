import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DraxView} from 'react-native-drax';
import {IDraggableItems, IReceivingItems} from '../../../types/activity';
import {ReactStateSetter} from '../../../types/others';
import {RSize} from '../../../utils/responsive';
import Layout from '../../Utils/Layout';

interface ReceivingItemsProps {
  pageNumber: number;
  dragNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  rightAnswers: string[];
  setResultColor: ReactStateSetter<string>;
  draggableItems: IDraggableItems[];
  receivingItems: IReceivingItems[];
  draggableType: string;
}

const ReceivingItems = (props: ReceivingItemsProps) => {
  const [userDragAnswers, setUserDragAnswers] = props.userDragAnswers;
  const [pickedDragAnswers, setPickedDragAnswers] = props.pickedDragAnswers;
  const [receivingNames, setReceivingNames] = props.receivingNames;

  const [itemFlaps, setItemFlaps] = useState<boolean[][]>(
    props.receivingItems.map(item => {
      let top = typeof item.top !== 'undefined' ? item.top : false;
      let bottom = typeof item.bottom !== 'undefined' ? item.bottom : false;
      return [top, bottom];
    }),
  );

  const answerRectangleStyles = [
    styles.receivingRectangleBase,
    styles.receivingRectangleWrong,
    styles.receivingRectangleRight,
  ];

  const codeBlockStyles: {
    [key: string]: {
      borderWidth: number;
      borderTopWidth: number;
      borderBottomWidth: number;
      backgroundColor: string;
      borderColor: string;
    };
  } = {
    move: styles.receivingMoveBlock,
    function: styles.receivingFunctionBlock,
  };

  function checkAnswer(
    answer: string,
    receivingNumber: number,
    payload: number,
  ) {
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingNames = [...receivingNames];
    newUserAnswers[props.pageNumber][props.dragNumber][receivingNumber] =
      props.draggableItems[payload].value;
    setUserDragAnswers(newUserAnswers);
    newPickedAnswers[props.pageNumber][props.dragNumber][receivingNumber] = 1;
    if (
      props.rightAnswers.includes(answer) &&
      props.rightAnswers.indexOf(answer) === receivingNumber
    ) {
      newPickedAnswers[props.pageNumber][props.dragNumber][receivingNumber] = 2;
    }
    if (props.receivingItems[receivingNumber].name === '') {
      newReceivingNames[props.pageNumber][props.dragNumber][receivingNumber] =
        props.draggableItems[payload].name;
    }
    console.log(newReceivingNames[props.pageNumber][props.dragNumber]);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingNames(newReceivingNames);

    if (props.receivingItems[receivingNumber].type === 'codeBlock') {
      let newItemFlaps = [...itemFlaps];
      newItemFlaps[receivingNumber][0] =
        typeof props.draggableItems[payload].top !== 'undefined'
          ? props.draggableItems[payload].top!
          : false;
      newItemFlaps[receivingNumber][1] =
        typeof props.draggableItems[payload].bottom !== 'undefined'
          ? props.draggableItems[payload].bottom!
          : false;
      setItemFlaps(newItemFlaps);
    }
  }

  function resetAnswer(receivingNumber: number) {
    if (receivingNumber >= props.receivingItems.length) {
      console.log('return');
      return;
    }
    let newUserAnswers = [...userDragAnswers];
    let newPickedAnswers = [...pickedDragAnswers];
    let newReceivingNames = [...receivingNames];
    newUserAnswers[props.pageNumber][props.dragNumber][receivingNumber] = '';
    newPickedAnswers[props.pageNumber][props.dragNumber][receivingNumber] = 0;
    newReceivingNames[props.pageNumber][props.dragNumber][receivingNumber] =
      props.receivingItems[receivingNumber].name;
    setUserDragAnswers(newUserAnswers);
    setPickedDragAnswers(newPickedAnswers);
    setReceivingNames(newReceivingNames);
    if (
      props.receivingItems[receivingNumber].type === 'codeBlock' &&
      props.receivingItems[receivingNumber].name === ''
    ) {
      let newItemFlaps = [...itemFlaps];
      newItemFlaps[receivingNumber][0] =
        typeof props.receivingItems[receivingNumber].top !== 'undefined'
          ? props.receivingItems[receivingNumber].top!
          : false;
      newItemFlaps[receivingNumber][1] =
        typeof props.receivingItems[receivingNumber].bottom !== 'undefined'
          ? props.receivingItems[receivingNumber].bottom!
          : false;
      setItemFlaps(newItemFlaps);
      console.log(itemFlaps);
      resetAnswer(receivingNumber + 1);
    }
  }

  return (
    <View style={styles.container}>
      {props.receivingItems.map((item, receivingNumber) => {
        const dragStyle = [
          styles.receivingBase,
          props.draggableType === 'color' ? styles.receivingCircle : {},

          props.draggableType === 'order' && item.type === 'rectangle'
            ? answerRectangleStyles[
                pickedDragAnswers[props.pageNumber][props.dragNumber][
                  receivingNumber
                ]
              ]
            : {},

          props.draggableType === 'order' && item.type === 'codeBlock'
            ? [
                styles.receivingDefaultBlock,
                codeBlockStyles[
                  receivingNames[props.pageNumber][props.dragNumber][
                    receivingNumber
                  ]
                ],
              ]
            : {},
        ];
        return (
          <View style={styles.overlay}>
            <View
              style={styles.overlay}
              key={item.value + props.dragNumber + item.name + receivingNumber}>
              <Layout
                position={item.position}
                ObjectView={
                  <DraxView
                    style={dragStyle}
                    receivingStyle={[
                      dragStyle,
                      receivingNumber > 0 &&
                        receivingNames[props.pageNumber][props.dragNumber][
                          receivingNumber - 1
                        ] !== '' &&
                        itemFlaps[receivingNumber - 1][1] &&
                        styles.receivingHover,
                      item.type !== 'codeBlock' && styles.receivingHover,
                    ]}
                    onTouchStart={() => {
                      resetAnswer(receivingNumber);
                    }}
                    onReceiveDragDrop={event => {
                      ((item.type === 'codeBlock' &&
                        receivingNumber > 0 &&
                        receivingNames[props.pageNumber][props.dragNumber][
                          receivingNumber - 1
                        ] !== '' &&
                        itemFlaps[receivingNumber - 1][1]) ||
                        item.type !== 'codeBlock') &&
                        checkAnswer(
                          props.draggableItems[event.dragged.payload].value,
                          receivingNumber,
                          event.dragged.payload,
                        );
                    }}>
                    {props.draggableType === 'order' && (
                      <Text style={styles.textStyle}>
                        {item.name !== ''
                          ? item.value
                          : userDragAnswers[props.pageNumber][props.dragNumber][
                              receivingNumber
                            ]}
                      </Text>
                    )}
                  </DraxView>
                }
              />
            </View>
            <View style={styles.overlay}>
              {item.type === 'codeBlock' && itemFlaps[receivingNumber][0] && (
                <Layout
                  position={{
                    start: [
                      item.position.start[0] + 0.5,
                      item.position.start[1],
                    ],
                    end: [
                      item.position.start[0] + 1,
                      item.position.start[1] + 0.5,
                    ],
                  }}
                  ObjectView={
                    <View
                      style={[
                        dragStyle,
                        styles.flapStyle,
                        {backgroundColor: '#F2F2F2', elevation: 0},
                      ]}
                    />
                  }
                />
              )}
            </View>
            <View style={styles.overlay}>
              {item.type === 'codeBlock' && itemFlaps[receivingNumber][1] && (
                <Layout
                  position={{
                    start: [
                      item.position.start[0] + 0.5,
                      item.position.end[1] - 0.05,
                    ],
                    end: [
                      item.position.start[0] + 1,
                      item.position.end[1] + 0.5,
                    ],
                  }}
                  ObjectView={
                    <View
                      style={[dragStyle, styles.flapStyle, {elevation: 0.001}]}
                    />
                  }
                />
              )}
            </View>
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
  },
  receivingHover: {
    borderColor: 'red',
    borderWidth: 2,
  },
  receivingBase: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingRectangleBase: {
    borderColor: '#878787',
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
  },
  receivingRectangleWrong: {
    borderColor: '#D22323',
    borderWidth: 3,
    backgroundColor: '#EA6A6A',
  },
  receivingRectangleRight: {
    borderColor: '#2BAB1F',
    borderWidth: 3,
    backgroundColor: '#A1C96A',
  },
  receivingCircle: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
  },
  receivingDefaultBlock: {
    borderRadius: RSize(0.02, 'h'),
  },
  receivingMoveBlock: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FFAD45',
    borderColor: '#EE8800',
  },
  receivingFunctionBlock: {
    borderWidth: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
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

export default ReceivingItems;

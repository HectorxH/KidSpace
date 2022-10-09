import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RSize} from '../../utils/responsive';
import {ReactStateSetter} from '../../types/others';
import {IDraggable} from '../../types/activity';
import ReceivingItem from './drags/ReceivingItem';
import DraggableItem from './drags/DraggableItem';
import Layout from '../Utils/Layout';

interface DraggableProps {
  pageNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  pickedDragAnswersIndex: [number[][][], ReactStateSetter<number[][][]>];
  isDragItemPicked: [boolean[][][], ReactStateSetter<boolean[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  receivingValues: [string[][][], ReactStateSetter<string[][][]>];
  draggable: IDraggable[] | never[];
}

const Draggable = (props: DraggableProps) => {
  const [resultColor, setResultColor] = React.useState<string>('white');

  if (props.draggable.length === 0) {
    return null;
  }

  const flapH = 0.5; // coso para codeblock, temporal

  return (
    <View style={styles.container}>
      {props.draggable.map((draggable: IDraggable, dragNumber) => {
        return (
          <View
            style={styles.overlay}
            key={
              draggable.answer.reduce((x, y) => x + y, '') +
              dragNumber +
              draggable.type
            }>
            <View style={styles.overlay}>
              {/* Targets del drag */}
              <View style={styles.overlay}>
                {typeof draggable.receivingItems !== 'undefined' &&
                  draggable.receivingItems.map((item, itemNumber) => {
                    return (
                      <View
                        style={styles.overlay}
                        key={item.value + dragNumber + item.name + itemNumber}>
                        <Layout
                          position={{
                            start: item.position.start,
                            end: [
                              item.position.end[0],
                              item.type === 'codeBlock'
                                ? item.position.end[1] + flapH
                                : item.position.end[1],
                            ],
                          }}
                          ObjectView={
                            <ReceivingItem
                              dragNumber={dragNumber}
                              pageNumber={props.pageNumber}
                              itemNumber={itemNumber}
                              userDragAnswers={props.userDragAnswers}
                              pickedDragAnswers={props.pickedDragAnswers}
                              pickedDragAnswersIndex={
                                props.pickedDragAnswersIndex
                              }
                              isDragItemPicked={props.isDragItemPicked}
                              receivingNames={props.receivingNames}
                              receivingValues={props.receivingValues}
                              setResultColor={setResultColor}
                              draggable={draggable}
                            />
                          }
                        />
                      </View>
                    );
                  })}
              </View>
              {/* Cosas que drageo hacia los target */}
              <View style={styles.overlay}>
                {typeof draggable.draggableItems !== 'undefined' &&
                  draggable.draggableItems.map((item, itemNumber) => {
                    return (
                      <View
                        style={styles.overlay}
                        key={item.value + dragNumber + item.name + itemNumber}>
                        <Layout
                          position={{
                            start: item.position.start,
                            end: [
                              item.position.end[0],
                              item.type === 'codeBlock'
                                ? item.position.end[1] + flapH
                                : item.position.end[1],
                            ],
                          }}
                          ObjectView={
                            <DraggableItem
                              item={item}
                              pageNumber={props.pageNumber}
                              dragNumber={dragNumber}
                              itemNumber={itemNumber}
                              isDragItemPicked={props.isDragItemPicked[0]}
                            />
                          }
                        />
                      </View>
                    );
                  })}
              </View>

              {/* En el caso de los colores se agrega un circulo con el color resultante, mejorar */}
              {draggable.type === 'color' && (
                <Layout
                  position={{start: [16.75, 9], end: [18.75, 13]}}
                  ObjectView={
                    <View
                      style={[
                        styles.resultCircle,
                        {backgroundColor: resultColor},
                      ]}
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
  overlayTest: {
    flex: 1,
    position: 'absolute',
    opacity: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
  resultCircle: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
    borderColor: '#B5B5B5',
    borderWidth: 3,
  },
  test: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
  },
});

export default Draggable;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider} from 'react-native-drax';
import {RSize} from '../../utils/responsive';
import {ReactStateSetter} from '../../types/others';
import {IDraggable} from '../../types/activity';
import ReceivingItem from './drags/ReceivingItem';
import DraggableItem from './drags/DraggableItem';

interface DraggableProps {
  pageNumber: number;
  userDragAnswers: [string[][][], ReactStateSetter<string[][][]>];
  pickedDragAnswers: [number[][][], ReactStateSetter<number[][][]>];
  receivingNames: [string[][][], ReactStateSetter<string[][][]>];
  draggable: IDraggable[] | never[];
}

const Draggable = (props: DraggableProps) => {
  const [resultColor, setResultColor] = React.useState<string>('white');

  if (props.draggable.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {props.draggable.map((draggable: IDraggable, dragNumber) => {
        return (
          <View
            style={styles.overlay}
            key={
              draggable.answer.reduce((x, y) => x + y) +
              dragNumber +
              draggable.type
            }>
            <GestureHandlerRootView style={styles.container}>
              <DraxProvider>
                <View style={styles.overlay}>
                  {/* Targets del drag */}
                  {draggable.receivingItems.map((item, itemNumber) => {
                    return (
                      <View
                        style={styles.overlay}
                        key={item.value + dragNumber + item.name + itemNumber}>
                        <ReceivingItem
                          dragNumber={dragNumber}
                          pageNumber={props.pageNumber}
                          itemNumber={itemNumber}
                          userDragAnswers={props.userDragAnswers}
                          pickedDragAnswers={props.pickedDragAnswers}
                          receivingNames={props.receivingNames}
                          setResultColor={setResultColor}
                          draggable={draggable}
                        />
                      </View>
                    );
                  })}
                  {/* Cosas que drageo hacia los target */}
                  <View style={styles.overlay}>
                    {draggable.draggableItems.map((item, itemNumber) => {
                      return (
                        <View
                          style={styles.overlay}
                          key={
                            item.value + dragNumber + item.name + itemNumber
                          }>
                          <DraggableItem
                            item={item}
                            pageNumber={props.pageNumber}
                            dragNumber={dragNumber}
                            itemNumber={itemNumber}
                          />
                        </View>
                      );
                    })}
                  </View>

                  {/* En el caso de los colores se agrega un circulo con el color resultante, mejorar */}
                  {draggable.type === 'color' && (
                    <View
                      style={[
                        styles.resultCircle,
                        {backgroundColor: resultColor},
                      ]}
                    />
                  )}
                </View>
              </DraxProvider>
            </GestureHandlerRootView>
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

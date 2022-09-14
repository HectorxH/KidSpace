import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import {RSize} from '../../utils/responsive';
import Images from '../../assets/images/images';
import {ReactStateSetter} from '../../types/others';

interface DraggableProps {
  pageNumber: number;
  userDragAnswers: [string[], ReactStateSetter<string[]>];
}

const gestureRootViewStyle = {flex: 1};

const Draggable = (props: DraggableProps) => {
  const draggableItemList = [
    {
      id: 0,
      name: 'negro',
      background_color: 'black',
    },
    {
      id: 1,
      name: 'blanco',
      background_color: 'white',
    },
    {
      id: 2,
      name: 'rojo',
      background_color: '#FF1616',
    },
    {
      id: 3,
      name: 'azul',
      background_color: '#0098D5',
    },
    {
      id: 4,
      name: 'amarillo',
      background_color: '#FFE700',
    },
  ];

  const FirstReceivingItemList = [
    {
      id: 5,
      name: 'blanco',
      background_color: 'white',
    },
    {
      id: 6,
      name: 'blanco',
      background_color: 'white',
    },
  ];

  const [receivingItemList, setReceivedItemList] = React.useState(
    FirstReceivingItemList,
  );

  const [resultColor, setResultColor] = React.useState('white');

  const colores = [
    'tempera_negra',
    'tempera_blanca',
    'tempera_roja',
    'tempera_azul',
    'tempera_amarilla',
    'tempera_azul',
    'tempera_blanca',
  ];

  const colorResult = (newReceivingItemList: any) => {
    console.log(newReceivingItemList);
    const first = newReceivingItemList[0].name;
    const second = newReceivingItemList[1].name;
    const colors = first.concat(second);
    let color = 'white';
    switch (colors) {
      case 'azulnegro':
      case 'negroazul':
        color = '#216079';
        break;
      case 'azulblanco':
      case 'blancoazul':
        color = '#9EF3FF';
        break;
      case 'azulrojo':
      case 'rojoazul':
        color = '#A31B95';
        break;
      case 'azulamarillo':
      case 'amarilloazul':
        color = '#31C852';
        break;
      case 'azulazul':
        color = '#0098D5';
        break;

      case 'blanconegro':
      case 'negroblanco':
        color = '#DADADA';
        break;
      case 'blancoblanco':
        color = 'white';
        break;
      case 'blancorojo':
      case 'rojoblanco':
        color = '#FFAFAD';
        break;
      case 'blancoamarillo':
      case 'amarilloblanco':
        color = '#FFF6A4';
        break;

      case 'negronegro':
        color = 'black';
        break;
      case 'negrorojo':
      case 'rojonegro':
        color = '#63313C';
        break;
      case 'negroamarillo':
      case 'amarillonegro':
        color = '#736C27';
        break;

      case 'rojorojo':
        color = '#FF1616';
        break;
      case 'rojoamarillo':
      case 'amarillorojo':
        color = '#ED801C';
        break;

      case 'amarilloamarillo':
        color = '#FFE700';
        break;
    }
    let userAnswers = [...props.userDragAnswers[0]];
    userAnswers[props.pageNumber] = color;
    props.userDragAnswers[1](userAnswers);

    setResultColor(color);
  };

  const DragUIComponent = ({_, index}: any) => {
    return (
      <DraxView
        style={styles.draggableCircle}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={10}
        key={index}>
        <Image style={styles.tempera} source={Images.items[colores[index]]} />
      </DraxView>
    );
  };

  const ReceivingZoneUIComponent = ({item, index}: any) => {
    return (
      <DraxView
        style={[styles.receivingZone, {backgroundColor: item.background_color}]}
        receivingStyle={styles.receiving}
        key={index}
        onReceiveDragDrop={event => {
          let selected_item = draggableItemList[event.dragged.payload];
          let newReceivingItemList = [...receivingItemList];
          newReceivingItemList[index] = selected_item;
          setReceivedItemList(newReceivingItemList);
          colorResult(newReceivingItemList);
        }}
      />
    );
  };

  const FlatListItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <DraxProvider>
        <View style={styles.container}>
          <View style={styles.receivingContainer}>
            {receivingItemList.map((item, index) =>
              ReceivingZoneUIComponent({item, index}),
            )}
            <View
              style={[styles.resultCircle, {backgroundColor: resultColor}]}
            />
          </View>
          <View style={styles.draxListContainer}>
            <DraxList
              data={draggableItemList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={5}
              ItemSeparatorComponent={FlatListItemSeparator}
            />
          </View>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  receivingZone: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '19%',
    borderColor: '#B5B5B5',
    borderWidth: 3,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  tempera: {
    height: RSize(0.125, 'w'),
    width: RSize(0.125, 'h'),
    opacity: 1,
  },
  draggableCircle: {
    flex: 1,
    justifyContent: 'center',
    marginRight: RSize(0.1, 'h'),
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 0,
    opacity: 1,
  },
  receivingContainer: {
    flex: 1,
    marginTop: '18%',
    marginBottom: '15%',
    marginLeft: '40%',
    marginRight: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemSeparator: {
    height: 15,
  },
  resultCircle: {
    height: RSize(0.1, 'w'),
    width: RSize(0.1, 'w'),
    borderRadius: RSize(0.1, 'w') / 2,
    borderColor: '#B5B5B5',
    borderWidth: 3,
  },
  draxListContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingRight: RSize(0.02, 'h'),
    paddingBottom: RSize(0.013, 'w'),
  },
});

export default Draggable;

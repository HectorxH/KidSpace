import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {DraxView} from 'react-native-drax';
import {RSize} from '../../../../utils/responsive';

interface DraggableRectangleProps {
  value: string;
}

const DraggableRectangle = (props: DraggableRectangleProps) => {
  const {value} = props;
  return (
    <View style={styles.container}>
      <DraxView
        style={styles.draggableCircle}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        // dragPayload={props.index}
        payload={props.index}
        longPressDelay={10}>
        {(props.item.type === 'image' && (
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={Images.items[props.item.name]}
          />
        )) ||
          (props.item.type === 'rectangle' && (
            <DraggableRectangle value={props.item.value} />
          )) ||
          (props.item.type === 'codeBlock' && (
            <DraggableCodeBlock
              value={props.item.value}
              pageNumber={0}
              dragNumber={0}
              itemNumber={0}
              start={props.item.position.start}
              end={props.item.position.end} // receivingNames={}
            />
          ))}
      </DraxView>

      <Text style={styles.textStyle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 10,
    height: '100%',
    width: '100%',
    backgroundColor: '#5C9DEC',
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: RSize(0.045, 'h'),
    textTransform: 'none',
    color: 'white',
    elevation: 11,
    fontFamily: 'Poppins-Bold',
  },
});

export default DraggableRectangle;

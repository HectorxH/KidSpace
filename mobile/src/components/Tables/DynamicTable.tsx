import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Col,
  Cols,
} from 'react-native-table-component';
import {Dimensions} from 'react-native';
import CellMenu from './CellMenu';

const dim = Dimensions.get('window');
const width = dim.width;
const height = dim.height;

const DynamicTable = props => {
  const [answersCount, setAnswersCount] = props.answersCount;
  const tableTitle = ['1', '2', '3', '4'];
  const tableData = [
    ['Margarita', 'Girasol', 'Iris'],
    [
      <CellMenu correct={9} answersCount={[answersCount, setAnswersCount]} />,
      <CellMenu correct={7} answersCount={[answersCount, setAnswersCount]} />,
      <CellMenu correct={4} answersCount={[answersCount, setAnswersCount]} />,
    ],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topPad} />
      <View style={styles.tableContainer}>
        <Table
          style={{flexDirection: 'row'}}
          borderStyle={{borderWidth: 4, borderColor: '#169C34'}}>
          <TableWrapper style={{width: width / 9}}>
            <Cell data="" style={styles.singleHead} />
            <TableWrapper style={{flexDirection: 'row'}}>
              <Col
                data={tableTitle}
                style={styles.outerTitle}
                heightArr={[height / 10, height / 7, height / 7, height / 7]}
                textStyle={styles.numberText}
              />
            </TableWrapper>
          </TableWrapper>

          <TableWrapper style={{flex: 1}}>
            <Row
              data={['A', 'B']}
              style={styles.outerTitle}
              textStyle={styles.text}
            />
            <Row
              data={['Flores', 'Cantidades']}
              style={styles.innerTitle}
              textStyle={styles.titleText}
            />
            <Cols
              data={tableData}
              heightArr={[height / 7, height / 7, height / 7]}
              style={styles.data}
              textStyle={styles.dataText}
            />
          </TableWrapper>
        </Table>
      </View>
      <View style={styles.bottomPad} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // marginVertical: 0,
    // marginVertical: height / 6,
    marginHorizontal: width / 4,
  },
  topPad: {
    flex: 6,
  },
  tableContainer: {
    flex: 22,
    backgroundColor: 'white',
  },
  bottomPad: {
    flex: 7,
  },

  singleHead: {
    width: width / 9,
    height: height / 10,
    backgroundColor: '#F1F3F8',
  },
  innerTitle: {flex: 1, backgroundColor: '#A1C96A'},
  outerTitle: {flex: 1, backgroundColor: '#F1F3F8'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  titleText: {textAlign: 'center', fontFamily: 'Poppins-Bold', color: 'white'},
  text: {textAlign: 'center'},
  numberText: {
    textAlign: 'center',
    color: '#063D69',
    fontFamily: 'Poppins-Regular',
  },
  dataText: {textAlign: 'center', color: '#063D69', fontFamily: 'Poppins-Bold'},
});

export default DynamicTable;

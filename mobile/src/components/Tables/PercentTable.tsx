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

const dim = Dimensions.get('window');
const width = dim.width;
const height = dim.height;

const PercentTable = () => {
  const tableTitle = ['1', '2', '3', '4', '5'];
  const tableData = [
    ['Margarita', 'Girasol', 'Iris', 'Total'],
    ['9', '7', '4', '20'],
    ['45%', '35%', '20%', ''],
  ];

  return (
    <View style={styles.container}>
      <Table
        style={{flexDirection: 'row'}}
        borderStyle={{borderWidth: 4, borderColor: '#169C34'}}>
        {/* Left Wrapper */}
        <TableWrapper style={{width: width / 9}}>
          <Cell data="" style={styles.singleHead} />
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col
              data={tableTitle}
              style={styles.outerTitle}
              heightArr={[height / 10, height / 8, height / 8, height / 8, height / 8]}
              textStyle={styles.numberText}
            />
          </TableWrapper>
        </TableWrapper>

        {/* Right Wrapper */}
        <TableWrapper style={{flex: 1}}>
          <Row
            data={['A', 'B', 'C']}
            style={styles.outerTitle}
            textStyle={styles.text}
          />
          <Row
            data={['Flores', 'Cantidades', '']}
            style={styles.innerTitle}
            textStyle={styles.titleText}
          />
          <Cols
            data={tableData}
            heightArr={[height / 8, height / 8, height / 8, height / 8]}
            textStyle={styles.dataText}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: height / 8,
    marginHorizontal: width / 4,
    backgroundColor: 'white',
  },
  singleHead: {
    width: width / 9,
    height: height / 10,
    backgroundColor: '#F1F3F8',
  },
  innerTitle: {flex: 1, backgroundColor: '#A1C96A'},
  outerTitle: {flex: 1, backgroundColor: '#F1F3F8'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  titleText: {textAlign: 'center', fontFamily: 'Poppins-Bold', color: 'white', fontSize: 12},
  text: {textAlign: 'center'},
  numberText: {
    textAlign: 'center',
    color: '#063D69',
    fontFamily: 'Poppins-Regular',
  },
  dataText: {textAlign: 'center', color: '#063D69', fontFamily: 'Poppins-Bold'},
});

export default PercentTable;

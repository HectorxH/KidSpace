import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Col,
  Cols,
} from 'react-native-table-component';
import {RSize} from '../../utils/responsive';

const cellHeight = RSize(1 / 8, 'h');
const cellWidth = RSize(1 / 9, 'w');
const headerHeight = RSize(1 / 10, 'h');

const TotalTable = () => {
  const tableTitle = ['1', '2', '3', '4', '5'];
  const tableData = [
    ['Margarita', 'Girasol', 'Iris', 'Total'],
    ['9', '7', '4', '20'],
  ];

  return (
    <View style={styles.container}>
      <Table
        style={{flexDirection: 'row'}}
        borderStyle={{borderWidth: 4, borderColor: '#169C34'}}>
        {/* Left Wrapper */}
        <TableWrapper style={{width: cellWidth}}>
          <Cell data="" style={styles.singleHead} />
          <TableWrapper style={{flexDirection: 'row'}}>
            <Col
              data={tableTitle}
              style={styles.outerTitle}
              heightArr={[
                headerHeight,
                cellHeight,
                cellHeight,
                cellHeight,
                cellHeight,
              ]}
              textStyle={styles.numberText}
            />
          </TableWrapper>
        </TableWrapper>

        {/* Right Wrapper */}
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
            heightArr={[cellHeight, cellHeight, cellHeight, cellHeight]}
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
    // marginVertical: RSize(0.125, 'h'),
    // marginHorizontal: RSize(0.25, 'w'),
    backgroundColor: 'white',
  },
  singleHead: {
    width: cellWidth,
    height: headerHeight,
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

export default TotalTable;

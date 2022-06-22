import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {RSize} from '../../utils/responsive';
import ContinueButton from '../IntroductoryChallenge/ContinueButton';
import Activities from '../../assets/activities/activities';
import PercentTable from '../Tables/PercentTable';
import TotalTable from '../Tables/TotalTable';
import ConclusionText from './ConclusionText';
import {ConclusionProps} from '../../types/navigation';

// import FinalQuizQuestion from './FinalQuizQuestion';

const Conclusion = ({navigation, route}: ConclusionProps) => {
  const prop = route.params;
  const actividad = prop.actividad;
  const tipo = prop.tipo;
  const [numPag, setNumPag] = useState(0);
  const text1 =
    'Para calcular el total de las flores, en la celda B5 debemos poner *=SUMA(B2:B4)*';
  const text2 =
    'Para calcular el porcentaje de cada flor, tenemos que *dividir la cantidad de una flor entre el total de flores*';

  return (
    <View style={styles.verticalContainer}>
      <StatusBar hidden={true} />
      <View style={styles.overlay}>
        <ContinueButton
          answersCount={0}
          answersNum={0}
          settings={Activities[actividad][tipo].settings[1]}
          navigation={navigation}
          tipo={numPag === 0 ? 'conclusion' : 'conclusion2'}
          setNumPag={setNumPag}
        />
      </View>
      <View style={styles.topPad} />
      <View style={styles.horizontalContainer}>
        {numPag === 0 ? (
          <View style={styles.tableBody}>
            <TotalTable />
          </View>
        ) : (
          <View style={styles.tableBody}>
            <PercentTable />
          </View>
        )}
        <View style={styles.pad} />
        {numPag === 0 ? (
          <View style={styles.textBody}>
            <ConclusionText text={text1} />
          </View>
        ) : (
          <View style={styles.textBody}>
            <ConclusionText text={text2} />
          </View>
        )}
      </View>
      <View style={styles.bottomPad} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  verticalContainer: {
    height: '100%',
    flexDirection: 'column',
  },
  topPad: {
    flex: 3,
  },
  pad: {
    flex: 1,
  },
  horizontalContainer: {
    flex: 10,
    flexDirection: 'row',
    paddingHorizontal: RSize(0.05),
  },
  bottomPad: {
    flex: 1,
  },
  tableBody: {
    flex: 10,
  },
  textBody: {
    flex: 10,
  },
});

export default Conclusion;

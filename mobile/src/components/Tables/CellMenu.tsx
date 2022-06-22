import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ReactStateSetter} from '../../types/others';
import {RSize} from '../../utils/responsive';

const data = [
  {label: '7', value: '7'},
  {label: '4', value: '4'},
  {label: '9', value: '9'},
];

interface CellMenuProps {
  correct: number;
  answersCount: [number, ReactStateSetter<number>];
  value: [number | null, ReactStateSetter<number | null>];
  isCorrect: [boolean, ReactStateSetter<boolean>];
}

const CellMenu = (props: CellMenuProps) => {
  const [answersCount, setAnswersCount] = props.answersCount;

  const [isFocus, setIsFocus] = useState(false);
  // const [isCorrect, setIsCorrect] = useState(false);
  const [isCorrect, setIsCorrect] = props.isCorrect;
  const [value, setValue] = props.value;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Valor' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          console.log(item.value);
          console.log(props.correct);
          if (props.correct === parseInt(item.value, 10)) {
            console.log('correcto');
            if (isCorrect === false) {
              setAnswersCount(answersCount + 1);
            }
            setIsCorrect(true);
          } else {
            console.log('incorrecto');
            if (isCorrect === true) {
              setAnswersCount(answersCount - 1);
            }
            setIsCorrect(false);
          }
        }}
        renderLeftIcon={() => (
          <FontAwesome5
            style={styles.icon}
            color={isCorrect ? 'green' : 'red'}
            name={isCorrect ? 'check' : 'times'}
            size={20}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dropdown: {
    paddingHorizontal: RSize(0.03, 'h'),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CellMenu;

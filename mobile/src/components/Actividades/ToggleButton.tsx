import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IToggleButton} from '../../types/activity';
import {ReactStateSetter} from '../../types/others';
import Layout from '../Utils/Layout';
import ButtonComponent from './ButtonComponent';

interface ToggleButtonProps {
  toggleButtons: IToggleButton[] | never[];
  toggleQuestions: [number[], ReactStateSetter<number[]>];
}

const ToggleButton = (props: ToggleButtonProps) => {
  if (props.toggleButtons.length === 0) {
    return null;
  }

  const toggle = (index: number) => {
    let tgValues = [...props.toggleQuestions[0]];
    if (tgValues[index] === 1) {
      tgValues[index] = 0;
    } else {
      tgValues[index] = 1;
    }
    props.toggleQuestions[1](tgValues);
  };

  return (
    <View style={styles.container}>
      {props.toggleButtons.map((toggleButton: IToggleButton, index) => {
        return (
          <View style={styles.overlay} key={index.toString()}>
            <Layout
              position={toggleButton.position}
              ObjectView={
                <ButtonComponent
                  onPressFunction={() => toggle(index)}
                  settings={
                    props.toggleQuestions[0][index] === 1
                      ? {
                          buttonIcon: toggleButton.settings.buttonIconNormal,
                          buttonColor: toggleButton.settings.buttonColorNormal,
                          buttonText: toggleButton.settings.buttonTextNormal,
                        }
                      : {
                          buttonIcon: toggleButton.settings.buttonIconAlt,
                          buttonColor: toggleButton.settings.buttonColorAlt,
                          buttonText: toggleButton.settings.buttonTextAlt,
                        }
                  }
                />
              }
            />
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
    flexDirection: 'column',
  },
});

export default ToggleButton;

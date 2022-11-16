import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IToggleButton} from '../../types/activity';
import {IToggleButtonParams} from '../../types/story';
import Layout from '../Utils/Layout';
import ButtonComponent from './ButtonComponent';

interface ToggleButtonProps {
  toggleButtonParams: IToggleButtonParams;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const {
    pageNumber,
    toggleButtons,
    toggleQuestions,
    toggleDefaultValue,
    models3d,
    models,
    hideInventory,
    activeTracker,
    imageTrackers,
  } = props.toggleButtonParams;
  if (toggleButtons[pageNumber].length === 0) {
    return null;
  }
  if (
    !(
      toggleDefaultValue[pageNumber] === true ||
      models3d[pageNumber].length === models[pageNumber].length ||
      hideInventory[pageNumber] === true
    )
  ) {
    return null;
  }
  // if (
  //   imageTrackers[pageNumber].length !== 0 &&
  //   activeTracker[pageNumber] === ''
  // ) {
  //   return null;
  // }

  const toggle = (index: number) => {
    let tgValues = [...toggleQuestions[0]];

    if (tgValues[pageNumber][index] === 1) {
      tgValues[pageNumber][index] = 0;
    } else {
      tgValues[pageNumber][index] = 1;
    }

    toggleQuestions[1](tgValues);
  };

  return (
    <View style={styles.container}>
      {toggleButtons[pageNumber].map((toggleButton: IToggleButton, index) => {
        return (
          <View style={styles.overlay} key={index.toString()}>
            <Layout
              position={toggleButton.position}
              ObjectView={
                <ButtonComponent
                  onPressFunction={() => toggle(index)}
                  settings={
                    toggleQuestions[0][pageNumber][index] === 1
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
                  disabled={false}
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import CuentoIntroductorio from './CuentoIntroductorio';
import CuentoInteractivo from './CuentoInteractivo';
import Desafio from './DesafioIntroductorio';
import FinalQuiz from './components/IntroductoryChallenge/FinalQuiz';
import AvailableActivities from './components/library/AvailableActivities';
import NoAvailableActivities from './components/library/NoAvailableActivities';
import Activity from './components/library/Activity';
import Conclusion from './components/Conclusion/Conclusion';
import ConclusionStory from './components/Conclusion/ConclusionStory';
import ResultadoFinal from './components/Conclusion/ResultadoFinal';
import DynamicTable from './components/Tables/DynamicTable';
import MainMap from './components/MainMap';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainMap"
          component={MainMap}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoAvailableActivities"
          component={NoAvailableActivities}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AvailableActivities"
          component={AvailableActivities}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CuentoInteractivo"
          component={CuentoInteractivo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CuentoIntroductorio"
          component={CuentoIntroductorio}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Desafio"
          component={Desafio}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FinalQuiz"
          component={FinalQuiz}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DynamicTable"
          component={DynamicTable}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Conclusion"
          component={Conclusion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConclusionStory"
          component={ConclusionStory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResultadoFinal"
          component={ResultadoFinal}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

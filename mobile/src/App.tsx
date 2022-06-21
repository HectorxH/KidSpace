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

import AvailableActivities from './components/library/AvailableActivities';
import NoAvailableActivities from './components/library/NoAvailableActivities';
import Activity from './components/library/Activity';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

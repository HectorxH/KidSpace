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

import Actividades from './Actividades';
import AvailableActivities from './components/library/AvailableActivities';
import NoAvailableActivities from './components/library/NoAvailableActivities';
import Activity from './components/library/Activity';
import Carrera from './components/library/Carrera';
import Story from './components/library/Story';
import Recompensas from './components/Recompensas/Recompensas';
import DynamicTable from './components/Tables/DynamicTable';
import Qr from './components/QR/Qr';
import MainMap from './components/MainMap';
import InicioView from './components/InicioView';
import CargaView from './components/CargaView';
import ErrorView from './components/library/ErrorView';
import FormularioView from './components/FormularioView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/navigation';
import axios from 'axios';
import {AuthProvider} from './hooks/useAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="InicioView"
            component={InicioView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CargaView"
            component={CargaView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FormularioView"
            component={FormularioView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ErrorView"
            component={ErrorView}
            options={{headerShown: false}}
          />
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
            name="Carrera"
            component={Carrera}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Story"
            component={Story}
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
            name="Actividades"
            component={Actividades}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DynamicTable"
            component={DynamicTable}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Recompensas"
            component={Recompensas}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Qr"
            component={Qr}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

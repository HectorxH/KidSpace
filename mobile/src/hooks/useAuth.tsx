import React, {createContext, useContext, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../types/user';
import {NavigationContext} from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';

interface IAuthContext {
  user: IUser | null;
  login: (data: IUser | null) => void;
  logout: () => void;
  refresh: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (data: IUser | null) => {},
  logout: () => {},
  refresh: () => {},
});

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const navigation = useContext(NavigationContext);

  // call this function when you want to authenticate the user
  const login = async (data: IUser | null) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(data));
      setUser(data);
      navigation?.navigate('MainMap');
    } catch (e) {
      console.log(e);
    }
  };

  // call this function to sign out logged in user
  const logout = async () => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(null));
      setUser(null);
      navigation?.navigate('InicioView');
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    try {
      await axios.delete(`${Config.BACKEND_URL}/logout`);
      await axios.post(`${Config.BACKEND_URL}/login`, {
        username: user?.username,
        password: user?.password,
      });
    } catch (e) {
      console.log(e);
      logout();
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      refresh,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

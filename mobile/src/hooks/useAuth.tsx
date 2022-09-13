import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../types/user';
import {NavigationContext} from '@react-navigation/core';
import axios from 'axios';
import Config from 'react-native-config';

interface IAuthContext {
  user: IUser | null;
  login: (data: IUser | null) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (data: IUser | null) => {},
  logout: async () => {},
  refresh: async () => {},
});

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const navigation = useContext(NavigationContext);

  useEffect(() => {
    console.log('Initial User:', user);
    if (!user) {
      AsyncStorage.getItem('@user').then(u => {
        if (u) {
          setUser(JSON.parse(u));
        }
        console.log('Loaded User:', user);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call this function when you want to authenticate the user
  const login = async (data: IUser | null) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(data));
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
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

  // const value = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     logout,
  //     refresh,
  //   }),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [],
  // );
  const value = {user, login, logout, refresh};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

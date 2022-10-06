import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../types/user';
import {NavigationContext} from '@react-navigation/core';
import Config from 'react-native-config';
import _ from 'lodash';
import request from 'superagent';

let instance = request.agent();

type Agent = request.SuperAgentStatic & request.Request;

interface IAuthContext {
  user: IUser | null;
  curso: string;
  login: (data: IUser | null) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  instance: Agent;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  curso: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (data: IUser | null) => {},
  logout: async () => {},
  refresh: async () => {},
  instance: instance,
});

export const AuthProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [curso, setCurso] = useState<string>('');

  const navigation = useContext(NavigationContext);

  const getUser = async () => {
    console.log('Current User:', user);
    if (!user) {
      let u = await AsyncStorage.getItem('@user');
      if (u && u !== 'null') {
        console.log('Loading User:', u);
        setUser(JSON.parse(u));
      }
    }
  };

  const getCurso = async () => {
    console.log('Current Curso:', curso);
    if (curso === '') {
      const c = await AsyncStorage.getItem('@curso');
      if (c) {
        console.log('Loading Curso:', c);
        setCurso(c);
      }
    }
  };

  useEffect(() => {
    instance = request.agent();
    if (!user) {
      getUser();
    }
    if (curso === '') {
      getCurso();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call this function when you want to authenticate the user
  const login = async (data: IUser | null) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(data));
      const userData = await AsyncStorage.getItem('@user');
      const c = await AsyncStorage.getItem('@curso');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (c) {
        setCurso(c);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // call this function to sign out logged in user
  const logout = async () => {
    try {
      await instance.delete(`${Config.REACT_APP_BACKEND_URL}/logout`);
    } catch (e) {
      console.log(e);
      console.log('Logout: already loged out');
    }
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(null));
      await AsyncStorage.setItem('@curso', JSON.stringify(''));
      setUser(null);
      setCurso('');
      navigation?.navigate('InicioView');
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    try {
      await instance.delete(`${Config.REACT_APP_BACKEND_URL}/logout`);
    } catch (e) {
      console.log(e);
      console.log('Refresh: already loged out');
    }
    try {
      const res = await instance
        .post(`${Config.REACT_APP_BACKEND_URL}/login`)
        .send({
          username: user?.username,
          password: user?.password,
          tipo: 'estudiante',
        });
      const {_id, nombres, apellidos, tipo} = res.body;
      if (user) {
        const {username, password} = user;
        const newUser = {_id, username, password, nombres, apellidos, tipo};
        if (!_.isEqual(user, newUser)) {
          console.log('Refresh: login as new user', newUser);
          await login(newUser);
        }
      } else {
        await logout();
      }
    } catch (e) {
      console.log(JSON.stringify(e));
      await logout();
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
  const value = {user, curso, login, logout, refresh, instance};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

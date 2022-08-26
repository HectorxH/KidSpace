import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/user';
import useLocalStorage from './useLocalStorage';

interface IAuthContext {
  user: IUser | null,
  // eslint-disable-next-line no-unused-vars
  login: (data: IUser | null) => void,
  logout: () => void,
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line no-unused-vars
  login: (data: IUser|null) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }:{children: any}) => {
  const [user, setUser] = useLocalStorage<IUser>('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: IUser | null) => {
    console.log(data);
    setUser(data);
    navigate('/');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import React, {
  createContext, useContext, useEffect, useMemo, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/user';
import useLocalStorage from './useLocalStorage';
import paquetes from '../mock/paquetes';

interface IAuthContext {
  user: IUser | null,
  // eslint-disable-next-line no-unused-vars
  login: (data: IUser, plan?: number) => void,
  logout: () => void,
  navigateToDefault: () => void,
  // eslint-disable-next-line no-unused-vars
  setBuyPlan: (plan: number) => void,
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line no-unused-vars
  login: (data: IUser, plan?: number) => {},
  logout: () => {},
  navigateToDefault: () => {},
  // eslint-disable-next-line no-unused-vars
  setBuyPlan: (plan: number) => {},
});

export const AuthProvider = ({ children }:{children: any}) => {
  const [user, setUser] = useLocalStorage<IUser>('user', null);
  const navigate = useNavigate();
  const userRef = useRef(user);
  const urlRef = useRef<string>();

  const navigateToDefault = () => {
    if (userRef.current?.tipo === 'apoderado') {
      navigate('/pupilo');
    } else if (userRef.current?.tipo === 'profesor') {
      navigate('/panel');
    } else if (userRef.current?.tipo === 'representante') {
      navigate('/profesores');
    }
  };

  const setBuyPlan = (plan: number) => {
    urlRef.current = paquetes[plan].url;
  };

  // call this function when you want to authenticate the user
  const login = (data: IUser, plan?: number) => {
    if (plan === undefined) {
      setUser(data, navigateToDefault);
    } else {
      setBuyPlan(plan);
      setUser(data);
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const URL = urlRef.current;
    urlRef.current = undefined;
    window.open(URL, '_self');
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      navigateToDefault,
      setBuyPlan,
    }),
    [user],
  );

  // useEffect(() => {
  //   console.log(urlRef.current);
  //   if (urlRef.current !== undefined) {
  //     console.log('xd2');
  //     const URL = urlRef.current;
  //     urlRef.current = undefined;
  //     window.open(URL, '_self');
  //   }
  // }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

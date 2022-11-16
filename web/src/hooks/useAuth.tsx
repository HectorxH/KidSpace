import React, {
  createContext, useContext, useMemo, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/user';
import useLocalStorage from './useLocalStorage';

interface IAuthContext {
  user: IUser | null,
  plan: number | null,
  // eslint-disable-next-line no-unused-vars
  login: (data: IUser, plan?: number) => void,
  logout: () => void,
  navigateToDefault: () => void,
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  plan: null,
  // eslint-disable-next-line no-unused-vars
  login: (data: IUser, plan?: number) => {},
  logout: () => {},
  navigateToDefault: () => {},
});

export const AuthProvider = ({ children }:{children: any}) => {
  const [user, setUser] = useLocalStorage<IUser>('user', null);
  const navigate = useNavigate();
  const [plan, setPlan] = useLocalStorage<number>('plan', null);
  const userRef = useRef(user);

  const navigateToDefault = () => {
    if (userRef.current?.tipo === 'apoderado') {
      navigate('/pupilo');
    } else if (userRef.current?.tipo === 'profesor') {
      navigate('/panel');
    } else if (userRef.current?.tipo === 'representante') {
      navigate('/profesores');
    }
  };

  // call this function when you want to authenticate the user
  const login = (data: IUser, selectedPlan?: number) => {
    userRef.current = data;
    setUser(data, navigateToDefault);
    if (selectedPlan) setPlan(selectedPlan);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      plan,
      login,
      logout,
      navigateToDefault,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

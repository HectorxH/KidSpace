/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingView from '../views/LoadingView';

interface IProtectedRouteProps {
  loggedin?: boolean
  loggedout?: boolean
  noProfesor?: boolean
  noApoderado?: boolean
  noRepresentante?: boolean
}

const ProtectedRoute = ({
  loggedin = false,
  loggedout = false,
  noProfesor = false,
  noApoderado = false,
  noRepresentante = false,
} : IProtectedRouteProps) => {
  const { user, navigateToDefault } = useAuth();
  const [lodaing, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loggedout, !!user);
    if (loggedout && user) {
      navigateToDefault();
    } else if (loggedin && !user) {
      // user is not authentprofileicated
      navigate('/login');
    } else if (((noProfesor && user?.tipo === 'profesor')
    || (noApoderado && user?.tipo === 'apoderado')
    || (noRepresentante && user?.tipo === 'representante'))) {
      navigateToDefault();
    }
    setLoading(false);
  }, []);

  if (lodaing) return <LoadingView />;
  return <Outlet />;
};

export default ProtectedRoute;

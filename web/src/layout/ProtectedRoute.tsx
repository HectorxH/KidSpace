/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingView from '../views/LoadingView';

interface IProtectedRouteProps {
  loggedin?: boolean,
  loggedout?: boolean
}

const ProtectedRoute : React.FC<IProtectedRouteProps> = ({
  loggedin = false,
  loggedout = false,
}) => {
  const { user } = useAuth();
  const [lodaing, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`user: ${user}`);
    if (((loggedout && user) || (loggedin && !user))) {
      // user is not authentprofileicated
      navigate('/login');
    }
    setLoading(false);
  }, []);

  if (lodaing) return <LoadingView />;
  return <Outlet />;
};

export default ProtectedRoute;

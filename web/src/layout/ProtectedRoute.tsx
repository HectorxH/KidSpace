/* eslint-disable react/require-default-props */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface IProtectedRouteProps {
  children: any,
  loggedin?: boolean,
  loggedout?: boolean
}

const ProtectedRoute : React.FC<IProtectedRouteProps> = ({
  children,
  loggedin = false,
  loggedout = false,
}) => {
  const { user } = useAuth();
  console.log(user);
  if ((loggedout && user) || (loggedin && !user)) {
    // user is not authentprofileicated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

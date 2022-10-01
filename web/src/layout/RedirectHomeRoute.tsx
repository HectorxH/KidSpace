import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CargaView from '../views/LoadingView';

const RedirectHomeRoute = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.tipo === 'profesor') {
      navigate('/panel');
    } else if (user?.tipo === 'apoderado') {
      navigate('/pupilo');
    } else {
      logout();
    }
  }, []);

  return <CargaView />;
};

export default RedirectHomeRoute;

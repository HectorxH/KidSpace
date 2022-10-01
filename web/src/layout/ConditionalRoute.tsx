import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingView from '../views/LoadingView';

interface ConditionalRouteProps {
  components: {
    profesor?: () => JSX.Element,
    apoderado?: () => JSX.Element,
    estudiante?: () => JSX.Element,
    representate?: () => JSX.Element
  }
}

const ProtectedRoute = ({
  components,
} : ConditionalRouteProps) => {
  const { user } = useAuth();
  const [view, setView] = useState(<LoadingView />);

  useEffect(() => {
    _.forEach(components, (Comp, tipo) => {
      if (tipo === user?.tipo && Comp) setView(<Comp />);
    });
  }, []);

  return view;
};

export default ProtectedRoute;

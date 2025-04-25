import AuthContext from '@/contexts/AuthContext';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UNAUTHORIZED_URL } from './router.const';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useContext(AuthContext);

  return accessToken ? children : <Navigate to={UNAUTHORIZED_URL} replace />;
};

export const protectedRoute = (step: ReactNode) => <ProtectedRoute>{step}</ProtectedRoute>;

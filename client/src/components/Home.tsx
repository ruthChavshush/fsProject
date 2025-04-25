import AuthContext from '@/contexts/AuthContext';
import Feed from '@/pages/Feed/Feed';
import React, { useContext } from 'react';
import Welcome from './Welcome';

export const Home: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? <Feed /> : <Welcome />;
};

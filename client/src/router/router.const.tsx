import { Home } from '@/components/Home';
import Unauthorized from '@/components/Unauthorized';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import Signup from '@/pages/Signup/Signup';
import { RouteObject } from 'react-router-dom';
import { protectedRoute } from './ProtectedRoute';

export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const UNAUTHORIZED_URL = '/unauthorized';
export const SIGNUP_URL = '/signup';
export const BASE_PATH = '/localhost:5173';
export const PROFILE_URL = '/profile';

const routes = [
  { path: LOGIN_URL, element: <Login />, id: 'Login' },
  { path: SIGNUP_URL, element: <Signup />, id: 'Signup' },
  { path: UNAUTHORIZED_URL, element: <Unauthorized />, id: 'Unauthorized' },
  {
    path: HOME_URL,
    element: <Home />,
    id: 'Home',
  },
  {
    path: PROFILE_URL,
    element: protectedRoute(<Profile />),
    id: 'Profile',
  },
];

export const getPagesRoutes = (): RouteObject[] => {
  return [...routes];
};

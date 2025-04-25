import { setAuthContextValues } from '@/api/authContextHelper';
import { User } from '@shared/types/user.type';
import { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react';

interface AuthContext {
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  currentUser: User | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  setAccessToken: (token: string) => void;
  setCurrentUser: (user: User) => void;
}

const initialContext: AuthContext = {
  login: () => {},
  logout: () => {},
  currentUser: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  setAccessToken: () => {},
  setCurrentUser: () => {},
};

const AuthContext = createContext<AuthContext>(initialContext);

const CURRENT_USER_STORAGE_ITEM = 'currentUser';
export const ACCESS_TOKEN_STORAGE_ITEM = 'accessToken';
export const REFRESH_TOKEN_STORAGE_ITEM = 'refreshToken';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const getCurrentUser = () =>
    JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_ITEM) as string);
  const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_STORAGE_ITEM) as string;
  const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_STORAGE_ITEM) as string;

  const [currentUser, setCurrentUser] = useState<User | undefined>(getCurrentUser());
  const [accessToken, setAccessToken] = useState<string | undefined>(getAccessToken());
  const [refreshToken, setRefreshToken] = useState<string | undefined>(getRefreshToken());

  const logout = useCallback(() => {
    setAccessToken(undefined);
    setRefreshToken(undefined);
    setCurrentUser(undefined);
  }, [setAccessToken, setRefreshToken, setCurrentUser]);

  useEffect(() => {
    currentUser
      ? localStorage.setItem(CURRENT_USER_STORAGE_ITEM, JSON.stringify(currentUser))
      : localStorage.removeItem(CURRENT_USER_STORAGE_ITEM);
  }, [currentUser]);
  useEffect(() => {
    accessToken
      ? localStorage.setItem(ACCESS_TOKEN_STORAGE_ITEM, accessToken)
      : localStorage.removeItem(ACCESS_TOKEN_STORAGE_ITEM);
  }, [accessToken]);
  useEffect(() => {
    refreshToken
      ? localStorage.setItem(REFRESH_TOKEN_STORAGE_ITEM, refreshToken)
      : localStorage.removeItem(REFRESH_TOKEN_STORAGE_ITEM);
  }, [refreshToken]);
  useEffect(() => {
    setAuthContextValues(accessToken, refreshToken, setAccessToken, logout);
  }, [accessToken, refreshToken, setAccessToken, logout]);

  const login = (user: User, accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setCurrentUser(user);
  };

  const value = {
    currentUser,
    accessToken,
    refreshToken,
    login,
    logout,
    setAccessToken,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

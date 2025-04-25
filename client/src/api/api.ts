import { ACCESS_TOKEN_STORAGE_ITEM } from '@/contexts/AuthContext';
import axios from 'axios';
import { getAuthContextValues } from './authContextHelper';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Api = axios.create({
  baseURL: `${VITE_BASE_URL}/api/`,
  responseType: 'json',
  withCredentials: true,
});

Api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_ITEM) as string;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { logout, setAccessToken, refreshToken } = getAuthContextValues();
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (refreshToken) {
        try {
          const response = await axios.post(`${VITE_BASE_URL}/api/auth/refreshToken/${refreshToken}`);
          const newAccessToken = response.data.accessToken;
          setAccessToken && setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          logout && logout();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Api;

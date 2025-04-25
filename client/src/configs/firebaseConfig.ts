// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const apiUrl = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiUrl,
  authDomain: 'fetch-6f9f8.firebaseapp.com',
  projectId: 'fetch-6f9f8',
  storageBucket: 'fetch-6f9f8.appspot.com',
  messagingSenderId: '454684112180',
  appId: '1:454684112180:web:781a8ed79202e49afa2161',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
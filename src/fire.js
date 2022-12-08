import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDYUL80fFaY3RtbfRp47Si6I_XL4cpavMc',
  authDomain: 'crud-ecf33.firebaseapp.com',
  projectId: 'crud-ecf33',
  storageBucket: 'crud-ecf33.appspot.com',
  messagingSenderId: '299765341417',
  appId: '1:299765341417:web:86ff0b787921175f366478',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

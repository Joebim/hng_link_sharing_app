import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL2gfCc87MhRmrGFUbc5xb7bPPMgg4vUA",
  authDomain: "hng-link-sharing-app-db6e6.firebaseapp.com",
  projectId: "hng-link-sharing-app-db6e6",
  storageBucket: "hng-link-sharing-app-db6e6.appspot.com",
  messagingSenderId: "28025150913",
  appId: "1:28025150913:web:08afa6f5d1b30c503ea340",
  measurementId: "G-T0Y7H3ZTM1"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
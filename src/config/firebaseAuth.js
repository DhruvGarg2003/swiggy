// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    "apiKey": import.meta.env.VITE_APIKEY,
  "authDomain": import.meta.env.VITE_AUTHDOMAIN,
  "projectId": import.meta.env.VITE_PEOJECTID,
  "storageBucket": import.meta.env.VITE_STORAGE,
  "messagingSenderId": import.meta.env.VITE_MESSAGING,
  "appId": import.meta.env.VITE_APPID


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider};
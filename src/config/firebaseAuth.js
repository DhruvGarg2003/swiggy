// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = JSON.parse(import.meta.env.VITE_KEY);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider};
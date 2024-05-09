// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-rentease.firebaseapp.com",
  projectId: "mern-rentease",
  storageBucket: "mern-rentease.appspot.com",
  messagingSenderId: "599191566757",
  appId: "1:599191566757:web:e21576686d30aa96c0904c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
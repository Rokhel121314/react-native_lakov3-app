// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP--M5uATWswKO26LgqaOF74l2p2zBk2g",
  authDomain: "lakov3-6d30d.firebaseapp.com",
  projectId: "lakov3-6d30d",
  storageBucket: "lakov3-6d30d.appspot.com",
  messagingSenderId: "1019994908481",
  appId: "1:1019994908481:web:522219ecd34531c553e3c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

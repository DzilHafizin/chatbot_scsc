// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBACPuQTs2wFGlfa874TLmqw4C0kClOJAc",
  authDomain: "chatbot-c872a.firebaseapp.com",
  projectId: "chatbot-c872a",
  storageBucket: "chatbot-c872a.appspot.com",
  messagingSenderId: "558414925480",
  appId: "1:558414925480:web:e417258c1a78661966fc9d",
  measurementId: "G-4LD8C7CXKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const  db = getFirestore(app);
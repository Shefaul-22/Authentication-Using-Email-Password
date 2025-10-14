// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK5Msg6kjTM9qdcSJ6Et4SvaSCa8m3mp0",
  authDomain: "email-password-authentic-691c1.firebaseapp.com",
  projectId: "email-password-authentic-691c1",
  storageBucket: "email-password-authentic-691c1.firebasestorage.app",
  messagingSenderId: "647657945499",
  appId: "1:647657945499:web:21f92cfc4d9fc8d58ec93e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
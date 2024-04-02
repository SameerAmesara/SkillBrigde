// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ4iD8lMXVyQILMjXd79IsY404gHmqLUY",
  authDomain: "skill-bridge-905b8.firebaseapp.com",
  databaseURL: "https://skill-bridge-905b8-default-rtdb.firebaseio.com",
  projectId: "skill-bridge-905b8",
  storageBucket: "skill-bridge-905b8.appspot.com",
  messagingSenderId: "431956378344",
  appId: "1:431956378344:web:1463518599f2353988bf5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
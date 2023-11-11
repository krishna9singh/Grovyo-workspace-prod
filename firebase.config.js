import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpjsg4r-teen9cYqFNQN0LpW6vMrrxTJ0",
  authDomain: "grovyo-main.firebaseapp.com",
  projectId: "grovyo-main",
  storageBucket: "grovyo-main.appspot.com",
  messagingSenderId: "103945512888",
  appId: "1:103945512888:web:0594db592eaee16cd4114d",
  measurementId: "G-YHYFNTHGRS",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

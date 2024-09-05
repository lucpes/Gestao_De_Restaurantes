import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9QnCA3D_lo2ZXmTsSL78ybwO3KBULgj4",
  authDomain: "gestao-de-restaurante.firebaseapp.com",
  projectId: "gestao-de-restaurante",
  storageBucket: "gestao-de-restaurante.appspot.com",
  messagingSenderId: "390150717928",
  appId: "1:390150717928:web:dfc689b9434d5c4bb8645d",
  measurementId: "G-RZ62XF2XXM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app)

export { auth, firestore, db, collection, addDoc, getDocs, setDoc, doc };

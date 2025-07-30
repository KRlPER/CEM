import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔥 Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmJvlQCEPFOEVjXo22ZWghJF9QQZy50Es",
    authDomain: "shaids-d59a8.firebaseapp.com",
    projectId: "shaids-d59a8",
    storageBucket: "shaids-d59a8.firebasestorage.app",
    messagingSenderId: "606756488492",
    appId: "1:606756488492:web:278a4f9d8f6266f4b55889",
    measurementId: "G-XQ9K4S5CTB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export necessary Firebase functions
export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, doc, getDoc, setDoc };

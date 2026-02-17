// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRRYMAxnyNF4ShPEKItlm9y8ksEOnfGL4",
  authDomain: "ecommerce-fcd7c.firebaseapp.com",
  projectId: "ecommerce-fcd7c",
  storageBucket: "ecommerce-fcd7c.firebasestorage.app",
  messagingSenderId: "555240875441",
  appId: "1:555240875441:web:16d396a4eb6c7ef4558990",
  measurementId: "G-6737BE4CQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };

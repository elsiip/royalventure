// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaCGyNpU8MyiT9POyUoTTcNQpQvlnlJBU",
  authDomain: "royalventure-9bc99.firebaseapp.com",
  projectId: "royalventure-9bc99",
  storageBucket: "royalventure-9bc99.appspot.com",
  messagingSenderId: "21139509933",
  appId: "1:21139509933:web:01a2b0185ac1275317ec24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
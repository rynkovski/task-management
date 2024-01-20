// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp9Fu3NWsh4IFPgucx0VwkKzRR3wfy1z0",
  authDomain: "zen-task-b80ce.firebaseapp.com",
  projectId: "zen-task-b80ce",
  storageBucket: "zen-task-b80ce.appspot.com",
  messagingSenderId: "610434292905",
  appId: "1:610434292905:web:42229d426ed54a0bfc9db8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

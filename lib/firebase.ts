// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAssEt0IrSS7mtkqKPo6aW8uk-PWnG2YGE",
  authDomain: "simple-quiz-app-f71f3.firebaseapp.com",
  projectId: "simple-quiz-app-f71f3",
  storageBucket: "simple-quiz-app-f71f3.appspot.com",
  messagingSenderId: "603644294002",
  appId: "1:603644294002:web:4364c7c2dd88c5e28463eb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

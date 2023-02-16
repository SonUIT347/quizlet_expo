import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA25Q1oaEXqw4kAC5pmn6fuoSbU0Hc4xy0",
  authDomain: "fire-base-22867.firebaseapp.com",
  projectId: "fire-base-22867",
  storageBucket: "fire-base-22867.appspot.com",
  messagingSenderId: "521608606829",
  appId: "1:521608606829:web:6212ba8c137081947e7b64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
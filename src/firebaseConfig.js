// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZia_cIl01I2y2B9j2BoLI4fZPynuHo8s",
  authDomain: "dynamicformbuilder-351ec.firebaseapp.com",
  projectId: "dynamicformbuilder-351ec",
  storageBucket: "dynamicformbuilder-351ec.firebasestorage.app",
  messagingSenderId: "1093838470895",
  appId: "1:1093838470895:web:9def265dc1f95c95e0a51a",
  measurementId: "G-BNQQLF4MQM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

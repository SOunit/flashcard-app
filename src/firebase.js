import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJcko-wzB58TecFcxmeAB8ofG8h_kDaQo",
  authDomain: "flashcard-app-82c5a.firebaseapp.com",
  databaseURL: "https://flashcard-app-82c5a-default-rtdb.firebaseio.com",
  projectId: "flashcard-app-82c5a",
  storageBucket: "flashcard-app-82c5a.appspot.com",
  messagingSenderId: "1093933122472",
  appId: "1:1093933122472:web:ba34c2b8ac13d0c004939d",
  measurementId: "G-PXTXVYZ49V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

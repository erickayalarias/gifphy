// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGxbWc_-odneXk0i5UcDhyVCxmrvxw_f4",
  authDomain: "gifapp-d174f.firebaseapp.com",
  projectId: "gifapp-d174f",
  storageBucket: "gifapp-d174f.appspot.com",
  messagingSenderId: "257019428447",
  appId: "1:257019428447:web:237757ed3778adacdce5ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbData = getFirestore()
export const storage = getStorage(app);

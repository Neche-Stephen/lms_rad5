// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN8M7OpQ6-8d9bR9ZLIZYgSM9dpyQHp-0",
  authDomain: "rad5-lms.firebaseapp.com",
  projectId: "rad5-lms",
  storageBucket: "rad5-lms.appspot.com",
  messagingSenderId: "707864688732",
  appId: "1:707864688732:web:757ccdac23dcbe0b588e99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
// export default firestore;

export const signInAuthUserWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export async function signUpWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

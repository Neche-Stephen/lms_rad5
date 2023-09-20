// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
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
const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
// export default firestore;

export const signInAuthUserWithEmailAndPassword = (email, password) =>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User signed in successfully
    const user = userCredential.user;
    console.log(`User signed in: ${user.email}`);
  })
  .catch((error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        console.error('Invalid email address.');
        break;
      case 'auth/user-disabled':
        console.error('User account has been disabled.');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        console.error('Invalid email or password.');
        break;
      default:
        console.error('Sign-in error:', error);
    }
  });
  
}
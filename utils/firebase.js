// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// for image:
import { getStorage} from "firebase/storage"; //, ref, uploadBytes } from "firebase/storage"; // new


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.VITE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_APP_ID,
  measurementId: import.meta.env.VITE_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// other way too, export..
//const analytics = getAnalytics(app);


const auth = getAuth();
// export const db = getFirestore(app);
const db = getFirestore(app); // firebase.firestore(); if do the other way
const storage = getStorage(app);// firebase.storage();

export { auth, db, storage };


// for image:
// import { getStorage} from "firebase/storage"; //, ref, uploadBytes } from "firebase/storage"; // new
// export const storage = getStorage(app)

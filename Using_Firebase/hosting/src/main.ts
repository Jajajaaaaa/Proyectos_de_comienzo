
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIXxHetRNaMU-53w3MatvW6XWqxO-reY8",
  authDomain: "laotrapage.firebaseapp.com", 
  projectId: "laotrapage",
  storageBucket: "laotrapage.firebasestorage.app",
  messagingSenderId: "993908118952",
  appId: "1:993908118952:web:28768f5d353e9ee7faf99d",
  measurementId: "G-DKQ9WS6FEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("Firebase initialized");
console.log("Analytics initialized");
console.log(analytics);
console.log(app);
console.log("App initialized");

import { getAuth, onAuthStateChanged, signInWithRedirect,GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth();
const button = document.querySelector('button');

onAuthStateChanged(auth, user =>{
  if(user == null) { return; }
  console.log(user)
})
console.log(onAuthStateChanged);

button?.addEventListener('click', () =>{
  signInWithRedirect(auth,new GoogleAuthProvider())
}); 




import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAPVkLQFTXLn8c0UpnWduIUTFgFeeOvxJo",
    authDomain: "control-de-proyectos-8e4fa.firebaseapp.com",
    projectId: "control-de-proyectos-8e4fa",
    storageBucket: "control-de-proyectos-8e4fa.appspot.com",
    messagingSenderId: "533177251750",
    appId: "1:533177251750:web:131ea7d7c321b279cb8167",
    measurementId: "G-ZQB7LK43VX"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const auth = fb.auth();
export const db = fb.firestore();

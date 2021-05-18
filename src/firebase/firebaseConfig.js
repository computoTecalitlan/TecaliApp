import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
var firebaseConfig = {
  apiKey: "AIzaSyCnH6V7DIofwmPbRqYN4ToY15kC-Jx7LbI",
  authDomain: "ayuntamiento-77d3b.firebaseapp.com",
  databaseURL: "https://ayuntamiento-77d3b.firebaseio.com",
  projectId: "ayuntamiento-77d3b",
  storageBucket: "ayuntamiento-77d3b.appspot.com",
  messagingSenderId: "87834081884",
  appId: "1:87834081884:web:624e3c42be14f80b"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  
  

  const db = firebase.database();
  const auth = firebase.auth();

  export {db,auth};
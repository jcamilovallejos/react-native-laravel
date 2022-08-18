import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCt2YcBzzSfJka7h7QThaOXKQaxyVFyJZk",
  authDomain: "true-node-354816.firebaseapp.com",
  projectId: "true-node-354816",
  storageBucket: "true-node-354816.appspot.com",
  messagingSenderId: "727058308431",
  appId: "1:727058308431:web:0b236a8e52bb8d2b4eb93a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export default {
    firebase,
    db
}
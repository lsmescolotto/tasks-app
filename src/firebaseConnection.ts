import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-IVEIY8da8gI_gpzHvhjwYxxROj-_Ats",
  authDomain: "financesapp-cdaab.firebaseapp.com",
  projectId: "financesapp-cdaab",
  storageBucket: "financesapp-cdaab.appspot.com",
  messagingSenderId: "917762196357",
  appId: "1:917762196357:web:e15d7b1ba791ca6980baec",
  measurementId: "G-14F31DHR1T",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA8HFeByfVTGqEpRMg05Rqi_YUHdYMjxlw",
    authDomain: "remember-app-ab528.firebaseapp.com",
    projectId: "remember-app-ab528",
    storageBucket: "remember-app-ab528.appspot.com",
    messagingSenderId: "746503404970",
    appId: "1:746503404970:web:f430420e9ca73f0d1affd3"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)
const storage = getStorage( firebase )


export { 
    firebase,
    db,
    storage,
};

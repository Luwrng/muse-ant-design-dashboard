// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeza3KORufA893Hnx7UseZ-9EbPD3S4ww",
    authDomain: "clean-food-2c12b.firebaseapp.com",
    projectId: "clean-food-2c12b",
    storageBucket: "clean-food-2c12b.appspot.com",
    messagingSenderId: "214806759068",
    appId: "1:214806759068:web:736ff2f02e5000aafccf59",
    measurementId: "G-K5WBX3Q7SZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

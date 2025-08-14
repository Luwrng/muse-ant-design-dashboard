import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACSDoMAXFs8SvWKPvkf1PaDfUdgOWOONg",
  authDomain: "testfirebasefilestorage.firebaseapp.com",
  projectId: "testfirebasefilestorage",
  storageBucket: "testfirebasefilestorage.firebasestorage.app",
  messagingSenderId: "985303368036",
  appId: "1:985303368036:web:940f5b7322bf5bb87a7a71",
  measurementId: "G-1R9D7E4C8W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

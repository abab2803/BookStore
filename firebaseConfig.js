// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCb94bXkjHwEZ21LTZgOPCbeOiwSaKHNrU",
    authDomain: "mystore-d32d5.firebaseapp.com",
    projectId: "mystore-d32d5",
    storageBucket: "mystore-d32d5.appspot.com",
    messagingSenderId: "974871931233",
    appId: "1:974871931233:web:3cb99a662281335828fd20",
    measurementId: "G-24VE703E2B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export any objects needed elsewhere in your app
export { db }


import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

//your web app's firebase configuration

const firebaseConfig  = {
    apiKey: "AIzaSyDWWSWi71stbkEXJvUtp6euUxej8RSAr04",
    authDomain: "indian-fashion-2d1d0.firebaseapp.com",
    projectId: "indian-fashion-2d1d0",
    storageBucket: "indian-fashion-2d1d0.appspot.com",
    messagingSenderId: "753541441080",
    appId: "1:753541441080:web:87f9d8b22c00f24cd528cd"
};


//initialize firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};
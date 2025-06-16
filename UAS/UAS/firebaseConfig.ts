import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCT6ZUnWh_9KcjnSx4mbM5xADHjrXcKQ_8",//current_key
    authDomain: "jstore-a83ee.firebaseapp.com",//project_id + ".firebaseapp.com"
    projectId: "jstore-a83ee", //project_id
    storageBucket: "jstore-a83ee.firebasestorage.app", //project_id + ".firebasestorage.googleapis.com"
    messagingSenderId: "313874433859", //project_number
    appId: "1:313874433859:android:c3a382b46c6c2201ce11f6", //app_id
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase Auth
const auth = getAuth(app)

// Initialize Firestore
const db = getFirestore(app)

export { auth, db }

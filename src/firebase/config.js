import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCiT0aadtqI0_9P8okpg3NL5NY9Ju7301Y",
    authDomain: "first-firebase-pwa.firebaseapp.com",
    databaseURL: "https://first-firebase-pwa.firebaseio.com",
    projectId: "first-firebase-pwa",
    storageBucket: "first-firebase-pwa.appspot.com",
    messagingSenderId: "668434878656",
    appId: "1:668434878656:web:809dae8b3f41b6508c9d25"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore();
export {
    projectFirestore
}
import firebase from "firebase";

const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyA5S6rUudtBZxB0-riKnAZ6bMgQ5HHuNKU",
    authDomain: "instagram-clone-react-943ea.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-943ea.firebaseio.com",
    projectId: "instagram-clone-react-943ea",
    storageBucket: "instagram-clone-react-943ea.appspot.com",
    messagingSenderId: "12300827357",
    appId: "1:12300827357:web:e7a8f15ec3e3f2f9fe3934",
    measurementId: "G-H74PPQSK1B"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
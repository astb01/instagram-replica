import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDKA4mK0ojhL1fsitt-7v7rE8R3_-Yp0Ik",
  authDomain: "instagram-replica-770a1.firebaseapp.com",
  databaseURL: "https://instagram-replica-770a1.firebaseio.com",
  projectId: "instagram-replica-770a1",
  storageBucket: "instagram-replica-770a1.appspot.com",
  messagingSenderId: "425044657709",
  appId: "1:425044657709:web:c51bfb5c4b6326c8c19aa4",
});

// grab services from firebase:
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, storage, auth };

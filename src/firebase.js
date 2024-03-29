// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDIknudipHM7UOFrh_g3mnpjowhXSIPO4c",
  authDomain: "whatsapp-web-51359.firebaseapp.com",
  projectId: "whatsapp-web-51359",
  storageBucket: "whatsapp-web-51359.appspot.com",
  messagingSenderId: "778584365114",
  appId: "1:778584365114:web:c58159e1c6066fda633d03",
  measurementId: "G-RGME9W0492"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export {auth, provider};
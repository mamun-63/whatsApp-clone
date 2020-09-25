import firebase from 'firebase' 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrQDrW_YdPtV9DbC6ZjCncGhkejzvROdw",
  authDomain: "whatsapp-clone-499ab.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-499ab.firebaseio.com",
  projectId: "whatsapp-clone-499ab",
  storageBucket: "whatsapp-clone-499ab.appspot.com",
  messagingSenderId: "132262868783",
  appId: "1:132262868783:web:5dacc46f85996c1285d3da",
  measurementId: "G-TV5JBN3BKQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

const auth = firebase.auth()  // no need the config file, so not using firebaseAPP.auth(), it comes from npm firebase pakage
const provider = new firebase.auth.GoogleAuthProvider() // creating new instance of Google authentication

export {auth, provider}
export default db
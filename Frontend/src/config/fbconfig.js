import firebase from 'firebase/app'
import 'firebase/storage'
//import 'firebase/firestore'
//import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBRizni0FdrS_0rNpJrKdFeu6tw1BGxlyk",
  authDomain: "risingpearlsweb-9ca98.firebaseapp.com",
  databaseURL: "https://risingpearlsweb-9ca98.firebaseio.com",
  projectId: "risingpearlsweb-9ca98",
  storageBucket: "risingpearlsweb-9ca98.appspot.com",
  messagingSenderId: "444722967520",
  appId: "1:444722967520:web:7d0cbd9729fcde45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage =firebase.storage();

 //request.auth != null
  export { storage,firebase as default};
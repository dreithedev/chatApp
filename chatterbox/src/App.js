import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({

    apiKey: "AIzaSyBZLgKfEmW2HIcrG9T6Xqu3mbL7s6PW-Jc",
    authDomain: "chatterbox-e274c.firebaseapp.com",
    databaseURL: "https://chatterbox-e274c.firebaseio.com",
    projectId: "chatterbox-e274c",
    storageBucket: "chatterbox-e274c.appspot.com",
    messagingSenderId: "996488157905",
    appId: "1:996488157905:web:3dc74d6da504ab0c7403f0",
    measurementId: "G-LG33GXRCCN"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

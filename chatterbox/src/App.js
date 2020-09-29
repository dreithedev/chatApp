import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
const analytics = firebase.analytics();

function App() {

const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
      <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const[messages] = useCollectionData(query,  { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    
    setFormValue('');
    dummy.current.scrollIntoView({behavior: 'smooth' });
  }
  

  return (<>
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

      </main>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type your message here"/>

        <button type="submit" disabled={!formValue}>🕊️</button>

      </form>


      <div>
  
      </div>
    </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

return (
  <div className={`message ${messageClass}`}>
    <img src={photoURL} />
    <p>{text}</p>
  </div>
  )
}


  

export default App;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () =>  auth.signInWithPopup(GoogleProvider);


export const handleUserProfile = async ({ userAuth, displayName}) => {
  
  if (!userAuth) 
  {
    return;
  } 
  const { user } = userAuth;

  const { uid, email} = user;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    //const { email } = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];
    
    try {
      await userRef.set({
            displayName,
            email,
            createdDate: timestamp,
            userRoles,
            //...additionalData
      })
    } catch(err) {
      console.log(err, 'unable to set');
    }
  }
 
  return userRef;
};

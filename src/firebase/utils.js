import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });


export const handleUserProfile = async ({ userAuth,  displayName }) => {


  if (!userAuth) 
  {
    return;
  } 

  const { uid, email} = userAuth;
 
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
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
      console.log(err, 'unable to set from Handle User Profile function from firbase utils files');
    }
  }
 
  return userRef;
};

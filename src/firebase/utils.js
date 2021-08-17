import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () =>  auth.signInWithPopup(GoogleProvider);


export const handleUserProfile = async ({ userAuth,  displayName}) => {


  if (!userAuth) 
  {
    return;
  } 

  //const user = userAuth

  //if(register) {
    //const { user } = userAuth;
  //} 
  //
  //const nameDis = displayName;
  const { uid, email} = userAuth;
 

  console.log(displayName
    , "display Name in utils");
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    //const { email } = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];
    const hi = 'hi';
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

import userTypes from "./user.types";
import { auth, handleUserProfile } from "../../firebase/utils";


export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});

export const signInUser = ({ email, password}) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true
    });
    
  } catch(err) {
      console.log("can't sign in ", err)
  }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
  
  if(password !== confirmPassword ) {
    const err = ['Password Don\'t match']
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: err
    });
    //setErrors(err)
    return;
  }

  try {
    const  userAuth = await auth.createUserWithEmailAndPassword(email, password);

    const {  user }  = userAuth;
    const  nameSent  = {
      userAuth: user,
      displayName: displayName
    }
    await handleUserProfile(nameSent);
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true
    });

  }catch(err) {
    //console.log(err)
  }
}

export const resetPassword = ({ email }) => async dispatch => {
  
  const config = {
    url:'http://localhost:3000/login'
  };

  try {
    await auth.sendPasswordResetEmail(email, config).then(() => {   
      dispatch({
        type: userTypes.RESET_PASSWORD_SUCCESS,
        payload: true
      });
    })
    .catch(( ) => {
      const err = ['Email not found. Please try again'];
      dispatch({
        type: userTypes.RESET_PASSWORD_ERROR,
        payload: err
      });
    });

  }catch(err) {
    //console.log(err);
  }
}
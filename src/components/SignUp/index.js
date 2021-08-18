import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, handleUserProfile } from '../../firebase/utils';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper'



import './styles.scss';

const SignUp = props =>  {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');

  const resetForm = () => {
    setDisplayName();
    setEmail();
    setPassword();
    setConfirmPassword();
    setErrors();
  }
  
  const handleFormSubmit = async event => {
    event.preventDefault();

    if(password !== confirmPassword ) {
      const err = ['Password Don\'t match']
      setErrors(err)
      return;
    }

    try {
      
      //console.log(email, password);

      const  userAuth = await auth.createUserWithEmailAndPassword(email, password);

      const {  user }  = userAuth;
      //console.log(userAuth.user, {displayName});
      const  nameSent  = {
        userAuth: user,
        displayName: displayName
      }
      await handleUserProfile(nameSent);

      
      //if(!userRef) return 

    
      resetForm();
      props.history.push('/');
      
    }catch(err) {
      //console.log(err)
    }
  }


    const configAuthWrapper = {
      headLine: "Registration"
    }

    
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className='formWrap'>

          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return(
                  <li>
                    {err}
                  </li>
                )
              })}
            </ul>
          )}
        <form onSubmit={handleFormSubmit}>

          <FormInput 
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full Name'
            onChange={e => setDisplayName(e.target.value)}
          />

          <FormInput 
            type='email'
            name='email'
            value={email}
            placeholder='Email '
            onChange={e => setEmail(e.target.value)}
          />

          <FormInput 
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />

          <FormInput 
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button type='submit'>
            Register
          </Button>
        </form>
        </div>
    </AuthWrapper>
    );
}


export default withRouter(SignUp);


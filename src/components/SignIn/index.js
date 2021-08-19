import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link , withRouter} from 'react-router-dom';
import { resetAllAuthForms, signInUser , signInWithGoogle }  from '../../redux/User/user.actions';

import './styles.scss';

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
});


const SignIn = props => {
  const { signInSuccess } = useSelector(mapState)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=> {
    if(signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push('/')
    }

  }, [signInSuccess]);
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }
  
  const handleSubmit = e =>  {
    e.preventDefault();
    dispatch(signInUser({ email, password }));

    }

    const handleGoogleSignIn = () =>{
      dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        headLine: 'LogIn'
    };
    
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className='formWrap'>
          <form onSubmit = {handleSubmit}>

            <div className='wrap'>
            <FormInput 
              type='email'
              name="email"
              value={email}
              placeholder="Email"
              handleChange={e => setEmail(e.target.value)}
            />

            <FormInput 
              type='password'
              name="password"
              value={password}
              placeholder="Password"
              handleChange={e => setPassword(e.target.value)}
            />

            <Button type='submit'>
              LogIn
            </Button>
          
            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={handleGoogleSignIn}>Sign in with Google </Button> 
              </div>
            </div>

            <div className='links'>
              <Link to='/recovery'>
              Reset Password
              </Link>
            </div>
            </div>
          </form>
        </div>
      </AuthWrapper>
    )

}

export default withRouter(SignIn);

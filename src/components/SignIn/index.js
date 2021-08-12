import React, { Component } from 'react'

import Button from '../forms/Button';
import { signInWithGoogle } from '../../firebase/utils';
import './styles.scss';

class SignIn  extends Component {
  
    handleSubmit = async e =>  {
      e.prevenDefault();
    }

    render() {
    return (
      <div className='signin'>
        <div className='wrap'>
          <h2>LogIn</h2>
        </div>
  
        <div className='formWrap'>
          <form onSubmit = {this.handleSubmit}>
            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={ signInWithGoogle}>Sign in with Google </Button> 
              </div>
            </div>
          </form>
        </div>
      </div>
    )
    }
}

export default SignIn;

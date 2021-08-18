import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import './styles.scss';

const EmailPassword = props => {
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    try {

      const config = {
        url:'http://localhost:3000/login'
      };
      auth.sendPasswordResetEmail(email, config).then(() => {   
        props.history.push('/login');
      })
      .catch(( rrr ) => {

        console.log(rrr);
        const err = ['Email not found. Please try again'];
        setErrors(err);
      });

    }catch(err) {
      //console.log(err);
    }

  }


    const configAuthWrapper = {
      headLine: "Email Password"
    }
    return (
      <AuthWrapper {...configAuthWrapper}>
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              )
            })}
          </ul>
        )}
        <div className='formWrap'>
          <form onSubmit={handleSubmit}>

            <FormInput 
              type='email'
              name='email'
              value={email}
              placehoder='Email'
              onChange={ e => setEmail(e.target.value)}/>

              <Button type='submit'>
                Emaill Password
              </Button>

          </form>
        </div>
        
      </AuthWrapper>
    )
  
}

export default withRouter(EmailPassword);
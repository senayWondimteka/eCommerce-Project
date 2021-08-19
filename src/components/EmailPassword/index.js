import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import './styles.scss';

import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { resetAllAuthForms, resetPassword } from "../../redux/User/user.actions";
import { useDispatch, useSelector } from "react-redux";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
});


const EmailPassword = props => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('')

  useEffect(( ) => {
    if(resetPasswordSuccess){
      dispatch(resetAllAuthForms());
      props.history.push('/')
    }

  }, [resetPasswordSuccess]);

  useEffect(( ) => {
    if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
      setErrors(resetPasswordError)
    }

  }, [resetPasswordError])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));

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
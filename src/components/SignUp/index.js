import React, { Component } from 'react';
import { auth, handleUserProfile } from '../../firebase/utils';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper'



import './styles.scss';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
};

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    const { name, value} = e.target;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async event => {
    event.preventDefault();

    const register = true;
    const { displayName, email, password, confirmPassword} = this.state;

    if(password !== confirmPassword ) {
      const err = ['Password Don\'t match']
      this.setState({
        errors: err
      });
      return;
    }

    try {
      
      //console.log(email, password);

      const  userAuth = await auth.createUserWithEmailAndPassword(email, password);

      const {  user }  = userAuth;
      //console.log(userAuth.user, {displayName});
      await handleUserProfile(user ,  {displayName} );

      
      //if(!userRef) return 

    
      this.setState({
        ...initialState,
      });

      
    }catch(err) {
      //console.log(err)
    }
  }


  render() {

    const { displayName, email, password, confirmPassword , errors} = this.state;

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
        <form onSubmit={this.handleFormSubmit}>

          <FormInput 
            type='text'
            name='displayName'
            value={displayName}
            placeholder='Full Name'
            onChange={this.handleChange}
          />

          <FormInput 
            type='email'
            name='email'
            value={email}
            placeholder='Email '
            onChange={this.handleChange}
          />

          <FormInput 
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={this.handleChange}
          />

          <FormInput 
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={this.handleChange}
          />
          <Button type='submit'>
            Register
          </Button>
        </form>
        </div>
    </AuthWrapper>);
  }
}

export default SignUp;


import React, { Component } from 'react'
import { signInWithGoogle, auth } from '../../firebase/utils';
import './styles.scss';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

const initialState = {
  email:'',
  password:''
};

class SignIn  extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }

    this.handleChange = this.handleChange.bind(this)
  }
  
  handleSubmit = async event =>  {
    event.preventDefault();
    const { email, password } = this.state;
    
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
          ...initialState
      });

    } catch(err) {
        console.log("can't sign in ", err)
      }
    }

    handleChange(e) {
      const { name, value} = e.target;
      this.setState({
        [name]: value
      });
    }
    render() {
      const{ email, password } = this.state;

    return (
      <div className='signin'>
        <div className='wrap'>
          <h2>LogIn</h2>
        </div>
  
        <div className='formWrap'>
          <form onSubmit = {this.handleSubmit}>
            <div className='wrap'>
            <FormInput 
              type='email'
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput 
              type='password'
              name="password"
              value={password}
              placeholder="Password"
              handleChange={this.handleChange}
            />
            <Button type='submit'>
              LogIn
            </Button>
          
            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={ signInWithGoogle}>Sign in with Google </Button> 
              </div>
            </div>
            </div>
          </form>
        </div>
      </div>
    )
    }
}

export default SignIn;

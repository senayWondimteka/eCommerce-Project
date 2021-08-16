import React, { Component } from "react";
import { withRouter } from "react-router";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import './styles.scss';

const initialState = {
  email: '',
  errors: []
};

class EmailPassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value

    })
  }

  handleSubmit = async(e) => {
    e.preventDefault();

    try {

      const { email } = this.state;

      const config = {
        url:'http://localhost:3000/login'
      };
      await auth.sendPasswordResetEmail(email, config).then(() => {
        
        this.props.histroy.push('/login');
      })
      .catch(( ) => {
        const err = ['Email not found. Please try again'];
        this.setState({
          errors: err
        })
      });

    }catch(err) {
      //console.log(err);
    }

  }
  render() {

    const { email, errors } = this.state;

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
          <form onSubmit={this.handleSubmit}>

            <FormInput 
              type='email'
              name='email'
              value={email}
              placehoder='Email'
              onChange={this.handleChange}/>

              <Button type='submit'>
                Emaill Password
              </Button>

          </form>
        </div>
        
      </AuthWrapper>
    )
  }
}

export default withRouter(EmailPassword);
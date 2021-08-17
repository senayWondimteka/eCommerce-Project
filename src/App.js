import React, {Component} from 'react';
import { Switch, Route , Redirect } from 'react-router-dom';

import {auth, handleUserProfile} from './firebase/utils';

//pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import './default.scss'
import MainLayout from './Layout/MainLayout';
import HomepageLayout from './Layout/HomepageLayout';
import Login from './pages/Login';
import Recovery from './pages/Recovery'
import { setCurrentUser } from './redux/User/user.actions';
import { connect } from 'react-redux';

class App extends Component  {

  authListener = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.authListener = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        
        //console.log(userAuth.uid, userAuth.email);
        
        const userRef = await handleUserProfile({userAuth});
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
  
  const {currentUser} = this.props;
  
  return (
    <div className="App">
      <Switch>
          <Route exact path='/' render={() => (
            <HomepageLayout >
              <Homepage />
            </HomepageLayout>
          )} 
          />
          <Route path='/registration' render={() => currentUser ? <Redirect to='/' /> : (
          <MainLayout>
            <Registration />
          </MainLayout>
          )} 
          />
          <Route path='/login'
          render={() => currentUser ? <Redirect to='/' /> : (
              <MainLayout>
                <Login />
              </MainLayout>
            )} 
          />
          <Route path='/recovery' render= { () => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        </Switch>
    </div>
  );
}
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

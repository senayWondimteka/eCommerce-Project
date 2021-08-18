import React, { useEffect } from 'react';
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
import Dashboard from './pages/Dashboard';

import WithAuth from './HOC/withAuth';

const App = props => {

  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await handleUserProfile({userAuth});
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      }
      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    }
  }, []);

 
  return (
    <div className="App">
      <Switch>
          <Route exact path='/' render={() => (
            <HomepageLayout >
              <Homepage />
            </HomepageLayout>
          )} 
          />
          <Route path='/registration' render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
          )} 
          />
          <Route path='/login'
          render={() => (
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

          <Route path='/dashboard' render= { () => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} />
        </Switch>
    </div>
  );
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

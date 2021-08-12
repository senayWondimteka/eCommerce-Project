import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss';

import logo from '../../assets/logo.png';

import { auth } from '../../firebase/utils'

const Header = props => {

  const { currentUser } = props;

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
          <img src={logo} alt='SimpleTut LOGO' />
          </Link>
        </div>
        <div className='callToActions'>

          {currentUser && (
            <ul>
              <li>
                <span onClick={() => auth.S}>
                  LogOut
                </span>
              </li>
            </ul>
          )}

          
          {!currentUser && (
            <ul>
            <li>
              <Link to='/registration'>
              Register</Link>
            </li>
            <li>
              <Link to='/login'>
              Login</Link>
            </li>
          </ul>
          )}
          
        </div>
      </div>

    </header>
  )
}

Header.defaultProps = {
  currentUser: null
}

export default Header;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Modal from 'react-modal';

const NavBar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  Modal.setAppElement('body');

  function openLoginModal() {
    setShowLoginForm(true)
  }

  function closeLoginModal() {
    setShowLoginForm(false)
  }

  function openSignupModal() {
    setShowSignupForm(true)
  }

  function closeSignupModal() {
    setShowSignupForm(false)
  }

  const formStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <button onClick={openLoginModal}>Log In</button>
          <Modal isOpen={showLoginForm} style={formStyles}>
            <LoginForm />
            <button onClick={closeLoginModal}>Cancel</button>
            <button onClick={openSignupModal}>Sign up</button>
          </Modal>
          <Modal isOpen={showSignupForm} style={formStyles}>
            <SignUpForm />
            <button onClick={closeSignupModal}>Cancel</button>
          </Modal>
        </li>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Modal from 'react-modal';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  Modal.setAppElement('body');

  function openLoginModal() {
    setShowLoginForm(true)
  }

  function closeLoginModal() {
    setShowLoginForm(false)
  }

  function openClose() {
    setShowSignupForm(true)
    closeLoginModal(true)
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
        {sessionUser &&
        <li>
          <NavLink to="/new-snack">
            <button className='create-snack-bttn'>
              <i className="fa-solid fa-store"></i>
            </button>
          </NavLink>
        </li>
        }
        {!sessionUser && (
        <li>
          <button onClick={openLoginModal}>Sign in</button>
          <Modal isOpen={showLoginForm} style={formStyles}>
            <LoginForm />
            <button onClick={closeLoginModal}>Cancel</button>
            <button onClick={openClose}>Register</button>
          </Modal>
          <Modal isOpen={showSignupForm} style={formStyles}>
            <SignUpForm setTrigger={setShowSignupForm}/>
          </Modal>
        </li>
        )}
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
        {sessionUser && (
          <li>
            <LogoutButton setTrigger={setShowLoginForm}/>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

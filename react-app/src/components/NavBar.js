
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Modal from 'react-modal';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchBar from './SearchBar';
import './navbar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user);
  const cart = useSelector(state => Object.values(state?.shoppingCart)[0]);
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

  let cartQuantity = null;
  if (cart) {
    cartQuantity = cart.quantity
  }

  return (
    <nav className='nav'>
      <ul className='navbar'>
        <div className='snacksy-home-bttn'>
          <NavLink to='/' exact={true} activeClassName='active' className='home-title'>
            Snacksy
          </NavLink>
        </div>
        <div className='search-bar'>
          <SearchBar />
        </div>
        {sessionUser && (
        <>
          <div className="create-snack">
            <NavLink to="/new-snack">
              <div className='create-snack-dropdown'>
                <button className='create-snack-bttn'>
                  <i className="fa-solid fa-store fa-lg"></i>
                </button>
                <div className='dropdown-title'>
                  <p id='drop-down-text'>Create a Snack</p>
                </div>
              </div>
            </NavLink>
          </div>
          <div className='shopping-cart'>
            <NavLink to={`/cart/${sessionUser?.id}`}>
              <Badge color="primary" badgeContent={cartQuantity} overlap="rectangular">
                <ShoppingCartIcon color='action'/>
              </Badge>
            </NavLink>
          </div>
        </>
        )}
        {!sessionUser && (
          <div className='signin-navbar'>
            <button className='signin-button' onClick={openLoginModal}>Sign in</button>
            <Modal isOpen={showLoginForm} style={formStyles}>
              <LoginForm />
              <button onClick={closeLoginModal}>Cancel</button>
              <button onClick={openClose}>Register</button>
            </Modal>
            <Modal isOpen={showSignupForm} style={formStyles}>
              <SignUpForm setTrigger={setShowSignupForm} />
            </Modal>
          </div>
        )}
        {sessionUser && (
          <div className='logout-button'>
            <LogoutButton setTrigger={setShowLoginForm} setTriggerSignup={setShowSignupForm}/>

          </div>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

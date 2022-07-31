
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
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '12px',
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '384px',
      width: '100%',
      top: '40px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '24px',
      outline: 'none',
      padding: '18px',
      overflow: 'visibile'
    }
  };

  let cartQuantity = null;
  if (cart) {
    cartQuantity = cart.quantity
  }

  return (
    <nav >
      <ul className='navbar'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active' className='home-title'>
            Snacksy
          </NavLink>
        </li>
        <li>
          <SearchBar className='search-bar' />
        </li>
        {sessionUser &&
          <li id="create-snack-button">
            <NavLink to="/new-snack">
              <button className='create-snack-bttn'>
                <i className="fa-solid fa-store"></i>
              </button>
            </NavLink>
          </li>
        }
        {sessionUser && (
          <li>
            <NavLink to={`/cart/${sessionUser?.id}`}>
              <Badge color="primary" badgeContent={cartQuantity}>
                <ShoppingCartIcon />
              </Badge>
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li>
            <button className='nav-buttons' onClick={openLoginModal}>Sign in</button>
            <Modal isOpen={showLoginForm} style={formStyles}>
              <button className="close_login_btn" onClick={() => setShowLoginForm(false)}>X</button>
              <LoginForm />
              <button className="register_btn" onClick={openClose}>Register</button>
            </Modal>
            <Modal isOpen={showSignupForm} style={formStyles}>
            <button className="close_login_btn" onClick={() => setShowSignupForm(false)}>X</button>
              <SignUpForm setTrigger={setShowSignupForm} />
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
            <LogoutButton setTrigger={setShowLoginForm} setTriggerSignup={setShowSignupForm}/>

          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import { thunkClearCart } from '../../store/cart';

const LogoutButton = ({ setTrigger }) => {
  const cart = useSelector(state => Object.values(state.shoppingCart)[0])
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setTrigger(false)
    await dispatch(thunkClearCart(cart))
  };

  return (
    <NavLink to='/'>
      <button onClick={onLogout}> <i className="fa-solid fa-right-from-bracket"></i> Sign Out</button>
    </NavLink>
  )
};

export default LogoutButton;

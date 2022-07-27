import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = ({setTrigger}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    setTrigger(false)
  };

  return (
      <NavLink to='/'>
        <button onClick={onLogout}> <i className="fa-solid fa-right-from-bracket"></i> Sign Out</button>
      </NavLink>
    )
};

export default LogoutButton;

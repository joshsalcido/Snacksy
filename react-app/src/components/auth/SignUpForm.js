import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = ({setTrigger}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(username, email, firstName, lastName, address ,password));
      if (data) {
        setErrors(data)
      }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateAddress = (e) => {
    setAddress(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <h2>Create your account</h2>
      <h3>Registration is easy.</h3>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div>
          <label>Username</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div>
          <label>First name</label>
          <input
            type='text'
            name='first_name'
            onChange={updateFirstName}
            value={firstName}
            required
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type='text'
            name='last_name'
            onChange={updateLastName}
            value={lastName}
            required
          ></input>
        </div>
        <div>
          <label>Address</label>
          <input
            placeholder='1234 Street Apt 123 Santa Monica, CA 90291'
            type='text'
            name='address'
            onChange={updateAddress}
            value={address}
            required
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
        {/* <NavLink to={'/'}> */}
          <button onClick={() => setTrigger(false)}>Cancel</button>
        {/* </NavLink> */}
      </form>
    </>
  );
};

export default SignUpForm;

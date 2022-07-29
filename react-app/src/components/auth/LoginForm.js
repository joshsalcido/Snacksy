import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { thunkGetCart } from '../../store/cart';
import { login } from '../../store/session';
import { thunkCreateCart } from '../../store/cart';
import './LoginForm.css'

const LoginForm = ({ showLoginForm, closeModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password))

    if (data) {
      setErrors(data);
    }
  };


  // useEffect(() => {
  //   console.log("user2", user)
  //   // dispatch(thunkGetCart(user?.id))
  // }, [dispatch])

  const demoSubmit = (e) => {
    e.preventDefault();
    return dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email address</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />
          <button type='submit'>Sign in</button>
          <Link to='/' className='demo-link' onClick={demoSubmit}>Demo Snacksy</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

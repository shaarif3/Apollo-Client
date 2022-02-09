import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function logicFunc() {
    let URL = `https://enigmatic-peak-64400.herokuapp.com/login`;

    let createObj = {
      name: email,
      password: password,
    };
    try {
      let res = await axios.post(URL, createObj);
      console.log(res);
      localStorage.setItem('token', res.data.token);
      if (res.data) {
        navigate('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      alert('Invalid credentials');
    }
  }

  return (
    <div>
      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logicFunc}>Login</button>
    </div>
  );
};

export default Login;

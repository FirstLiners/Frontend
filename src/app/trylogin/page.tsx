'use client'
import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useLoginMutation } from '../../redux/features/authApiSlice';
import axios from 'axios';
import qs from 'qs';

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');



  const handToken = async () => {
    try {
      const data = {
        email,
        password,
      };
      const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'http://192.168.1.87:7000/api/v1/users/token',
        // add headers 'Access-Control-Allow-Origin', '*'
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data),
      };
      const response = await axios.request(config);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
    } finally {
      console.log(localStorage.getItem('token'));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    login({ email, password })
      .then(handToken)
      .then((data) => {
        // handle successful login
        console.log(data);
      })
      .catch((err: unknown) => {
        // handle login error
        console.error(err);
      })
      .finally(() => {
        // always executed
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>
      {error && (
        <p>
          {/* @ts-ignore */}
          {JSON.stringify(error, null, 2)}
        </p>
      )}
    </form>
  );
};
export default Login;

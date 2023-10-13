'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';
import validator from '../../utils/validator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');

  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();

    if (!validator.email(email)) {
      setAlert(true);
      setAlertInfo('Please enter a valid email address.');
      return;
    }

    try {
      const api = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (api.status === 200) {
        router.push('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        setAlert(true);
        setAlertInfo(error.response.data.msg);
      }
    }
  };

  const alertCloseHandling = () => {
    setAlert(false);
  };

  return (
    <Layout title="Login">
      <h1 className="text-center text-2xl font-semibold py-8">
        Login
      </h1>
      <section className="w-1/2 mx-auto items-center bg-gray-200 border border-gray-300 rounded-2xl p-8">
        {alert && (
          <Alert
            status={false}
            message={alertInfo}
            onClose={alertCloseHandling}
          />
        )}
        <form onSubmit={login}>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </section>
    </Layout>
  );
}

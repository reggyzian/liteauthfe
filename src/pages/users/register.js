'use client';

import axios from 'axios';
import { useState } from 'react';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';
import validator from '../../utils/validator';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');

  const register = async (e) => {
    setAlert(false);
    e.preventDefault();

    if (!validator.email(email)) {
      setAlert(true);
      setAlertInfo('Please enter a valid email address.');
      return;
    }

    if (!validator.password(password)) {
      setAlert(true);
      setAlertInfo('Please enter a valid password (at least 12 characters with alphanumeric and symbol).');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name, email, password, passwordConfirm,
      });
      setAlert(true);
      setAlertStatus(true);
      setAlertInfo(response.data.msg);
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
    } catch (error) {
      if (error.response) {
        setAlert(true);
        setAlertStatus(false);
        setAlertInfo(error.response.data.msg);
      }
    }
  };

  const alertCloseHandling = () => {
    setAlert(false);
  };

  return (
    <Layout title="Register">
      <h1 className="text-center text-2xl font-semibold py-8">
        Register
      </h1>
      <section className="w-1/2 mx-auto items-center bg-gray-200 border border-gray-300 rounded-2xl p-8">
        {alert && (
          <Alert
            status={alertStatus}
            message={alertInfo}
            onClose={alertCloseHandling}
          />
        )}
        <form onSubmit={register}>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <input
            className="form-control"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Password Confirmation"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </section>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Layout from '../../components/Layout';

function List(props) {
  const { name, email, authAt } = props;

  return (
    <div className="grid grid-cols-3 gap-x-3 mt-2 p-3 rounded-xl bg-gray-300">
      <div className="col-span-1">
        {name ?? '-'}
      </div>
      <div className="col-span-1">
        {email ?? '-'}
      </div>
      <div className="col-span-1">
        {authAt ?? '-'}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);

  const router = useRouter();

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token', {
        withCredentials: true,
      });

      if (response.status === 200) {
        setToken(response.data.accessToken);

        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
    } catch (error) {
      if (error.response) {
        router.push('/users/login');
      }
    }
  };

  const axiosJwt = axios.create();
  axiosJwt.interceptors.request.use(async (config) => {
    const now = new Date();
    const getConfig = config;

    if (expire * 1000 < now.getTime()) {
      const response = await axios.get('http://localhost:5000/token', {
        withCredentials: true,
      });

      if (response.status === 200) {
        getConfig.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);

        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
    }

    return getConfig;
  }, (error) => {
    Promise.reject(error);
  });

  const loadUsers = async () => {
    try {
      const response = await axiosJwt.get('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      if (error.response) {
        setUsers([]);
      }
    }
  };

  const logout = async () => {
    const response = await axios.delete('http://localhost:5000/users/logout', {
      withCredentials: true,
    });

    if (response.status === 200) {
      router.push('/users/login');
    }
  };

  useEffect(() => {
    refreshToken();
    loadUsers();
  }, []);

  return (
    <Layout>
      <div className="flex my-10">
        <h1 className="w-full text-2xl font-semibold">
          Hello
          {' '}
          {name ? `Welcome back, ${name}!` : '! Please login to continue' }
        </h1>
        <button
          className="align-right border border-red-950 rounded-md px-5 text-red-950"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <section className="mx-auto items-center bg-gray-200 border border-gray-300 rounded-2xl p-8">
        <div className="grid grid-cols-3 gap-x-3 p-3 rounded-xl bg-gray-400">
          <div className="col-span-1">
            Nama
          </div>
          <div className="col-span-1">
            Email
          </div>
          <div className="col-span-1">
            Tanggal Login
          </div>
        </div>
        {users.length > 0 && users.map((user) => (
          <List
            key={user.id}
            name={user.name}
            email={user.email}
            authAt={user.authAt}
          />
        ))}

      </section>
    </Layout>
  );
}

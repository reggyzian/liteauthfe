import axios from 'axios';

export default async function handler(req, res) {
  try {
    const users = await axios.post('http://localhost:5000/users/login', {
      email: req.body.email,
      password: req.body.password,
    });

    if (users.status === 200) {
      res.setHeader('set-cookie', users.headers['set-cookie']);
      res.status(200).json(users.data);
    }
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}
